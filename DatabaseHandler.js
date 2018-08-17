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
    var strWord = JSONData.word;
    JSONData.word = strWord = strWord.toLowerCase();
    JSONData.length = strWord.length;
    JSONData.startLetter = strWord.substr(0,1);
    JSONData.endLetter = strWord.substr(strWord.length-1,1);
    dbCollection.insertOne(JSONData,function(err,res){
        if(err){
            bRetval = false;
        }
    });
    return bRetval;
}

module.exports.Insert = fpInsert;