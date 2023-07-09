<template>

    <div class="file_upload">
        <h2>{{ title }}</h2>

        <div class="wrap_input">
            <div  @click="fileChoose('file_' + type)">
                {{signature}}
            </div>
            <input type="file" :id="'file_' + type" ref="file" @change="handleFileUpload()" accept=".csv"/>
        </div>


        <button @click="submitFiles()" class="btn-primary">Submit</button>
    </div>
</template>

<style scoped>
.file_upload {
    width: 200px;
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
    height: 100px;
    width: 100%;
    cursor: pointer;
    border: 1px solid var(--primary);
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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

// import FileUpload from './FileUpload.vue';

export default {
    props: ['title', 'type'],
    components: {},


    data() {
        return {
            file: '',
            signature: "Выберите файл для загрузки",

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

            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('type', this.type);

            console.log(formData, this.file.name)

            axios.post('/api/uploadFile',
                formData,{headers: {'Content-Type': 'multipart/form-data'}}
            ).then(res => {
                this.signature = 'Успешно загружено и обработано ' + res.data.length + ' строк!'
                console.log('SUCCESS!!', res)
            })
             .catch(res => {
                 this.signature = 'Error! Ошибка парсинга файла';
                 console.log('FAILURE!! ', res)
             });
        },


    },
    mounted() {

    }
}
</script>
