function widthWindow() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

// screenHeight
function fsvh() {

    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root);
    var zoom = rootStyles.getPropertyValue('--zoom');

    let el = document.querySelector('.header-eco') ? document.querySelector('.header-eco').clientHeight : 0;
    let el2 = document.querySelector('.header') ? document.querySelector('.header').clientHeight : 0;
    let el3 = document.querySelector('.check-country--active') ? document.querySelector('.check-country--active').clientHeight : 0;
    let fsvh = (window.innerHeight / zoom) - (el) - (el2);
    let fsvh2 = document.querySelector('.plonq500-section') ? document.querySelector('.plonq500-section').clientHeight : 0;
    document.documentElement.style.setProperty('--fsvh', `${fsvh}px`);
    document.documentElement.style.setProperty('--fsvh2', `${fsvh2}px`);

    // let checkMH = el3 - el;
    // let pt = el2 - checkMH

    // document.documentElement.style.setProperty('--fsmt', `-${pt}px`);
}
window.addEventListener('load', () => {
    fsvh();
})
window.addEventListener('resize', function (event) {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        fsvh();
    }
}, true);
// end screenHeight

/* Offset Main */
function offsetMain() {
    const mainNode = document.getElementById('main');
    const $header = document.querySelector('.header');
    let headerHeight = $header.clientHeight;
    function checkHeight() {
        headerHeight = $header.clientHeight;
        mainNode.style.paddingTop = `${headerHeight}px`;
    }
    checkHeight();
    window.addEventListener("resize", () => {
        checkHeight();
    });
}


// Scroll Fixed

function scrollFixed(element, elementStop) {
    const $element = document.querySelector(element);
    let $elementHeight, positionElement, $elementStop, offsetElementTop, startFixed = null;
    // let temp = false;
    if ($element) {
        $elementHeight = document.querySelector(element).offsetHeight;
        positionElement = offset($element);
        $elementStop = document.querySelector(elementStop).offsetHeight;
        // offsetElementTop = 40;

        let windowHeight = window.innerHeight;
        startFixed = parseInt((windowHeight / 2) / 2);

        widthChecked();
        window.addEventListener('resize', widthChecked);
    }


    function widthChecked() {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 640) {
            window.addEventListener('scroll', positionElementScroll);
        }
        if (windowWidth >= 641) {
            window.removeEventListener('scroll', positionElementScroll);
            $element.classList.remove('stiky');
            $element.classList.remove('stop');
            $element.style.cssText = `position: static; top: auto;`;
        }
    }

    function positionElementScroll() {
        if (window.scrollY + startFixed >= positionTrigger()) {
            $element.classList.add('stiky');
            $element.style.cssText = `position: fixed; top: ${startFixed}px;`;
            if (window.scrollY + startFixed >= positionElement.top + ($elementStop - $elementHeight)) {
                $element.classList.remove('stiky');
                $element.classList.add('stop');
                $element.style.cssText = `position: relative; top: ${$elementStop - $elementHeight}px;`;
            }
        } else {
            $element.classList.remove('stiky');
            $element.style.cssText = `position: static; top: auto;`;
        }
    }

    function offset(el) {
        let rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    function positionTrigger() {
        return positionElement.top
    }

}

window.addEventListener('load', (event) => {
    setTimeout(function () {
        scrollFixed('.plonq500-component__device', '.plonq500-component__components');
        scrollFixed('.plonq500-vanted__image', '.plonq500-vanted__content');
    }, 1000)
});

// Accordion
function toggleAccordion() {
    let $items = $('.accordion__item');
    let descriptionClass = 'accordion__description';
    let $descriptions = $('.' + descriptionClass);
    let activeClass = 'accordion__item--active';

    $items.on('click', function () {
        let $item = $(this);
        let $description = $item.find('.' + descriptionClass);

        if ($item.hasClass(activeClass)) {
            $descriptions.slideUp();
            $items.removeClass(activeClass);
        } else {
            $descriptions.slideUp();
            $description.slideDown();
            $items.removeClass(activeClass);
            $item.addClass(activeClass);
        }
    });
}


// Load Scripts
window.onload = function () {
    // offsetMain();
    toggleAccordion();
}
