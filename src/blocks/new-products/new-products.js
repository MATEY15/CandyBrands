require('slick-slider');

function sliderTastes() {
    const $sliderMain = $('.new-products__slider');
    if($sliderMain.length) {
        init();
    }

    function init() {
        const maxWidth = 768;
        const sliderNavigate = document.querySelector('.new-products__navigation');

        const arrowPrev = `<span class="new-products__navigation-button new-products__navigation-button--prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 20L13.41 18.59L7.83 13L20 13L20 11L7.83 11L13.41 5.41L12 4L4 12L12 20Z"/> </svg></span>`;
        const arrowNext = `<span class="new-products__navigation-button new-products__navigation-button--next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 20L13.41 18.59L7.83 13L20 13L20 11L7.83 11L13.41 5.41L12 4L4 12L12 20Z"/> </svg></span>`;

        let slickVar = {
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            arrows: true,
            dots: false,
            speed: 400,
            autoplaySpeed: 5000,
            mobileFirst: true,
            variableWidth: true,
            cssEase: 'ease',
            appendArrows: sliderNavigate,
            prevArrow: arrowPrev,
            nextArrow: arrowNext,
            responsive: [
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                }
            ]
        };

        function runSlick() {
            $('.new-products__slider').not('.slick-initialized').slick(slickVar);
        }
        $sliderMain.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            // tasteName(nextSlide);
        });

        runSlick();
        window.addEventListener('resize', () => {
            if(window.innerWidth < maxWidth) {
                runSlick();
            }
        });
    }

}

window.addEventListener('load', function() {
    sliderTastes()
});
