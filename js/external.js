console.log('Hello from external JavaScript!');

alert('Welcome to my Website!');

let userColor = prompt('What is your favorite color?');
alert(userColor.toUpperCase() + '?!? That is my favorite color too!');


const moviePrice = 3;
let theLittleMermaid = prompt('How many days did you rent The Little Mermaid?');
let hercules = prompt('How many days did you rent Hercules?');
let brotherBear = prompt('How many days did you rent Brother Bear?');

let totalMoviesPrice = (theLittleMermaid * moviePrice) + (hercules * moviePrice) + (brotherBear * moviePrice);

alert("Your total is: " + totalMoviesPrice);


const googleRate = 400;
const amazonRate = 380;
const facebookRate = 350;

let googleHours = prompt('How many hours did you work for Google this Week?');
let amazonHours = prompt('How many hours did you work for Amazon this Week?');
let facebookHours = prompt('How many hours did you work for Facebook this Week?');

let totalPaymentDue = (googleHours * googleRate) + (amazonHours * amazonRate) + (facebookHours * facebookRate);

alert("Your total revenue this week is: " + totalPaymentDue);


/* Complete exercise 3 from the previous lesson, but write your code in the external.js file instead of in the console.

When the exercise asks you to use a number, instead use a prompt to ask the user for that number.
Use an alert to show the results of each problem. */