import functions from './functions';

export default class Discount {
    static get toolbox() {
        return {
            title: 'Discount',
            icon: '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 760.000000 760.000000" preserveAspectRatio="xMidYMid meet"> <metadata> Created by potrace 1.16, written by Peter Selinger 2001-2019 </metadata> <g transform="translate(0.000000,760.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1935 6100 c-239 -51 -430 -153 -596 -319 -163 -164 -264 -349 -347 -636 -24 -86 -26 -104 -29 -383 -5 -332 -1 -370 68 -577 112 -337 321 -579 623 -720 115 -55 167 -72 269 -89 348 -60 658 -3 926 171 112 72 292 252 348 348 151 259 204 435 222 738 25 425 -44 737 -222 1004 -149 224 -362 373 -645 450 -88 24 -116 27 -312 29 -183 3 -228 1 -305 -16z m335 -576 c120 -27 197 -96 265 -239 71 -148 101 -347 92 -605 -14 -375 -113 -616 -291 -705 -42 -21 -64 -25 -138 -25 -78 0 -96 4 -146 29 -70 35 -150 118 -190 197 -16 32 -45 104 -63 159 l-32 100 -5 258 c-4 284 1 331 49 478 41 124 80 197 137 254 53 53 83 71 162 96 70 22 77 22 160 3z"/> <path d="M4772 6088 c-23 -37 -98 -173 -182 -328 -31 -58 -144 -260 -250 -450 -106 -190 -220 -394 -253 -455 -33 -60 -93 -168 -133 -240 -40 -71 -139 -251 -221 -400 -241 -435 -581 -1046 -1121 -2015 -260 -466 -372 -676 -372 -695 0 -8 9 -19 19 -25 25 -13 500 -14 534 -1 18 7 46 50 102 153 43 79 110 199 148 268 39 69 102 184 142 255 204 370 681 1225 703 1260 14 22 51 87 82 145 32 58 139 254 240 435 101 182 232 420 293 530 60 110 135 245 167 300 73 128 124 219 321 578 89 161 178 321 199 357 104 181 181 333 176 345 -4 13 -50 15 -290 15 l-284 0 -20 -32z"/> <path d="M5170 4240 c-279 -60 -535 -213 -683 -410 -92 -122 -190 -311 -236 -452 -52 -164 -61 -242 -61 -534 0 -260 0 -264 30 -381 67 -260 162 -439 319 -605 312 -330 738 -449 1186 -333 289 75 530 250 704 510 99 148 138 240 188 445 24 98 26 125 30 407 l5 302 -31 123 c-32 128 -71 240 -117 330 -78 156 -214 317 -349 414 -129 91 -339 172 -505 194 -127 16 -383 11 -480 -10z m419 -609 c95 -50 164 -146 210 -294 45 -147 56 -232 55 -437 -1 -283 -24 -417 -99 -576 -51 -109 -111 -173 -203 -217 -57 -26 -71 -29 -136 -25 -207 13 -332 158 -401 463 -22 95 -32 449 -16 553 19 119 57 254 93 328 41 85 123 175 191 209 48 24 60 26 157 23 86 -3 113 -8 149 -27z"/> </g> </svg>',
        };
    }

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    validate(savedData){

        return true;
    }

    create_element(img_src, text_value, id) {

        let wrap_div = document.createElement('div');
        wrap_div.classList.add('discount_wrap_el');
        let el_img = document.createElement('div');
        el_img.classList.add('discount_el_img');

        let img = document.createElement('img');
        img.src = img_src;
        img.id = 'img_' + id;
        let input_img = document.createElement('input');
        input_img.type = 'file';
        input_img.classList.add('input_upl');
        input_img.accept = 'image/*';
        el_img.appendChild(img);
        el_img.appendChild(input_img);

        let input_head = document.createElement('input');
        input_head.type = 'text';
        input_head.classList.add('discount_input_head');

        let input_text = document.createElement('input');
        input_text.type = 'text';
        input_text.classList.add('discount_input_text');

        let input_text2 = document.createElement('input');
        input_text2.type = 'text';
        input_text2.classList.add('discount_input_text');
        input_text2.classList.add('disc_input_text2');

        let el_text = document.createElement('div');
        el_text.classList.add('discount_wrap_el_info');

        if(text_value[0]) {
            console.log('text value ', text_value)
            input_head.value = text_value[0];
            input_text.value = text_value[1];
            input_text2.value = text_value[2];
        } else {
            input_head.value = 'Скидка 20%';
            input_text.value = 'Приобретите абонемент со скидкой';
            input_text2.value = 'на 1 месяц в день мероприятия';
        }

        let disc_btn = document.createElement('button');
        disc_btn.innerText = "Записаться на пробное занятие";
        disc_btn.classList.add('discount_btn');

        let term = document.createElement('div');
        term.classList.add('discount_term');
        term.innerHTML = '<span>*</span> Акция действует для новых гостей';

        el_text.appendChild(input_head);
        el_text.appendChild(input_text);
        el_text.appendChild(input_text2);
        el_text.appendChild(disc_btn);
        el_text.appendChild(term);



        // wrap_text.appendChild(input_text)

        wrap_div.appendChild(el_img);
        wrap_div.appendChild(el_text);
        // wrap_div.appendChild(wrap_input_text);

        el_img.addEventListener('click', (event) => {
            input_img.click();
        })

        input_img.addEventListener('change', (event) => {
            let csrf    = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            let img     = event.target.files[0]
            let fd      = new FormData();

            fd.append('image', img)
            axios
                .post('api/uploadFile?' + 'csrf=' + csrf, fd)
                .then(res => {

                    if(res.data.file.url) {
                        document.getElementById('img_' + id).src = res.data.file.url;
                        img.src = res.data.file.url
                    }
                });
        })

        return wrap_div;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('discount_img_main');


        if('img_url' in this.data) {
            this.wrapper.appendChild(this.create_element(this.data.img_url, this.data.value ? this.data.value : [] , functions.id_gen()));
        } else {
            this.wrapper.appendChild(this.create_element('img/noPhoto.png', [], functions.id_gen()));
        }


        return this.wrapper;
    }


    save(blockContent){
        // let elements    = blockContent.querySelectorAll('.discount_el_img');
        let img         = blockContent.querySelector('.discount_el_img img').src;
        let disc_value  = blockContent.querySelectorAll('.discount_wrap_el_info input');
        let value       = [];
        disc_value.forEach(el => {
            value.push(el.value);
        })

        // elements.forEach(el => {
        //     img.push(el.querySelector('.discount_el_img img').src);
        //     // value.push(el.querySelector('input[type=text]').value)
        // })
        return {
            img_url: img,
            value: value,
        }
    }
}
