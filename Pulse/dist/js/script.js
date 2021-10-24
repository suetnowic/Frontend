$(document).ready(function(){
    $('.slider__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/chevron-left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/chevron-right.svg"></button>',

        responsive: [
            {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
            }
            },
            {
              breakpoint: 600,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
           },
            {
              breakpoint: 480,
              settings: {
              slidesToShow: 1,
              slidesToScroll: 1
              }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content')
            .removeClass('catalog__content_active').eq($(this).index())
            .addClass('catalog__content_active');
    });
        
    function toggleSlide(item){
        $(item).each(function(i){
            $(this)
            .on('click', function(e){
                e.preventDefault();
  
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    /* Modal */
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button__buy').each(function(i){
        $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form){
        $(form).validate(
        {
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            }
         },
        messages: {
            name: "Пожалуйста, введите имя",
            phone: "Введите номер телефона",
            email: {
                required: "Нам нужен Ваш e-mail адрес для связи с Вами",
                email: "Введите адрес вида name@domain.com"
            }
          }
    });
    };

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });

    /* Smooth scroll */

    $(window).scroll(function(){
        if ($(this).scrollTop()> 1600){
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});

  