$(function() {

    var breakPoint = {
            s: 640,
            m: 960,
            l: 1280,
            xl: 1920
        },
        wnd = $(window),
        isTouch = 'ontouchstart' in window;


    if (isTouch) {
        $('body').addClass('touch__screen');
    }


    if ($('.nav').length){
        if ($('.js-nav-toggle').length){
            $('.js-nav-toggle').on('click', function(event) {
                event.preventDefault();
                if ($('body').hasClass('nav-open')){
                    $('body').removeClass('nav-open');
                } else {
                    $('body').addClass('nav-open');
                }
            });
        }
        $('.nav').on('click', 'a', function(event) {
            let link = $(this).attr('href');
            if (link.slice(0,1) === "#"){
                event.preventDefault();
                if (wnd[0].innerWidth < breakPoint.l && $('body').hasClass('nav-open'))
                    $('body').removeClass('nav-open');
                $('html, body').animate({ scrollTop: $(link).offset().top - $('.panel').innerHeight() }, 600);
            }
        });
    }


    if ($('.js-faq').length){
        $('.js-faq').on('click', '.faq__q', function(event) {
            event.preventDefault();
            let item = $(this).parents('.faq__item'),
                answer = item.find('.faq__a');
            if (item.hasClass('faq__item--active')){
                    answer.slideUp();
                    item.removeClass('faq__item--active');
                } else {
                    answer.slideDown();
                    $('.faq__item--active').removeClass('faq__item--active').find('.faq__a').slideUp();
                    item.addClass('faq__item--active');
                }
        });
    }


    stickyPanel(); 
    wnd[0].onscroll = function() { stickyPanel() };
    function stickyPanel() {
        let header = $(".panel"),
            sticky = header.offset().top;
        if (wnd[0].pageYOffset > parseInt(header.css('padding-top')) - 16) {
            header.addClass("panel--sticky");
        } else {
            header.removeClass("panel--sticky");
        }
    }

});