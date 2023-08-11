import mPageScroll2id from "page-scroll-to-id/jquery.malihu.PageScroll2id.js";

$(".scrollToId").mPageScroll2id();

const $filterHead = document.querySelectorAll('.filter__head');
function filter() {
    const filterHeadActiveClass = 'filter__head--active';
    const $filterBody = document.querySelectorAll('.filter__body');
    const filterBodyActiveClass = 'filter__body--active';
    if($filterHead.length) {
        init();
    }
    function init() {
        $filterHead.forEach((item) => {
            item.addEventListener('click', () => listen(item))
        })

        setTimeout(() => {open($filterHead[0].closest('.filter__item'))},100);

        function listen(el) {
            const $filterItem = el.closest('.filter__item');
            if(el.classList.contains(filterHeadActiveClass)) {
                close($filterItem);
            } else {
                open($filterItem);
            }
        }

        function open(el) {
            const head = el.querySelector('.filter__head');
            const body = el.querySelector('.filter__body');
            head.classList.add(filterHeadActiveClass);
            body.classList.add(filterBodyActiveClass);
            $(body).slideDown(250);
        }
        function close(el) {
            const head = el.querySelector('.filter__head');
            const body = el.querySelector('.filter__body');
            head.classList.remove(filterHeadActiveClass);
            body.classList.remove(filterBodyActiveClass);
            $(body).slideUp(250);
        }
    }
}
filter();

function filterFixed() {
    const $filterWrapper = document.querySelector('.filter__wrapper');

    if($filterWrapper) {
        setTimeout(() => {
            init();
        }, 0)
    }

    function init() {
        let a = document.querySelector('.filter__scroll .filter__wrapper'), b = null, P = 30;
        window.addEventListener('scroll', Ascroll, false);
        document.body.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
            if (b == null) {
                let Sa = getComputedStyle(a, ''), s = '';
                for (let i = 0; i < Sa.length; i++) {
                    if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                    }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                a.insertBefore(b, a.firstChild);
                let l = a.childNodes.length;
                for (let i = 1; i < l; i++) {
                    b.appendChild(a.childNodes[1]);
                }
                a.style.height = b.getBoundingClientRect().height + 'px';
                a.style.padding = '0';
                a.style.border = '0';
            }
            let Ra = a.getBoundingClientRect(),
                R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.footer').getBoundingClientRect().top + 30);
            if ((Ra.top - P) <= 0) {
                if ((Ra.top - P) <= R) {
                    b.className = 'stop';
                    b.style.top = - R +'px';
                } else {
                    b.className = 'sticky';
                    b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
        }
        Ascroll();
    }
}

filterFixed()


function clearFilters() {
    const $buttonClear = document.querySelector('.clear-filter');

    if($buttonClear) {
        init();
    }

    function init() {
        $buttonClear.addEventListener('click', (e) => {
            e.preventDefault();
            clear();
        })
        function clear() {
            const $selects = document.querySelectorAll('.filter input[type="checkbox"]');
            $selects.forEach(item => {
                item.checked = false;
            })
        }
    }

}
clearFilters();
