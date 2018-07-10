var fpIsValidWord = function IsValidWord(strWord){
    return /^[A-Z]+$/.test(strWord);
}

var fpIsValidDescription = function IsValidDescription(strDescription){
    //yet to implement
    return true;
}

module.exports.IsValidWord = fpIsValidWord;
module.exports.IsValidDescription = fpIsValidDescription;