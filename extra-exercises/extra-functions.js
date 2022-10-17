"use strict";

(function(){
// ================ !! Mini-exercises !!

// Write a function, returnFive, that returns the number five. No inputs should be defined.
//
// function returnFive() {
//     return 5;
// }
//
// console.log(returnFive());

// Write a function, isFive, that takes in an input and returns the boolean value true if the passed argument is the number 5 or the string "5". Return false otherwise.
// how many inputs should the function have?
// what are the data types for the inputs?
// what is the data type of the output/return value?
//
// function isFive(number) {
//     return number == 5;
// }
//
// console.log(isFive(5));
// console.log(isFive("5"));
// console.log(isFive("doggie"));

// Write a function, isShortWord, that takes in a string and returns the boolean value true if the passed argument is shorter than 5 characters. Return false otherwise.

// how many inputs?
// what data type for inputs?
// what is the return type?
//
// function isShortWord(word) {
//     return word.length < 5;
// }
//
// console.log(isShortWord("pig"));
// console.log(isShortWord("pizza"));
// console.log(isShortWord("very saucy"));

// const isShortWord = (word) => word.length < 5

// Write a function, isSameLength, that takes in two string inputs and returns the boolean value true if the passed arguments are the same length. Return false otherwise.
// How many inputs?
// What type of input?
// What type of output?
//
// function isSameLength(wordLength1, wordLength2) {
//     return wordLength1.length === wordLength2.length;
// }



// function multiplyNumber(inputNumber){
//     if (typeof inputNumber !== 'number') {
//         return 0;
//     } else {
//         return inputNumber * 5;
//     }
// }
//
// console.log(multiplyNumber(2134));
// console.log(multiplyNumber("doggo"));
// console.log(multiplyNumber("5"));
// console.log(multiplyNumber("true"));

    // function inBetween(min, max, num){
    //     if (num > min && num < max){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    //
    // console.log(inBetween(1, 10, 5));
    // console.log(inBetween(25, 26, 25));
    // console.log(inBetween(0, 1, .5));
    //
    // function inBetween(min, max, num){
    //     return num > min && num < max;
    // }
    //
    // console.log(inBetween(1, 10, 5));
    // console.log(inBetween(25, 26, 25));
    // console.log(inBetween(0, 1, .5));

    // let num = 0;
    // while (num < 100) {
    //     num += 5;
    //     console.log(num);
    // }

//     let num = 0;
// do {
//     num += 5;
//     console.log(num)
// } while (num < 100);
//
//     for (let num = 0; num < 100; num += 5) {
//         console.log(num);
//     }

function typePrinter(arr1){
    let i = 0;
    while (i < arr1.length){
        let arrType = typeof arr1[i];
        console.log(arrType);
        i++;
    }
}

typePrinter([true, "Icon", 25, "66", false, 0]);


}());