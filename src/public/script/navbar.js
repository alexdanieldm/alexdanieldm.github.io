
$(document).ready(function() {

    $(window).scroll(function() {
        
        if($(this).scrollTop() > 200) { 
          $('#navbar').addClass('solid');
          
        } else {
          $('#navbar').removeClass('solid');
        }

    });
});