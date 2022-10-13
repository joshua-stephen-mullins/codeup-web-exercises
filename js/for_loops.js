"use strict";

(function(){

    function showMultiplicationTable(num) {
        for (var i = 1; i < 11; i++) {
            console.log(num + " x " + i + " = " + (num * i));
        }
    }

showMultiplicationTable(2);

function randomNumber(){
    return Math.floor(Math.random() * (200 - 20) + 20);
}


    function oddOrEven (){
        for (let i = 0; i < 10; i++) {
            let randoNumOutput = randomNumber();
            if (randoNumOutput % 2 === 0) {
                console.log(randoNumOutput + " is even.");
            } else {
                console.log(randoNumOutput + " is odd.");
            }
        }
    }

oddOrEven();

function pyramid(){
    for (let i = 1; i < 10; i++){
        let iLength = (i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString());
        console.log(iLength.substring(0, i));
    }
}

pyramid();


function minusFive(){
    for (let i = 21;i > 1; --i) {
        console.log(i * 5 - 5);
    }
}

minusFive();




}());