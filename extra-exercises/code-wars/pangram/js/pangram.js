'use strict';

function isPangram(string){
  let stringLower = string.toUpperCase();
  return stringLower.includes('A' && 'B' && 'C' && 'D' && 'E' && 'F' && 'G' && 'H' && 'I' && 'J' && 'K' && 'L' && 'M' && 'N' && 'O' && 'P' && 'Q' && 'R' && 'S' && 'T' && 'U' && 'V' && 'W' && 'X' && 'Y' && 'Z');
}

// const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// function isPangram(string) {
//   let toLower = string.toLowerCase();
//   return alphabet == toLower;
// }

console.log(isPangram("abcdefghijklmnopqrstuvwxyz"));
console.log(isPangram("zyxwvutsrqponmlkjihgfedcba"));
console.log(isPangram("hfgrgbsnjdhdbvejhsj"));
console.log(isPangram("z"));

//For some reason the above function only recognizes the final letter... so I had to run the includes function against every letter for it to work.

// function isPangram(string){
//   let stringLower = string.toUpperCase();
//   return stringLower.includes('A') && stringLower.includes('B') && stringLower.includes('C') && stringLower.includes('D') && stringLower.includes('E') && stringLower.includes('F') && stringLower.includes('G') && stringLower.includes('H') && stringLower.includes('I') && stringLower.includes('J') && stringLower.includes('K') && stringLower.includes('L') && stringLower.includes('M') && stringLower.includes('N') && stringLower.includes('O') && stringLower.includes('P') && stringLower.includes('Q') && stringLower.includes('R') && stringLower.includes('S') && stringLower.includes('T') && stringLower.includes('U') && stringLower.includes('V') && stringLower.includes('W') && stringLower.includes('X') && stringLower.includes('Z') && stringLower.includes("Y");
// }
//
// console.log(isPangram("abcdefghijkz"));
// console.log(isPangram("y"));
// console.log(isPangram("abcdefghijklmnopqrstuvwxyz"));
// console.log(isPangram("abcdefghijklmnopqrstuvwxyz"));
// console.log(isPangram("abcdefghijklmopqrstuvwxyz"));