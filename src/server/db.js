const mongoClient = require('mongodb').MongoClient;
const mongoClientUrl = 'mongodb://localhost:27017';
const dbName = 'dbTest1';

let db;

mongoClient.connect(mongoClientUrl, {useUnifiedTopology: true}, (err, client) => {
    if (err){
        console.log(err);
        process.exit(1);
    }
    else {
        db = client.db(dbName);
        console.log(db);
    }
});