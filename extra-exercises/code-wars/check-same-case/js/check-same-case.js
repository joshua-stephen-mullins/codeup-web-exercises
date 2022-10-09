"use strict";

(function(){

// checking to make sure i know how to check the cases
//     function sameCase(a, b){
//         let aCheck = (a.toUpperCase() === a) + (b.toUpperCase() === b);
//         return aCheck;
//     }
//
//     console.log(sameCase('a', 'b'));
//     console.log(sameCase('A', 'A'));


    // i think if then statements will work best... start with the non characters and then others.

    // function isLetter(c) {
    //     return c.toLowerCase() != c.toUpperCase();
    // }
    function sameCase(a, b){
        if (a.toLowerCase() == a.toUpperCase() || b.toLowerCase() == b.toUpperCase()) {
            return -1;
        } else if ((a.toUpperCase() === a) && (b.toUpperCase() === b)) {
            return 1;
        } else if ((a.toLowerCase() === a) && (b.toLowerCase() === b)) {
            return 1;
        } else {
            return 0;
        }
    }

    // console.log(sameCase('a', '$'));
    console.log(sameCase("$", 'a'));
    console.log(sameCase("a", 'b'));
    console.log(sameCase("C", 'b'));
    // console.log(sameCase('d', 'e'));
    // console.log(sameCase('z' , 'a'));

    // failed checking if character is letter...
    // function sameCase(a, b){
    //     let alphabet = "a" || 'b' || 'c' || 'd' || "e" || 'f' || 'g' || 'h' || "i" || 'j' || 'k' || 'k' || "m" || 'n' || 'o' || 'p' || "q" || 'r' || 's' || 't' || "u" || 'v' || 'w' || 'x' || 'y' || 'z';
    //     if (a || b !== alphabet) {
    //         return 'Incorrect input';
    //     }
    //
    // }
    //
    // console.log(sameCase('z' , 'a'));

}())