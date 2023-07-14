<template>

    <div class="file_upload">

        <div class="wrap_input" @click="fileChoose('file_' + type)" :class="{ 'wrap_upload' : upload }">
            <div v-html="signature">

            </div>
            <input type="file" :id="'file_' + type" ref="file" @change="handleFileUpload()" accept=".csv"/>
        </div>

        <button @click="submitFiles()" class="btn-primary" :disabled="upload">Загрузить</button>
    </div>
</template>

<style scoped>
.file_upload {
    width: 300px;
}
.btn-primary {
    width: 100%;
    margin-top: 10px;
}
.wrap_input input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
}
.wrap_input {
    height: 200px;
    width: 100%;
    cursor: pointer;
    border: 1px solid var(--primary);
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.btn-primary:disabled {
    background: #ddd;
    box-shadow: unset;
    border: 1px solid var(--bs-gray-400);
}
.wrap_upload {
    border: 1px solid var(--bs-gray-400);
}

.wrap_input div {
    text-align: center;
    width: 100%;
    z-index: 1;
    cursor: pointer;
    padding: 0 5px;
}

h2 {
    height: 40px;
}
</style>

<script>

export default {
    props: ['title', 'type'],
    components: {},
    emits: ["saleEvent", 'leadEvent', 'directEvent'],

    data() {
        return {
            file: '',
            signature: "Выберите файл для загрузки",
            upload: false,

        }
    },
    methods: {

        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.signature = 'Для загрузки выбран: ' + this.file.name;
        },
        fileChoose(e) {
            document.getElementById(e).click();
        },
        submitFiles() {

            if(!this.file) {
                this.signature = "Выберите файл для загрузки";
                return;
            }

            let formData = new FormData();
            formData.append('file', this.file);
            this.upload = true;

            axios.post('/api/uploadFile',
                formData,{headers: {'Content-Type': 'multipart/form-data'}}
            ).then(res => {
                this.upload = false;
                if(res.data[2] === true) {
                    this.signature = 'В таблицу <b>' + res.data[0] + '</b> успешно загружено и обработано <b>' + res.data[1].length + '</b> строк!'
                    let type = res.data[0];
                    if(type === 'direct') {
                        this.$emit("directEvent", res.data[3]);
                    }
                    if(type === 'sale') {
                        this.$emit("saleEvent", res.data[3]);
                    }
                    if(type === 'lead') {
                        this.$emit("leadEvent", res.data[3]);
                    }
                    this.file = '';

                }
            })
             .catch(res => {
                 this.signature = 'Error! Ошибка парсинга файла';
                 console.log('FAILURE!! ', res)
                 this.file = '';
             });
        },


    },
    mounted() {

    }
}
</script>
