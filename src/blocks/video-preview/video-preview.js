require("jquery.marquee");
function marqueeCreate() {
    const marqueeWrapper = document.querySelector('.video-preview__marquee');

    if(marqueeWrapper) {
        init();
    }

    function init() {
        $('.video-preview__marquee').each((i, item) => {
            $(item).marquee({
                startVisible: true,
                duplicated: true,
                duration: 30000,
                pauseOnHover: false,
                gap: 0,
                direction: $(item).attr('data-slide')
            })
        })
    }
}

marqueeCreate()
