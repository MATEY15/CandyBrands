require("jquery.marquee");
require("magnific-popup");

$('.popup, .popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'inline',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
});

$('.video-popup').magnificPopup({
    type: 'inline',
    callbacks: {
        open: function () {
            $('html').css('margin-right', 0);

            $(this.content).find('video')[0].play();
        },
        close: function () {
            $(this.content).find('video')[0].load();
        }
    }
});

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
