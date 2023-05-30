import functions from './functions';

export default class Schedule {
    static get toolbox() {
        return {
            title: 'Schedule',
            icon: '<svg width="17" height="15" viewBox="0 0 956.000000 981.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,981.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1855 9777 c-54 -26 -100 -72 -122 -124 -10 -26 -13 -184 -13 -833 0 -874 -3 -832 59 -902 47 -54 120 -81 201 -76 74 6 112 22 158 69 71 73 67 17 70 888 3 875 4 855 -63 924 -51 53 -90 70 -170 74 -59 3 -78 0 -120 -20z"/> <path d="M5775 9776 c-60 -28 -87 -56 -114 -116 -20 -44 -21 -61 -21 -840 0 -779 1 -796 21 -840 27 -60 54 -88 114 -116 102 -48 237 -20 300 61 56 75 55 51 55 895 0 844 1 822 -55 896 -61 80 -199 108 -300 60z"/> <path d="M790 9045 c-412 -83 -729 -426 -780 -845 -8 -70 -10 -942 -8 -3365 l3 -3270 22 -80 c58 -216 176 -401 338 -532 96 -78 266 -163 385 -195 l85 -23 1848 -2 c1016 -2 1847 -1 1847 2 0 2 -40 65 -89 139 -49 75 -115 183 -146 241 l-57 105 -1611 0 c-946 0 -1646 4 -1694 10 -192 22 -346 142 -415 326 l-23 59 -3 3245 c-2 2334 0 3263 8 3310 31 180 171 334 355 391 26 7 143 13 328 16 l287 5 0 239 0 239 -307 -1 c-211 -1 -328 -5 -373 -14z"/> <path d="M2450 8820 l0 -240 1470 0 1470 0 0 240 0 240 -1470 0 -1470 0 0 -240z"/> <path d="M6370 8820 l0 -240 253 0 c290 0 355 -8 452 -54 126 -60 214 -162 255 -294 20 -63 20 -96 20 -1342 l0 -1279 48 -6 c79 -11 292 -54 370 -74 l72 -19 -2 1376 -3 1377 -28 88 c-97 311 -318 548 -607 652 -136 49 -197 55 -526 55 l-304 0 0 -240z"/> <path d="M1620 6599 c-44 -18 -89 -59 -117 -107 -24 -40 -28 -58 -27 -122 0 -136 76 -225 205 -244 108 -16 208 35 254 128 24 49 27 65 23 129 -7 145 -95 228 -242 226 -39 0 -82 -5 -96 -10z"/> <path d="M2590 6594 c-46 -20 -87 -59 -113 -109 -28 -53 -30 -174 -3 -225 25 -49 64 -88 111 -113 l40 -22 1910 0 c1855 0 1911 1 1948 19 46 23 92 67 114 109 21 41 28 142 14 195 -14 51 -70 116 -122 143 -37 19 -81 19 -1951 19 -1687 -1 -1917 -3 -1948 -16z"/> <path d="M1620 5127 c-56 -18 -116 -86 -136 -153 -56 -192 102 -360 295 -314 114 27 181 116 181 240 -1 104 -53 187 -142 224 -43 18 -146 20 -198 3z"/> <path d="M2585 5120 c-56 -28 -103 -85 -122 -149 -34 -120 14 -236 122 -294 l40 -22 1055 -3 1055 -2 110 106 c106 103 281 248 395 329 30 21 59 42 64 47 6 4 -595 8 -1335 8 -1312 -1 -1345 -1 -1384 -20z"/> <path d="M6760 5134 c-144 -18 -272 -39 -375 -64 -923 -221 -1656 -943 -1890 -1862 -177 -693 -54 -1444 333 -2033 252 -385 606 -701 1007 -902 625 -313 1356 -357 2020 -122 159 57 404 180 545 274 513 343 887 848 1055 1426 72 249 99 449 99 729 -2 410 -77 741 -253 1105 -294 609 -802 1070 -1436 1303 -129 47 -357 105 -505 128 -101 15 -517 28 -600 18z m455 -494 c543 -61 1059 -344 1395 -765 295 -370 460 -839 460 -1305 0 -974 -691 -1830 -1641 -2034 -715 -154 -1447 73 -1954 605 -369 387 -567 887 -567 1429 0 542 198 1042 567 1429 333 349 768 573 1235 635 126 17 381 20 505 6z"/> <path d="M6774 3904 c-47 -17 -105 -69 -131 -117 -17 -29 -18 -85 -21 -696 -2 -573 0 -671 13 -717 18 -63 52 -106 109 -138 74 -43 1322 -526 1358 -526 88 0 174 56 211 139 42 95 11 237 -66 295 -25 19 -439 185 -1097 440 l-35 14 -5 578 -5 579 -28 47 c-59 101 -186 143 -303 102z"/> <path d="M1620 3657 c-56 -18 -116 -86 -136 -153 -56 -192 102 -360 295 -314 114 27 181 116 181 240 -1 104 -53 187 -142 224 -43 18 -146 20 -198 3z"/> <path d="M2581 3644 c-174 -87 -172 -342 4 -437 40 -22 42 -22 719 -22 l679 0 33 128 c18 70 51 180 73 243 l40 114 -748 0 -747 0 -53 -26z"/> </g> </svg>'
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
        wrap_div.classList.add('schedule_wrap_el');
        let el_img = document.createElement('div');
        el_img.classList.add('schedule_el_img');

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

        for(let i = 0; i < 2; i++) {
            if('img_url' in this.data) {
                this.wrapper.appendChild(this.create_element(this.data.img_url[i], this.data.value[i], functions.id_gen()));
            } else {
                this.wrapper.appendChild(this.create_element('img/noPhoto.png', '', functions.id_gen()));
            }
        }

        return this.wrapper;
    }
    save(blockContent){
        let elements    = blockContent.querySelectorAll('.schedule_wrap_el');
        let img         = [];
        let value       = [];
        elements.forEach(el => {
            img.push(el.querySelector('.schedule_el_img img').src);
            value.push(el.querySelector('input[type=text]').value)
        })
        return {
            img_url: img,
            value: value,
        }
    }
}
