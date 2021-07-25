const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var DB = "water";


exports.insertDocument = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).insertOne(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.findDocumentent = function (collectionName,query, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var collection = dbo.collection(collectionName);
        collection.find(query).toArray(function(err, result) {
            callback(err, result);
            db.close();
        });
    });
};

exports.aggregation = function (collectionName,aggregate, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var collection = dbo.collection(collectionName);
        collection.aggregate(aggregate).toArray(function(err, result) {
            callback(err, result);
            db.close();
        });
    });
};

