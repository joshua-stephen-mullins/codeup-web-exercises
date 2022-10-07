"use strict";

function squareEveryDigit(number){
    number = number.toString();
    return number.split("").map(function(x){
        return x = Math.sqrt(parseFloat(x));
    })
}

console.log(squareEveryDigit(12));
//
//
// console.log(Math.sqrt(2));