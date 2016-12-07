var arraySum = function(array) {
    return array.reduce((a, b) => a + b, 0);
};

var currencyFormat = function(number) {
    var i = parseFloat(number);
    if (isNaN(i)) {
        i = 0.00;
    }
    var sign = '';
    if (i < 0) {
        sign = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.00';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = sign + '$' + s;
    return s;
}

module.exports = {
    arraySum: arraySum,
    currencyFormat: currencyFormat
};
