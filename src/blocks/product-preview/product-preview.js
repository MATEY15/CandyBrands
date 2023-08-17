// require('slick-slider');

function openDescription() {
    const $descWrapper = document.querySelector('.product-preview__desc');
    if ($descWrapper) {
        init();
    }

    function init() {
        const $openDesc = $descWrapper.querySelector('.product-preview__desc-open');
        const $openDescContainer = $descWrapper.querySelector('dd');
        const $openDescContainerHeight = $openDescContainer.offsetHeight;
        $openDesc.addEventListener('click', (e) => {
            e.preventDefault();
            if ($descWrapper.classList.contains('product-preview__desc--active')) {
                close();
            } else {
                open();
            }
        })

        function open() {
            $descWrapper.classList.add('product-preview__desc--active');
            $openDesc.classList.add('product-preview__desc-open--active');
            $openDescContainer.style.height = $openDescContainerHeight + 'px';
        }
        function close() {
            $descWrapper.classList.remove('product-preview__desc--active');
            $openDesc.classList.remove('product-preview__desc-open--active');
            $openDescContainer.style.height = '56px';
        }

        close();

    }

}

openDescription();

function sliderProduct() {
    const $sliderProduct = $('.product-preview__slide');
    // const $sliderProductNav = $('.product-preview__nav');
    if ($sliderProduct.length) {
        init();
    }

    function init() {
        const maxWidth = 768;
        // const sliderNavigate = document.querySelector('.new-products__navigation');

        const arrowPrev = `<div class="product-preview__nav-button product-preview__nav-button--prev"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 16L9 3.83L14.59 9.42L16 8L8 1.04907e-06L1.04907e-06 8L1.41 9.41L7 3.83L7 16L9 16Z"/> </svg> </div>`;
        const arrowNext = `<div class="product-preview__nav-button product-preview__nav-button--next"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 16L9 3.83L14.59 9.42L16 8L8 1.04907e-06L1.04907e-06 8L1.41 9.41L7 3.83L7 16L9 16Z"/> </svg> </div>`;

        function sliderProduct() {
            $('.product-preview__slide').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.product-preview__nav',
                swipe: false
            });
            $('.product-preview__nav').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.product-preview__slide',
                focusOnSelect: true,
                vertical: true,
                verticalSwiping: true,
                arrows: true,
                prevArrow: arrowPrev,
                nextArrow: arrowNext,
                swipeToSlide: true,
                // centerMode: true,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 855,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            vertical: false,
                            verticalSwiping: false,
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            vertical: false,
                            verticalSwiping: false,
                            centerMode: false,
                        }
                    },
                    {
                        breakpoint: 415,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            vertical: false,
                            verticalSwiping: false,
                            centerMode: false,
                        }
                    }
                ]
            });
        }

        sliderProduct();


        $sliderProduct.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            // tasteName(nextSlide);
        });
    }

}

window.addEventListener('load', function () {
    sliderProduct()
    // setTimeout(() => {sliderProduct()}, 5000)
});
