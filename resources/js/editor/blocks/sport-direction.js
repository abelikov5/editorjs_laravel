import functions from './functions';

export default class SportDirection {
    static get toolbox() {
        return {
            title: 'Sport Direction',
            icon: '<svg width="17" height="15" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M253 5106 c-104 -34 -177 -98 -222 -196 -20 -44 -25 -70 -25 -135 -1 -147 -20 -122 563 -707 283 -285 513 -519 511 -521 -3 -2 -122 -13 -265 -25 -160 -13 -279 -27 -310 -37 -291 -96 -314 -501 -36 -637 75 -36 169 -34 843 21 708 58 694 56 789 150 94 95 92 81 150 789 55 674 57 768 21 843 -56 113 -162 186 -285 196 -153 13 -302 -83 -352 -227 -10 -27 -24 -148 -37 -310 -12 -146 -23 -267 -25 -270 -2 -2 -236 228 -521 511 -457 456 -523 519 -572 539 -67 28 -169 35 -227 16z"/> <path d="M4697 5110 c-89 -23 -121 -51 -634 -563 -282 -281 -514 -509 -516 -507 -2 3 -13 122 -25 265 -13 160 -27 279 -37 310 -95 291 -501 314 -637 36 -36 -75 -34 -170 21 -843 58 -708 56 -694 150 -789 95 -95 82 -92 785 -150 697 -58 748 -59 828 -29 117 43 205 164 215 294 13 152 -84 302 -227 351 -27 9 -150 24 -310 37 -146 11 -267 23 -270 25 -2 2 228 236 511 521 583 584 563 560 564 707 0 93 -27 164 -90 234 -74 82 -222 127 -328 101z"/> <path d="M3834 2253 c-709 -58 -712 -58 -797 -133 -50 -45 -89 -105 -106 -165 -17 -62 -113 -1247 -109 -1350 4 -101 24 -153 84 -223 48 -56 145 -103 227 -109 153 -13 302 83 352 227 10 28 24 146 37 310 12 146 23 267 25 270 2 2 236 -228 521 -511 584 -583 559 -563 707 -564 71 0 88 4 147 33 77 38 130 92 166 171 21 45 26 71 27 136 0 70 -4 89 -33 150 -31 65 -67 104 -538 576 l-505 506 233 17 c128 9 258 22 288 28 120 23 202 83 252 186 29 59 33 76 33 152 0 72 -4 94 -28 145 -53 114 -161 187 -287 197 -30 2 -343 -20 -696 -49z"/> <path d="M493 2282 c-170 -68 -259 -248 -208 -418 31 -104 115 -194 215 -229 28 -10 146 -24 310 -37 146 -12 267 -23 270 -25 2 -2 -228 -236 -511 -521 -583 -585 -564 -560 -563 -707 0 -65 5 -91 26 -136 36 -79 89 -133 166 -171 59 -29 76 -33 147 -33 148 1 123 -19 707 564 285 283 519 513 521 511 2 -3 13 -122 25 -265 13 -160 27 -279 37 -310 96 -292 500 -314 637 -36 18 35 24 68 26 136 5 121 -93 1310 -112 1363 -37 104 -114 181 -218 218 -46 16 -1212 114 -1349 113 -54 0 -99 -6 -126 -17z"/> </g> </svg>'
        };
    }

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    validate(savedData){

        return true;
    }

    create_element(img_src, input_text_value, id) {

        let wrap_div = document.createElement('div');
        wrap_div.classList.add('wrap_el_img');
        let el_img = document.createElement('div');
        el_img.classList.add('el_img');

        let img = document.createElement('img');
        img.src = img_src;
        img.id = 'img_' + id;
        let input_img = document.createElement('input');
        input_img.type = 'file';
        input_img.classList.add('input_upl');
        input_img.accept = 'image/*';
        el_img.appendChild(img);
        el_img.appendChild(input_img);

        let input_text = document.createElement('input');
        input_text.type = 'text';
        input_text.value = input_text_value;
        input_text.classList.add('input_text');
        let wrap_input_text = document.createElement('div');
        wrap_input_text.appendChild(input_text)

        wrap_div.appendChild(el_img);
        wrap_div.appendChild(wrap_input_text);

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

        for(let i = 0; i < 3; i++) {
            if('img_url' in this.data) {
                this.wrapper.appendChild(this.create_element(this.data.img_url[i], this.data.value[i], functions.id_gen()));
            } else {
                this.wrapper.appendChild(this.create_element('img/noPhoto.png', '', functions.id_gen()));
            }
        }
        return this.wrapper;
    }

    save(blockContent){
        let elements    = blockContent.querySelectorAll('.wrap_el_img');
        let img         = [];
        let value       = [];
        elements.forEach(el => {
            img.push(el.querySelector('.el_img img').src);
            value.push(el.querySelector('input[type=text]').value)
        })
        return {
            img_url: img,
            value: value,
        }
    }
}
