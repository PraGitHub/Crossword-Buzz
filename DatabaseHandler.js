var dbURL = "mongodb://localhost:27017/";
var mongoClient = require('mongodb').MongoClient;
var dbCollection;
mongoClient.connect(dbURL, function (err, db) {
    if (err) throw err;
    console.log("DB Strated...");
    dbObject = db.db("PraDBObject2");
    dbObject.createCollection("CrosswordData", function (err, res) {
        if (err) throw err;
        console.log("CrosswordData Collection Created...")
    });
    dbCollection = dbObject.collection("CrosswordData");
});

var fpInsert = function Insert(JSONData){
    var bRetval = true;
    dbCollection.insertOne(JSONData,function(err,res){
        if(err){
            bRetval = false;
        }
    });
    return bRetval;
}

module.exports.Insert = fpInsert;