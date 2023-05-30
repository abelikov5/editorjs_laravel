import functions from './functions';

export default class Gallery {
    static get toolbox() {
        return {
            title: 'Gallery',
            icon: '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 981.000000 984.000000" preserveAspectRatio="xMidYMid meet"> <metadata> Created by potrace 1.16, written by Peter Selinger 2001-2019 </metadata> <g transform="translate(0.000000,984.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1610 9824 c-213 -46 -385 -215 -435 -427 -8 -34 -15 -74 -15 -89 l0 -28 330 0 329 0 48 30 c26 17 63 35 83 40 22 6 1065 10 2926 10 3148 0 2944 4 3024 -55 l34 -25 333 0 333 0 0 30 c0 55 -22 135 -57 210 -63 132 -191 241 -352 298 -42 15 -310 17 -3281 19 -2747 1 -3245 -1 -3300 -13z"/> <path d="M1022 8925 c-35 -8 -103 -33 -150 -56 -72 -34 -102 -57 -172 -128 -118 -119 -181 -246 -196 -397 l-7 -64 363 0 363 0 48 51 c28 28 74 62 106 77 l58 27 3460 0 3460 0 57 -28 c33 -16 76 -49 102 -78 l44 -49 367 0 368 0 -7 61 c-18 158 -82 287 -201 406 -65 64 -99 89 -166 121 -165 79 217 72 -4031 71 -3186 0 -3813 -3 -3866 -14z"/> <path d="M535 7944 c-202 -43 -380 -186 -471 -379 -69 -146 -64 134 -64 -3585 0 -3723 -5 -3436 64 -3585 82 -175 222 -299 411 -363 l80 -27 4310 -3 c4809 -3 4389 -9 4550 68 146 69 250 174 320 322 70 147 65 -140 65 3588 0 3723 5 3442 -64 3585 -72 152 -172 253 -321 325 -158 76 258 70 -4522 69 -3744 -1 -4297 -3 -4358 -15z m8539 -514 c76 -29 139 -88 178 -168 l33 -67 3 -2118 2 -2119 -58 54 c-33 29 -272 251 -531 493 -260 242 -489 450 -509 463 -20 12 -55 27 -76 33 -54 15 -207 14 -253 -2 -82 -26 -33 18 -1261 -1147 l-373 -354 -303 299 c-1123 1107 -2190 2150 -2212 2161 -14 7 -32 11 -39 9 -7 -3 -32 1 -56 10 -95 33 -203 -2 -341 -110 -79 -61 -2730 -2014 -2756 -2031 -10 -6 -12 444 -10 2186 l3 2193 24 47 c39 80 124 152 211 179 14 4 1880 8 4147 8 4121 1 4122 1 4177 -19z m-3627 -4866 c1049 -1015 1955 -1893 2013 -1950 l105 -104 -3410 2 -3410 3 -50 27 c-66 35 -128 100 -159 168 l-26 55 0 711 0 711 1508 1111 c829 610 1510 1110 1514 1111 3 1 865 -830 1915 -1845z m3185 304 c349 -306 640 -567 646 -580 10 -18 12 -197 10 -774 l-3 -751 -35 -69 c-25 -48 -51 -81 -87 -111 -88 -71 -105 -73 -532 -73 l-376 1 -825 810 c-454 445 -826 814 -828 818 -2 5 122 126 275 269 860 802 1099 1022 1110 1019 6 -1 296 -253 645 -559z"/> <path d="M6465 6503 c-75 -11 -197 -48 -273 -84 -268 -125 -462 -363 -534 -656 -30 -122 -30 -312 0 -436 86 -353 354 -627 702 -717 125 -33 306 -38 430 -12 374 78 656 345 756 717 27 100 27 360 0 460 -49 181 -129 319 -260 450 -144 144 -295 226 -491 266 -84 18 -247 23 -330 12z m280 -428 c235 -62 405 -283 405 -530 0 -247 -170 -468 -405 -530 -76 -19 -210 -19 -289 1 -224 57 -389 261 -403 499 -15 253 156 494 397 559 73 20 221 20 295 1z"/> </g> </svg>',

        };
    }

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    validate(savedData){

        return true;
    }

    create_element(img_src, id) {

        let wrap_div = document.createElement('div');
        wrap_div.classList.add('gallery_wrap_el');
        let el_img = document.createElement('div');
        el_img.classList.add('gallery_el_img');

        let img = document.createElement('img');
        img.src = img_src;
        img.id = 'img_' + id;
        let input_img = document.createElement('input');
        input_img.type = 'file';
        input_img.classList.add('input_upl');
        input_img.accept = 'image/*';
        el_img.appendChild(img);
        el_img.appendChild(input_img);

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
                        console.log('res ', img.src, res)
                        // window.location.href = location.protocol + '//' + location.host + '/dashboard';
                    }
                });
            // this.file_upload(event);
        })

        return wrap_div;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('simple_img_main');

        for(let i = 0; i < 4; i++) {
            if('img_url' in this.data) {
                this.wrapper.appendChild(this.create_element(this.data.img_url[i], functions.id_gen()));
            } else {
                this.wrapper.appendChild(this.create_element('img/noPhoto.png', functions.id_gen()));
            }
        }

        return this.wrapper;
    }

    save(blockContent){
        let elements    = blockContent.querySelectorAll('.gallery_wrap_el');
        let img         = [];
        elements.forEach(el => {
            img.push(el.querySelector('.gallery_el_img img').src);
            // value.push(el.querySelector('input[type=text]').value)
        })
        return {
            img_url: img,
        }
    }
}
