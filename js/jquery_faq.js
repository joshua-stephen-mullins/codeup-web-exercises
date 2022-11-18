'use strict';


$(document).ready(function(){
    $('#showAnswers').click(function(event){
        event.preventDefault();
        $('dd').toggleClass('invisible');
    })

    $('dt').click(function(event){
        $(this).toggleClass('highlighted');

    })

    $('#lastItemButton').click(function(){
        $('ul').each(function(){
            $(this).children().last().css('background-color', 'yellow');
    })
    })

    $('#evergladesTitle').click(function(){
        $('#evergladesList').children().css('font-weight', 'bold');
    })
    $('#zionTitle').click(function(){
        $('#zionList').children().css('font-weight', 'bold');
    })
    $('#bigBendTitle').click(function(){
        $('#bigBendList').children().css('font-weight', 'bold');
    })

    $('.evergladesItem').click(function(){
        $('#evergladesList').children().first().css('color', 'blue');
    })
    $('.zionItem').click(function(){
        $('#zionList').children().first().css('color', 'blue');
    })
    $('.bigBendItem').click(function(){
        $('#bigBendList').children().first().css('color', 'blue');
    })
});