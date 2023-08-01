function burgerMenu() {
    const $mobileMenu = document.querySelector('.mobile-menu');

    if ($mobileMenu) {
        init();
    }

    function init() {

        const htmlDom = document.querySelector('html');
        const $buttonWrapper = document.querySelector('.header__burger');
        const $buttonWrapperActiveClass = 'header__burger--active';
        const $buttonOpen = document.querySelector('.header__burger--open');
        const $buttonClose = document.querySelector('.header__burger--close');
        const mobileMenuActiveClass = 'mobile-menu--active';

        const $header = document.querySelector('.header');

        let mediaWidth = 960;

        $buttonOpen.addEventListener('click', (even) => {
            even.preventDefault();
            menuShow();
        })


        $buttonClose.addEventListener('click', (even) => {
            even.preventDefault();
            menuHide();
        })

        window.addEventListener('resize', (event) => {
            let widthScreen = event.target.innerWidth;
            if (widthScreen >= mediaWidth) {
                menuHide();
            }
        })

        function menuShow() {
            $buttonWrapper.classList.add($buttonWrapperActiveClass);
            $mobileMenu.classList.add(mobileMenuActiveClass);
            htmlDom.classList.add("html-overflow");
        }

        function menuHide() {
            $buttonWrapper.classList.remove($buttonWrapperActiveClass);
            $mobileMenu.classList.remove(mobileMenuActiveClass);
            htmlDom.classList.remove("html-overflow");
        }
    }
}

burgerMenu();
