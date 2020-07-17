const IS_PRODUCTION = process.env.IS_PRODUCTION;

const blogHelper = require('./blog-helper');

const mongoClient = require('mongodb').MongoClient;
const mongoClientUrl = 'mongodb://localhost:27017';
const dbName = IS_PRODUCTION ? 'dbProd' : 'dbTest2';
let db;

mongoClient.connect(mongoClientUrl, {useUnifiedTopology: true}, (err, client) => {
    if (err){
        console.log(err);
        process.exit(1);
    }
    else {
        db = client.db(dbName);
        db.createCollection(
            'posts',
            { strict: true }, // Returns error when collection already exists
            (err, collection) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (!IS_PRODUCTION){
                        collection.insertMany([
                            {
                                title: 'Test Post One',
                                slug: blogHelper.slugify('Test Post One'),
                                markdown: `Since this isn't production, the Blog comes with these test posts.`
                            },
                            {
                                title: 'Test Post Two',
                                slug: blogHelper.slugify('Test Post Two'),
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
    const collection = db.collection('posts');
    collection.findOne({slug: slug}, null, callback);
};

const getAllPosts = async callback => {
    const collection = db.collection('posts');
    const posts = await collection.find().toArray();
    callback(posts);
};

module.exports = { getPost, getAllPosts };