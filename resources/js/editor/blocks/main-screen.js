import functions from './functions';

export default class mainScreen {
    static get toolbox() {
        return {
            title: 'MainScreen',
            icon: '<svg width="17" height="15" viewBox="0 0 1024.000000 1024.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1295 9269 c-38 -5 -110 -20 -158 -34 -434 -123 -751 -494 -806 -940 -16 -127 -16 -6223 0 -6350 62 -508 466 -912 974 -974 128 -16 7502 -16 7630 0 512 63 917 472 974 982 16 137 15 6217 0 6342 -62 509 -465 912 -974 974 -111 13 -7532 13 -7640 0z m5017 -651 c22 -13 51 -41 64 -64 23 -39 24 -48 24 -234 0 -186 -1 -195 -24 -234 -13 -23 -42 -51 -64 -64 -37 -21 -51 -22 -232 -22 -186 0 -195 1 -234 24 -23 13 -51 42 -64 64 -21 37 -22 51 -22 233 0 186 1 196 24 233 13 21 41 49 62 62 37 23 47 24 233 24 182 0 196 -1 233 -22z m1284 -3 c74 -43 84 -79 84 -297 0 -174 -1 -187 -23 -228 -16 -30 -37 -51 -67 -67 -41 -22 -54 -23 -228 -23 -218 0 -254 10 -297 84 -24 42 -25 48 -25 237 0 186 1 196 24 233 13 21 41 49 62 62 37 23 47 24 233 24 189 0 195 -1 237 -25z m1276 3 c22 -13 51 -41 64 -64 23 -39 24 -48 24 -234 0 -186 -1 -195 -24 -234 -13 -23 -42 -51 -64 -64 -37 -21 -51 -22 -232 -22 -186 0 -195 1 -234 24 -23 13 -51 42 -64 64 -21 37 -22 51 -22 233 0 186 1 196 24 233 13 21 41 49 62 62 37 23 47 24 233 24 182 0 196 -1 233 -22z m408 -3930 c0 -2908 3 -2717 -55 -2833 -47 -92 -146 -180 -256 -227 l-54 -23 -3760 -3 c-2806 -2 -3774 0 -3815 8 -175 37 -329 188 -369 360 -7 30 -11 910 -11 2718 l0 2672 4160 0 4160 0 0 -2672z"/> <path d="M2672 6713 c-41 -8 -100 -76 -107 -125 -3 -24 -5 -268 -3 -543 3 -498 3 -500 25 -531 12 -17 35 -40 50 -50 27 -18 96 -19 2483 -19 2387 0 2456 1 2483 19 15 10 38 33 50 50 l22 31 0 535 0 535 -22 31 c-12 17 -35 40 -50 50 -27 18 -97 19 -2468 20 -1342 1 -2450 -1 -2463 -3z"/> <path d="M2672 5113 c-42 -8 -100 -76 -107 -125 -3 -24 -5 -628 -3 -1343 3 -1254 4 -1301 22 -1328 10 -15 33 -38 50 -50 l31 -22 855 0 855 0 31 22 c17 12 40 35 50 50 18 27 19 72 19 1363 l0 1335 -22 31 c-12 17 -35 40 -50 50 -27 18 -63 19 -868 20 -462 1 -850 -1 -863 -3z"/> <path d="M4825 5095 c-24 -23 -25 -31 -25 -135 0 -104 1 -112 25 -135 l24 -25 1391 0 1391 0 24 25 c24 23 25 31 25 135 0 104 -1 112 -25 135 l-24 25 -1391 0 -1391 0 -24 -25z"/> <path d="M4825 4455 c-24 -23 -25 -31 -25 -135 0 -104 1 -112 25 -135 l24 -25 1391 0 1391 0 24 25 c24 23 25 31 25 135 0 104 -1 112 -25 135 l-24 25 -1391 0 -1391 0 -24 -25z"/> <path d="M4825 3815 c-24 -23 -25 -31 -25 -135 0 -104 1 -112 25 -135 l24 -25 1391 0 1391 0 24 25 c24 23 25 31 25 135 0 104 -1 112 -25 135 l-24 25 -1391 0 -1391 0 -24 -25z"/> <path d="M4825 3175 c-24 -23 -25 -31 -25 -135 0 -104 1 -112 25 -135 l24 -25 1391 0 1391 0 24 25 c24 23 25 31 25 135 0 104 -1 112 -25 135 l-24 25 -1391 0 -1391 0 -24 -25z"/> <path d="M4825 2535 c-24 -23 -25 -31 -25 -135 0 -104 1 -112 25 -135 l24 -25 1391 0 1391 0 24 25 c24 23 25 31 25 135 0 104 -1 112 -25 135 l-24 25 -1391 0 -1391 0 -24 -25z"/> </g> </svg>',
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
        wrap_div.classList.add('main_wrap_el');

        let el_img = document.createElement('div');
        el_img.classList.add('main_el_img');
        let img = document.createElement('img');
        img.src = img_src;
        img.id = 'img_' + id;
        let input_img = document.createElement('input');
        input_img.type = 'file';
        input_img.classList.add('input_upl');
        input_img.accept = 'image/*';
        el_img.appendChild(img);
        el_img.appendChild(input_img);

        let wrap_textarea = document.createElement('div');
        wrap_textarea.classList.add('main_wrap_textarea')

        let input_head = document.createElement('textarea');
        input_head.classList.add('main_input_head');

        let input_head_up = document.createElement('textarea');
        input_head_up.classList.add('main_input_head_up');

        let input_text = document.createElement('textarea');
        input_text.classList.add('main_input_text');

        let el_text = document.createElement('div');
        el_text.classList.add('main_wrap_el_info');

        if(text_value[0]) {
            input_head_up.value = text_value[0];
            input_head.value = text_value[1];
            input_text.value = text_value[2];
        } else {
            input_head_up.value = 'Проверим, кто спортивнее - ты или она?'
            input_head.value = 'Спортивная школа для детей';
            input_text.value = 'Спортивная программа по мотивам известного сериала';
        }

        let disc_btn = document.createElement('button');
        disc_btn.innerText = "Записаться";
        disc_btn.classList.add('form_btn');

        el_text.appendChild(input_head_up);
        el_text.appendChild(input_head);
        el_text.appendChild(input_text);
        el_text.appendChild(disc_btn);


        // el_text.appendChild(term);

        wrap_textarea.appendChild(el_text);
        wrap_div.appendChild(wrap_textarea);
        wrap_div.appendChild(el_img);


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
        this.wrapper.classList.add('main_img_main');


        if('img_url' in this.data) {
            console.log('render', this.data);
            this.wrapper.appendChild(this.create_element(this.data.img_url, this.data.value ? this.data.value : [] , functions.id_gen()));
        } else {
            this.wrapper.appendChild(this.create_element('img/noPhoto.png', [], functions.id_gen()));
        }


        return this.wrapper;
    }


    save(blockContent){
        let img         = blockContent.querySelector('.main_el_img img').src;
        let disc_value  = blockContent.querySelectorAll('.main_wrap_el_info textarea');
        let value       = [];
        disc_value.forEach(el => {
            value.push(el.value.replace(/[\n\r]/g, '<br>'));
        })
        return {
            img_url: img,
            value: value,
        }
    }
}
