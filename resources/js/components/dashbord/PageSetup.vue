<template>
    <div class="dash_container">
        <div class="dash_head d_flex">
            <div> <b>pageId: </b>{{this.pageId + ' ' + this.role }} </div>
        </div>
        <div class="setup_body">
            <div class="el_setup d_flex">
                <div class="el_head d_flex d_left">
                    <div>
                        Title:
                    </div>
                </div>
                <div class="el_input d_flex d_left">
                    <input type="text" v-model="name">
                </div>

            </div>
            <div class="el_setup d_flex">
                <div class="el_head d_flex d_left">
                    <div>
                        Description:
                    </div>
                </div>
                <div class="el_input d_flex d_left">
                    <input type="text" v-model="description">
                </div>

            </div>
            <div class="el_setup d_flex">
                <div class="el_head d_flex d_left">
                    <div>
                        URL страницы:
                    </div>
                </div>
                <div class="el_input d_flex d_left">
                    <div class="base_url">{{this.base}} </div><input type="text" v-model="url">
                </div>

            </div>

            <div class="el_setup d_flex">
                <div class="el_head d_flex d_left">
                    <div>
                        Статус:
                    </div>
                </div>
                <div class="el_input d_flex d_left" @click="change_status" v-if="this.role === 'admin'">
                    <div class="page_active d_flex" v-if="this.active">
                        <div class="green_ring c_pointer"></div> <div class="el_status">активирована</div>
                    </div>
                    <div class="page_disable d_flex d_center" v-else>
                        <div class="red_ring c_pointer"> </div> <div class="el_status">черновик</div>
                    </div>
                </div>
                <div v-else class="el_input d_flex d_left">
                    <div class="page_active d_flex" v-if="this.active">
                        <div class="green_ring c_pointer"></div> <div class="el_status">активирована</div>
                    </div>
                    <div class="d_flex d_center" v-else>
                        <button class="btn-primary" @click="moderation">
                            <div v-if="mail_send">Отправлено</div>
                            <div v-else>Отправить на модерацию</div>
                        </button>
                    </div>

                </div>

            </div>

        </div>
        <div class="setup_safe">
            <button class="btn-primary" @click="safe_data">Сохранить и выйти</button>
        </div>


    </div>
</template>

<style scoped>
.base_url {
    width: 200px;
    color: var(--70);
}
.setup_safe {
    display: flex;
    justify-content: right;
    padding: 50px;
}
.el_status {
    margin-left: 20px;
    cursor: pointer;
}

.el_head {
    width: 30%;
}
.el_input {
    width: 70%;
}
.el_setup {
    height: 50px;
    padding: 50px;
    border-bottom: 1px solid var(--40);


}
.el_setup input {
    width: 100%;
    height: 40px;
    border: 1px solid var(--70);
    border-radius: 10px;
    padding: 0 20px;

}
.el_setup input:hover, .el_setup input:active
{
    background-color: var(--white);
    border-radius: 0.5rem;
    outline: 0;
    -webkit-box-shadow: 0 0 0 3px var(--primary-50);
    box-shadow: 0 0 0 3px var(--primary-50);
}
:focus-visible {
     outline: unset!important;
}



</style>

<script>
    export default {

        props: ['data', 'base', 'role'],


        data() {
            return {
                url: '',
                name: '',
                active: false,
                pageId: '',
                mail_send: false,
                description: ''
            }
        },
        methods: {
            delElem(id){
                this.pages = this.pages.filter(item => item.id !== id);
            },
            change_status() {
                this.active = !this.active
            },
            safe_data() {
                let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                let active =  this.active ? 1 : 0;
                this.url = this.url ? this.url.trim() : '';
                axios
                    .post('api/page_setup?pageId=' + this.pageId + '&csrf=' + csrf + '&active=' + active
                        + '&header=' + this.name + '&slack=' + this.url + "&description=" + this.description)
                    .then(res => {
                        if(res.data === true) {
                            console.log('res ', res)
                            window.location.href = location.protocol + '//' + location.host + '/dashboard';
                        }
                    });
            },
            moderation() {
                axios
                    .post('api/mail')
                    .then(res => {
                        // console.log(res)
                        if(res.data === true) {
                            this.mail_send = true;
                            console.log('res ', res)
                        }
                    });

            }



        },
        mounted () {
            this.url            = this.data[0].slack;
            this.name           = this.data[0].header;
            this.active         = this.data[0].active;
            this.pageId         = this.data[0].pageId;
            this.description    = this.data[0].description;
        }
    }
</script>
