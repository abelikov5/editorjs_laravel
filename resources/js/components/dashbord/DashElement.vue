<template>
<!--    <div class="dash_body">-->
        <div class="dash_item d_flex">
            <div class="dash_id d_left">
                {{this.data.id}}
            </div>
            <div class="dash_created d_left">
                {{ this.data.updated_at ? this.data.updated_at : this.data.created_at }}
            </div>
            <div class="dash_slug d_left">
                <div>
                    {{this.data.header}}
                    <div v-if="this.role === 'marketing'">
                        <a :href="this.base + 'test/editor/' + this.data.pageId" target="_blank">Открыть страницу</a>
                    </div>
                    <div v-else>
                        <div v-if="this.data.slack">
                            <a :href="this.base + this.data.slack" target="_blank">{{ this.data.slack }}</a>
                        </div>
                    </div>


                </div>

            </div>
            <div class="dash_status d_flex d_left">
                <div class="page_active" v-if="this.data.active">
                    <div class="green_ring">

                    </div>
                </div>
                <div class="page_disable" v-else>
                    <div class="red_ring">

                    </div>
                </div>

            </div>
            <div class="dash_edit d_flex d_left">
                <div  @click="setup_page">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 981.000000 980.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)" stroke="none"> <path d="M3335 9770 c-468 -84 -885 -303 -1003 -527 -46 -87 -50 -136 -19 -258 90 -361 58 -809 -79 -1093 -92 -191 -308 -366 -549 -447 -229 -76 -559 -70 -785 14 -181 67 -285 77 -369 35 -185 -93 -380 -416 -482 -799 -64 -241 -63 -409 3 -548 46 -95 86 -140 156 -173 228 -106 348 -184 494 -323 123 -117 186 -198 244 -316 70 -142 87 -222 88 -405 0 -121 -3 -170 -18 -225 -51 -191 -146 -346 -311 -510 -140 -139 -253 -219 -431 -305 -157 -76 -199 -113 -233 -205 -49 -131 -46 -286 9 -505 52 -208 126 -389 232 -567 87 -145 151 -213 245 -260 67 -33 86 -38 168 -41 77 -4 107 0 181 21 223 64 418 86 601 68 297 -29 454 -103 611 -288 165 -193 245 -437 228 -698 -9 -136 -35 -239 -103 -402 -57 -137 -58 -139 -58 -238 0 -79 4 -107 19 -135 111 -209 420 -406 858 -549 155 -50 259 -72 373 -78 226 -13 370 72 451 268 130 313 401 586 693 695 291 110 636 71 893 -99 202 -135 389 -368 478 -597 8 -19 17 -37 20 -40 3 -3 18 -26 33 -51 38 -67 127 -144 189 -165 143 -47 518 36 813 181 246 121 402 244 456 360 60 127 58 214 -10 381 -73 182 -86 252 -86 469 1 217 15 293 85 443 118 251 300 426 512 490 304 94 537 88 947 -23 150 -40 232 -31 376 43 169 88 335 327 439 634 56 163 76 268 83 418 5 122 3 141 -16 191 -51 134 -150 226 -339 315 -149 70 -244 138 -347 245 -192 203 -285 439 -285 727 0 292 93 524 299 744 129 138 268 235 443 309 120 50 193 112 235 197 26 52 28 66 27 167 -1 136 -34 296 -105 508 -119 358 -290 618 -445 677 -50 18 -73 21 -149 17 -77 -4 -101 -9 -165 -40 -101 -47 -214 -82 -338 -102 -142 -24 -401 -17 -517 14 -278 74 -525 286 -655 564 -47 101 -75 204 -91 339 -21 179 2 342 76 539 58 155 71 223 55 288 -23 99 -172 270 -332 384 -221 157 -615 287 -870 287 -102 0 -155 -27 -240 -119 -63 -69 -78 -94 -147 -241 -50 -108 -110 -190 -210 -291 -155 -155 -311 -245 -521 -301 -109 -29 -357 -36 -469 -14 -206 42 -368 132 -531 296 -120 120 -181 209 -268 391 -81 166 -138 235 -218 263 -62 21 -190 20 -319 -4z m1830 -2591 c485 -56 959 -281 1315 -625 368 -356 602 -813 676 -1319 24 -164 24 -476 0 -640 -45 -307 -150 -599 -311 -865 -395 -652 -1062 -1055 -1820 -1100 -502 -30 -991 102 -1399 378 -146 98 -238 176 -371 313 -330 342 -542 763 -622 1234 -26 157 -26 563 0 720 78 461 282 872 607 1218 159 170 392 341 626 460 401 203 837 279 1299 226z"/> </g> </svg>
                </div>
                <div @click="edit_page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" class="fill-current">
                        <path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z"></path>
                    </svg>
                </div>
                <div class="dash_del" @click="del_page" v-if="this.role !== 'marketing'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete">
                        <path d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path>
                    </svg>
                </div>
                <div @click="copy_page">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 810.000000 980.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"> <path d="M2736 9789 c-161 -24 -369 -111 -497 -208 -144 -110 -280 -285 -345 -446 -60 -147 -76 -224 -81 -397 l-5 -157 -447 -3 c-444 -4 -446 -4 -542 -30 -361 -98 -653 -375 -762 -723 -55 -177 -52 34 -52 -3540 0 -3151 1 -3314 18 -3399 47 -229 152 -421 319 -582 131 -127 299 -221 485 -272 l98 -27 2225 0 2225 0 97 27 c311 86 564 290 702 567 81 163 116 313 116 502 l0 119 409 0 c323 0 427 3 497 15 444 78 789 419 881 872 17 84 18 254 18 3398 0 2762 -2 3322 -14 3385 -79 432 -381 760 -810 878 l-96 27 -2190 1 c-1204 1 -2217 -2 -2249 -7z m4426 -721 c76 -35 153 -109 192 -183 l31 -60 0 -3315 0 -3315 -28 -58 c-37 -74 -110 -147 -184 -184 l-58 -28 -412 -3 -413 -3 -3 2878 -2 2878 -22 81 c-54 201 -145 357 -292 505 -148 148 -295 233 -501 290 l-85 24 -1439 3 -1438 2 4 118 c3 94 8 127 26 166 47 103 136 183 241 217 53 17 162 18 2191 16 l2135 -2 57 -27z m-1800 -1220 c80 -37 152 -107 191 -187 l32 -66 0 -3305 0 -3305 -27 -57 c-49 -105 -136 -179 -249 -212 -50 -15 -253 -16 -2179 -14 l-2125 3 -57 23 c-76 31 -161 109 -201 186 l-32 61 0 3315 0 3315 28 58 c48 96 140 174 247 208 14 4 990 7 2170 6 l2145 -2 57 -27z"/> </g> </svg>                </div>
            </div>

        </div>

