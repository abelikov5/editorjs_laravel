import functions from './functions';

export default class Form {
    static get toolbox() {
        return {
            title: 'Form',
            icon: '<svg  width="17" height="15" viewBox="0 0 980.000000 820.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,820.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1065 8189 c-207 -25 -429 -117 -601 -250 -198 -153 -357 -397 -427 -657 l-32 -117 0 -3065 0 -3065 32 -117 c61 -228 163 -402 333 -568 197 -195 436 -309 706 -340 72 -8 970 -10 3239 -8 2930 3 3145 5 3210 21 263 64 442 162 616 336 160 160 263 338 322 559 l32 117 3 977 3 978 -45 -6 c-25 -4 -161 -21 -303 -38 l-258 -31 -5 -915 c-4 -729 -8 -923 -19 -955 -33 -99 -84 -181 -160 -255 -87 -87 -165 -132 -277 -160 -76 -20 -123 -20 -3184 -20 -3061 0 -3108 0 -3184 20 -111 28 -189 74 -277 160 -61 60 -85 92 -117 160 -22 47 -45 109 -51 138 -16 75 -16 5949 0 6024 6 29 29 91 51 138 77 160 235 286 410 325 66 14 368 15 3203 13 l3130 -3 67 -26 c199 -77 342 -233 392 -426 12 -44 16 -108 16 -227 0 -151 2 -166 18 -166 20 0 498 57 556 66 l39 6 -6 177 c-4 101 -13 205 -21 244 -57 247 -176 458 -354 629 -165 158 -348 255 -587 311 l-90 22 -3155 1 c-1735 1 -3186 -2 -3225 -7z"/> <path d="M1525 6346 c-63 -29 -138 -111 -159 -173 -39 -114 -12 -228 73 -314 99 -99 -215 -89 2871 -89 3086 0 2772 -10 2871 89 85 86 112 200 73 314 -21 62 -96 144 -159 173 l-50 24 -2735 0 -2735 0 -50 -24z"/> <path d="M8691 6345 c-43 -20 -103 -74 -285 -255 l-231 -229 555 -556 555 -555 228 228 c156 155 236 242 254 276 34 66 40 139 18 207 -16 50 -44 81 -419 458 -442 444 -450 451 -561 451 -43 0 -75 -7 -114 -25z"/> <path d="M6602 4297 l-1312 -1312 0 -553 0 -552 568 0 567 0 1310 1310 1310 1310 -555 555 c-305 305 -559 555 -565 555 -6 0 -601 -591 -1323 -1313z m1390 802 c30 -16 50 -72 37 -106 -13 -36 -1403 -1428 -1446 -1448 -28 -14 -36 -14 -67 -1 -40 17 -56 42 -56 88 0 30 57 90 723 755 665 666 725 723 755 723 18 0 42 -5 54 -11z m-1306 -2448 c-226 -226 -181 -203 -415 -217 l-114 -7 7 99 c3 54 9 133 12 175 l7 75 -172 -4 c-146 -4 -171 -2 -171 10 0 8 9 75 20 149 l21 134 197 198 197 197 305 -305 305 -305 -199 -199z"/> <path d="M1570 4547 c-97 -27 -185 -115 -211 -212 -6 -22 -9 -69 -7 -105 8 -110 68 -199 166 -247 l57 -28 2005 -3 c2261 -3 2066 -9 2161 76 74 66 103 129 103 222 1 127 -64 229 -179 282 l-50 23 -2000 2 c-1548 1 -2010 -1 -2045 -10z"/> <path d="M1593 2730 c-142 -29 -243 -153 -243 -299 0 -115 61 -215 164 -269 l51 -27 1025 0 1025 0 51 27 c112 59 170 164 162 292 -8 116 -61 197 -166 248 l-67 33 -980 2 c-539 0 -999 -3 -1022 -7z"/> </g> </svg>',

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
        wrap_div.classList.add('form_wrap_el');
        let el_img = document.createElement('div');
        el_img.classList.add('form_el_img');

        let img = document.createElement('img');
        img.src = img_src;
        img.id = 'img_' + id;
        let input_img = document.createElement('input');
        input_img.type = 'file';
        input_img.classList.add('input_upl');
        input_img.accept = 'image/*';
        el_img.appendChild(img);
        el_img.appendChild(input_img);

        let input_head = document.createElement('textarea');
        // input_head.type = 'text';
        input_head.classList.add('form_input_head');

        let input_text = document.createElement('textarea');
        input_text.classList.add('form_input_text');

        let el_text = document.createElement('div');
        el_text.classList.add('form_wrap_el_info');

        let form = document.createElement('div');
        form.innerHTML = `<form class="contact_form" >
                              <div class="uk-margin uk-position-relative">
                                <input type="text" class="form_input required" required="required" name="name" placeholder="Имя">
                              </div>

                              <div class="uk-margin uk-position-relative">
                                <input type="text" class="form_input required" required="required" name="phone" inputmode="text" placeholder="Телефон">
                              </div>

                              <div class="uk-margin uk-position-relative">
                                <input type="text" class="form_input required" required="required" name="email" placeholder="Email">
                              </div>
                        </form>`

        if(text_value[0]) {
            input_head.value = text_value[0];
            input_text.value = text_value[1];
        } else {
            input_head.value = 'Запишитесь на день открытых дверей';
            input_text.value = 'Оставьте заявку и вам перезвонит оператор';
        }

        let disc_btn = document.createElement('button');
        disc_btn.innerText = "Отправить";
        disc_btn.classList.add('form_btn');

        el_text.appendChild(input_head);
        el_text.appendChild(input_text);
        el_text.appendChild(form)
        el_text.appendChild(disc_btn);

        // el_text.appendChild(term);

        wrap_div.appendChild(el_img);
        wrap_div.appendChild(el_text);

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
        this.wrapper.classList.add('form_img_main');


        if('img_url' in this.data) {
            this.wrapper.appendChild(this.create_element(this.data.img_url, this.data.value ? this.data.value : [] , functions.id_gen()));
        } else {
            this.wrapper.appendChild(this.create_element('img/noPhoto.png', [], functions.id_gen()));
        }


        return this.wrapper;
    }


    save(blockContent){
        let img         = blockContent.querySelector('.form_el_img img').src;
        let disc_value  = blockContent.querySelectorAll('.form_wrap_el_info textarea');
        let value       = [];
        disc_value.forEach(el => {
            value.push(el.value.replace(/[\n\r]/g, '<br>'));
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
