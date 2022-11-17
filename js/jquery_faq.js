'use strict';


$(document).ready(function(){
    $('#showAnswers').click(function(event){
        event.preventDefault();
        $('dd').toggleClass('invisible');
    })

    $('dt').click(function(event){
        $(this).toggleClass('highlighted');

    })
});