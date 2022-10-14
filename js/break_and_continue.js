'use strict';

(function(){


// let userNumber = prompt('Please enter an odd number between 1 and 50.');
//         for (let i = 1; i < 50; i++) {
//             if (userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0) {
//                 console.log(userNumber);
//                 break;
//             }
//         }
//             for (let i = 1; i < 50; i++) {
//                 if (i === userNumber) {
//                     console.log("Yikes! Skipping number: " + userNumber)
//                 } else if (i % 2 !== 0) {
//                     console.log("Here is an odd number: " + i);
//                 }
//             }

// do {
//     let userNumber = prompt('Please enter an odd number between 1 and 50.')
// } while (userNumber !== userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0);

//     let userNum = 100
//     function userNumber(){
//         do {
//             userNum = prompt('Please enter an odd number between 1 and 50.')
//         } while (userNum !== (userNum > 0 && userNum < 51 && userNum % 2 !== 0))
//     }
//
// userNumber();

    // function enterNumber(){
    //     let userInput = prompt('Please enter odd number between 1 and 50.')
    //     return userInput;
    // }
//
//     function oddUser(){
//         let userNum;
//         while (userNum !== (userNum > 0 && userNum < 51 && userNum % 2 !== 0)) {
//             userNum = prompt('Please enter odd number between 1 and 50.')
//         }
//     }
//
// oddUser();

// let userNumber = "";
//
// while (userNumber !== (userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0)) {
//     userNumber = prompt("Please enter an odd number between 1 and 50.");
//         if (userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0)) {
//             console.log("Number to skip is: " + userNumber);
//         }
// }

    let userNumber = "";
    for (let i = 1; i < 50; i++) {
        if (userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0){
            console.log("Number to skip is: " + userNumber);
            break;
        } else {
            userNumber = prompt("Please enter an odd number between 1 and 50.")
        }
    }
    for (let i = 1; i < 50; i+=2) {
        if (i == userNumber){
            console.log("Yikes! Skipping number: " + userNumber);
            continue;
        } else
            console.log("Here is an odd number: " + i);
    }


}());