headerScroll();

function headerScroll() {
    const $header = document.querySelector('.header');
    const scrollClass = 'header--scroll';
    let startScroll = 1;
    const $headerEco = document.querySelector('.header-eco');

    if ($headerEco) {
        ecoHeight();
        window.addEventListener("resize", () => {
            ecoHeight();
        })
    }

    function ecoHeight() {
        startScroll = $headerEco.clientHeight;
    }

    window.addEventListener('scroll', headerFixed);

    function checkScrollPosition() {
        return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    }

    function headerFixed() {
        let positionScroll = checkScrollPosition();
        positionScroll >= startScroll ? $header.classList.add(scrollClass) : $header.classList.remove(scrollClass);
    }
}

function dropCountry() {
    const btn_lang = document.querySelector(".mobile-menu__app-link-country");

    if(btn_lang) {
        init();
    }

    function init() {
        const arrowLang = document.querySelector("li.menu__li.mobile-menu__app-link-country > p > img")
        const linkCountry = document.querySelector("li.mobile-menu__app-link-country > ul")

        let linkCountryOpen = false
        let linkRegionOpen = false
        window.addEventListener('click', function (e) {
            if (btn_lang.contains(e.target)) {
                if (!linkRegionOpen) {
                    linkCountry.classList.add('active')
                    arrowLang.classList.add('active')
                    linkRegionOpen = true
                } else {
                    linkCountry.classList.remove('active')
                    arrowLang.classList.remove('active')
                    linkRegionOpen = false
                }
            } else {
                linkCountry.classList.remove('active')
                arrowLang.classList.remove('active')
                linkRegionOpen = false
            }
        })
    }
}

dropCountry();