var sectionArray = [1, 2, 3, 4, 5];
var sectionOffsets = [];

$.each(sectionArray, function(index, value){
          
    sectionOffsets[index] = $('#' + 'section_' + value).offset().top - 94;
    
    $('.click-scroll').eq(index).click(function(e){
        var offsetClick = sectionOffsets[index];
        e.preventDefault();
        $('html, body').animate({
            'scrollTop':offsetClick
        }, 300)
    });
    
});

$(document).scroll(function(){
    var docScroll = $(document).scrollTop();
    var docScroll1 = docScroll + 1;
    
    $.each(sectionOffsets, function(index, offset){
        if ( docScroll1 >= offset ){
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
            $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
            $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
        }
    });
});

$(document).ready(function(){
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});