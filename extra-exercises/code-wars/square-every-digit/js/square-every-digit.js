"use strict";

function squareDigits(number) {
    let numberArray = number.toString().split("");
    return parseFloat(numberArray.map(numberArray => Math.pow(numberArray, 2)).join().replaceAll(',', ""));
    }

console.log(squareDigits(1234));
console.log(squareDigits(3212));
console.log(squareDigits(2112));
console.log(squareDigits(0));
console.log(squareDigits(896867));


// function testyBoi(testyArray) {
//     let squaredBoi = Math.pow(testyArray, 2);
// }
//
// console.log(testyBoi([1, 2, 3, 4]);
//

// function letsSquareUp(array1){
//     return array1.map(Math.pow(array1, 2));
// }
//
// console.log(letsSquareUp('1', '2', '3', '4'))

//
// function letsSquareUp(){
//     const splitArraySquared = splitArray.map(splitArray => Math.pow(splitArray, 2));
// }
// }

// console.log(splitArraySquared);




// let test1 = [55, 23, 45, 1];
//
// let test2 = test1.map(test1 => Math.pow(test1, 2));
// console.log(test2);

// function addFive(x) {
//     return x + 5;
// }
//
// console.log(addFive(2));
//
// const addFiver = (x) => x + 5;
// console.log(addFiver(2));

// console.log(squareEveryDigit(12));
//
// return x = Math.sqrt(parseFloat(x));
// console.log(Math.sqrt(2));