<!--    </div>-->
</template>

<script>

    export default {
        props: ['data', 'editRoute', 'base', 'role'],
        emits: ['del-elem', 'copy'],
        data() {
            return {
            }
        },
        methods: {
            del_page() {
                let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                axios
                    .delete('api/editor?pageId=' + this.data.pageId + '&csrf=' + csrf)
                    .then(res => {
                        if(res.data === true) {
                            this.$emit('del-elem');
                            console.log(res.data)
                        }
                    });
            },
            edit_page() {
                let url = location.protocol + '//' + location.host + '/editor?pageId=' + this.data.pageId;
                console.log(url);
                window.location.href = url;
                // console.log(this.data.pageId);
            },

            setup_page() {
                let url = location.protocol + '//' + location.host + '/setup?pageId=' + this.data.pageId;
                console.log(url);
                window.location.href = url;
            },
            copy_page() {
                let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                axios
                    .post('api/copy?pageId=' + this.data.pageId + '&csrf=' + csrf)
                    .then(res => {
                        if(res.data === true) {
                            console.log(res)
                            this.$emit('copy');
                        }
                    });
            }
        },

    }
</script>

<style scoped>
    .dash_item svg:hover {
        fill: var(--primary);
        cursor: pointer;
    }
    .dash_del svg:hover {
        fill: var(--danger);
        cursor: pointer;
    }
    .d_left {
        display: flex;
        justify-content: left;
        align-items: center;
    }
</style>
