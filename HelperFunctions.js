var fpIsLegibleWord = function IsLegibleWord(strWord){
    return /^[A-Z]+$/.test(strWord);
}

module.exports.IsLegibleWord = fpIsLegibleWord;