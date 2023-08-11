import '../scss/main.scss';
import $ from "jquery";
require('slick-slider');

import '../pages/index.njk';
import '../pages/catalog.njk';
import '../pages/catalog-error.njk';
import '../pages/product-preview.njk';

window.jQuery = $;
window.$ = $;

window.$header = document.querySelector('.header')

function canUseWebp() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}
let UseWebp = canUseWebp()

if(UseWebp)
    UseWebp = "canUseBackground--webp"
else
    UseWebp = "canUseBackground--png"

let background = document.querySelectorAll(".canUseBackground")
background.forEach((item)=>{
    item.classList.add(UseWebp)
})
document.documentElement.style.setProperty('--webp', `${UseWebp}`);
