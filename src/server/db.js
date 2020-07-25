const IS_PRODUCTION = process.env.IS_PRODUCTION;

const blogHelper = require('./blog-helper');

const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const mongoClientUrl = 'mongodb://localhost:27017';
const dbName = IS_PRODUCTION ? 'dbProd' : 'dbTest4';

let db;
let collectionPosts;

mongoClient.connect(mongoClientUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    else {
        db = client.db(dbName);
        db.createCollection(
            'posts',
            { strict: true }, // Returns error when collection already exists
            (err, collection) => {
                collectionPosts = db.collection('posts');
                if (err) {
                    console.log(err);
                }
                else {
                    if (!IS_PRODUCTION) {
                        collection.insertMany([
                            {
                                title: 'Test Post One',
                                slug: blogHelper.slugify('Test Post One'),
                                createdOn: new Date(),
                                markdown: `Since this isn't production, the Blog comes with these test posts.`
                            },
                            {
                                title: 'Test Post Two',
                                slug: blogHelper.slugify('Test Post Two'),
                                createdOn: new Date(),
                                markdown: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fuga eius hic nostrum repellat delectus amet ad voluptatum. Explicabo saepe distinctio laudantium! Velit quibusdam vel, voluptatem quod veritatis porro natus!`
                            },
                        ], (err, r) => {
                            if (err) console.log(err);
                            else console.log('TEST ENV: Creating test posts for blog', r.insertedCount);
                        });
                    }
                }
            }
        )
        console.log(db);
    }
});

const getPost = (slug, callback) => {
    collectionPosts.findOne({ slug: slug }, null, callback);
};

const getAllPosts = async callback => {
    const posts = await collectionPosts.find().toArray();
    callback(posts);
};

const makeNewPost = (postJson, callback) => {
    collectionPosts.insertOne({
        title: postJson.newPostTitle,
        markdown: postJson.newPostMarkdown,
        slug: blogHelper.slugify(postJson.newPostTitle),
        createdOn: new Date(),
    }, null, callback);
};

const editPost = (postJson, callback) => {
    collectionPosts.updateOne(
        { slug: postJson.slug },
        {
            $set: {
                title: postJson.newPostTitle,
                markdown: postJson.newPostMarkdown,
            }
        }, null, callback
    );
};

const deletePost = (slug, callback) => {
    collectionPosts.deleteOne({
        slug: slug,
    }, null, callback);
};

module.exports = { getPost, getAllPosts, makeNewPost, editPost, deletePost };