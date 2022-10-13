'use strict';

(function(){

    function skipUserOdd () {
        for (let i = 1; i < 50; i++) {
            let userNumber = prompt('Please enter an odd number between 1 and 50.');
            if (userNumber > 0 && userNumber < 51 && userNumber % 2 !== 0) {
                console.log(userNumber);
                break;
            }
        }
    }

skipUserOdd(27);



}());