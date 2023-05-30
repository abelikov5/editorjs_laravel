import functions from './functions';

export default class Metro {
    static get toolbox() {
        return {
            title: 'Metro',
            icon: '<svg  width="17" height="15" viewBox="0 0 980.000000 740.000000" preserveAspectRatio="xMidYMid meet"> <metadata> Created by potrace 1.16, written by Peter Selinger 2001-2019 </metadata> <g transform="translate(0.000000,740.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M4705 7394 c-754 -45 -1346 -197 -1965 -505 -1379 -686 -2357 -1975 -2649 -3489 -175 -912 -91 -1891 238 -2753 83 -217 207 -480 288 -610 l23 -37 4263 2 4262 3 90 180 c279 557 459 1187 527 1845 19 187 16 716 -5 910 -60 539 -177 998 -374 1463 -65 154 -225 468 -311 609 -486 800 -1154 1426 -1968 1845 -563 290 -1134 457 -1766 518 -155 14 -539 26 -653 19z m531 -604 c1250 -98 2371 -713 3127 -1717 687 -912 987 -2085 822 -3217 -59 -408 -198 -873 -350 -1175 l-35 -71 -3894 0 -3894 0 -42 96 c-107 243 -195 516 -259 794 -250 1103 -64 2258 519 3220 588 970 1541 1676 2635 1951 240 60 486 99 770 122 98 8 484 6 601 -3z"/> <path d="M3552 6080 c-9 -22 -1827 -4597 -1839 -4628 -4 -9 -62 -12 -244 -12 l-239 0 0 -190 0 -190 1310 0 1310 0 0 190 0 190 -255 0 c-144 0 -255 4 -255 9 0 9 478 1352 503 1413 l13 32 110 -189 c61 -105 298 -515 529 -913 230 -397 422 -719 426 -715 4 4 233 414 509 911 277 496 505 900 508 897 3 -3 121 -328 262 -723 l256 -717 -258 -3 -258 -2 0 -190 0 -190 1300 0 1300 0 0 190 0 190 -226 2 -226 3 -901 2318 -901 2318 -34 -3 -34 -3 -645 -1265 c-355 -696 -649 -1269 -653 -1273 -4 -5 -294 540 -645 1210 -796 1518 -712 1363 -723 1333z"/> </g> </svg>',

        };
    }

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    validate(savedData){

        return true;
    }

    create_element(text_value, id) {

        let wrap_div = document.createElement('div');
        wrap_div.classList.add('metro_wrap_el');

        let metro_logo = document.createElement('img');
        metro_logo.classList.add('metro_logo');
        metro_logo.src = 'img/svg/metro_logo.svg';

        let input_head = document.createElement('textarea');
        input_head.classList.add('metro_input');

        if(text_value) {
            input_head.value = text_value;
        } else {
            input_head.value = 'Бульвар Рокоссовского Открытое ш., 4с1';
        }

        wrap_div.appendChild(metro_logo);
        wrap_div.appendChild(input_head);

        return wrap_div;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('metro_main');

        this.wrapper.appendChild(this.create_element(this.data.value ? this.data.value : '' , functions.id_gen()));

        return this.wrapper;
    }


    save(blockContent){
        let disc_value  = blockContent.querySelector('.metro_input');
        return {
            value: disc_value.value,
        }
    }
}
