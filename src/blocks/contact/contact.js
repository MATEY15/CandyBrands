import IMask from 'imask';

const inputPhone = document.querySelector('[name="phone"]')
if(inputPhone) {
    let phoneMask = IMask(inputPhone, {
        mask: '+{7} ({9}00) 000-00-00',
        lazy: true,
        placeholderChar: '#'
    });
}
