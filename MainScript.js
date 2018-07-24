var express = require('express');
var bodyParser = require('body-parser');
var helper = require(__dirname+'/HelperFunctions.js');
var app = express();
var httpPort = 8085;

var dbURL = "mongodb://localhost:27017/";
var mongoClient = require('mongodb').MongoClient;
mongoClient.connect(dbURL, function (err, db) {
    if (err) throw err;
    console.log("DB Strated...");
    dbObject = db.db("PraDBObject2");
    dbObject.createCollection("CrosswordData", function (err, res) {
        if (err) throw err;
        console.log("CrosswordData Collection Created...")
    });
    dbCommonCollection = dbObject.collection("CrosswordData");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

for (let i = 0; i < process.argv.length;i++) {
    //console.log(process.argv[i]);
    if (process.argv[i].indexOf('-port=') == 0) {
        httpPort = process.argv[i].substring(6);
        //console.log(httpPort);
    }
}
if (httpPort == "") {
    console.log('Port is missing!');
    process.exit();
}

app.listen(httpPort,function(err,res){
    if(err) throw err;
    console.log('HTTP Server is running at '+httpPort);
});

app.get('/',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/HomePage.html');
});

app.post('/Contribute',function(httpReq,httpRes){
    var strWord = httpReq.body.Word;
    strWord = strWord.toUpperCase();
    var strDesctription = httpReq.body.Description;
    if(helper.IsValidWord(strWord) == true){
        if(helper.IsValidDescription(strDesctription) == true){

        }
        else{
            httpres.redirect('/InvalidDescription');
        }
    }
    else{
        httpRes.redirect('/InvalidWord');
    }

});

app.get('/InvalidWord',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/InvalidWord.html');
});

app.get('/InvalidDescription',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/InvalidDescription.html');
});
