"use strict";

(function () {
    $(document).ready(function () {
        //jquery goes here
        // let firstLineItemContents = $('#firstLineItem').html();
        // console.log(firstLineItemContents);
        // alert(firstLineItemContents);

        // $('.codeup').css('border', '1px solid red')

        // $('li').css('font-size', '20px');
        // $('h1, p, li').css('background-color', 'yellow')
        // let h1Contents = $('h1').html();
        // alert(h1Contents);

        $('h1').click(function(){
            $('h1').css('background-color', 'yellow');
        })


        $('p').dblclick(function(){
            $('p').css('font-size', '18px');
        })

        $('li').hover(
            function(){
                $('li').css('color', 'red')
            },
            function(){
                $('li').css('color', 'black')
        }
        )
    });
})();