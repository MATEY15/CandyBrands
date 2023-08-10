function filterTrigger() {
    const $filterButton = document.querySelector('.catalog__filter');

    if($filterButton) {
        init();
    }

    function init() {
        const htmlDom = document.querySelector('html');
        const $overlay = document.querySelector('.overlay');
        const overlayActive = 'overlay--active';
        const $filter = document.querySelector('.filter');
        const filterActive = 'filter--active';


        $filterButton.addEventListener('click', (e) => {
            e.preventDefault();
            open();
        })
        $overlay.addEventListener('click', close)

        function open() {
            $filter.classList.add(filterActive);
            $overlay.classList.add(overlayActive);
            htmlDom.classList.add("html-overflow");
        }
        function close() {
            $filter.classList.remove(filterActive);
            $overlay.classList.remove(overlayActive);
            htmlDom.classList.remove("html-overflow");
        }

    }

}

filterTrigger()
