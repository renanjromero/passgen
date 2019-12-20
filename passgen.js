var specialChars = ['!','@','#','$','%','&'];
var format = 'sMmmdddmMs';

function passgen(mainValue, secret1, secret2) {
    return format.split('').reduce(function(result, formatSymbol, position){
        var seedNumber = getSeedNumberForPosition(mainValue, secret1, secret2, position);
        return result + getNewElement(result, formatSymbol, seedNumber);
    },"");    
}

function getNewElement(result, formatSymbol, seedNumber) {

    var newElement;

    do {
        switch (formatSymbol) {
            case 's':
                newElement = specialChars[seedNumber % specialChars.length];
                break;
            case 'M':
                newElement = getNewChar('A', 'Z', seedNumber);
                break;
            case 'm':
                newElement = getNewChar('a', 'z', seedNumber);
                break;
            case 'd':
                newElement = getNewChar('0', '9', seedNumber);
                break;
        }
        seedNumber++;
    } while (result.indexOf(newElement) != -1);

    return newElement;
}

function getNewChar(charRangeStart, charRangeEnd, seedNumber){
    var codeStart = charRangeStart.charCodeAt(0);
    var codeEnd = charRangeEnd.charCodeAt(0);
    return String.fromCharCode(codeStart + (seedNumber % (codeEnd - codeStart)));
}

function getSeedNumberForPosition(mainValue, secret1, secret2, position) {
    return getNumberForPosition(mainValue, position) + getNumberForPosition(secret1, position) + getNumberForPosition(secret2, position);
}

function getNumberForPosition(value, i) {
    return value.charCodeAt(i % value.length) * (1 + Math.floor(i / value.length));
}

//console.log(passgen('google','search','123456'));

module.exports = passgen;