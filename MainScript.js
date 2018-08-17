var express = require('express');
var bodyParser = require('body-parser');
var helper = require(__dirname+'/HelperFunctions.js');
var dbHandler = require(__dirname+'/DatabaseHandler.js');
var app = express();
var httpPort = 8085;

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
            var JSONToInsert = {
                word:httpReq.body.Word,
                description:httpReq.body.Description,
                startLetter:'',
                endLetter:'',
                length:0
            };
            if(dbHandler.Insert(JSONToInsert) == true){
                httpRes.redirect('/WordAddSuccess');
            }
            else{
                httpRes.redirect('/WordAddFail');
            }
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

app.get('/WordAddSuccess',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/WordAddSuccess.html');
});

app.get('/WordAddFail',function(httpReq,httpRes){
    httpRes.sendFile(__dirname+'/WordAddFail.html');
});