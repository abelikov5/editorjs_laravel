<template>

    <div class="file_upload">
        <div class="wrap_input">
            <div class="wrap_stat">
                <div><b>Директ:</b> {{direct}} строк</div>
                <div><b>Лиды:</b> {{ lead }} строк</div>
                <div><b>Заказы:</b> {{ sale }} строк</div>
            </div>
        </div>

        <button @click="downloadReport()" class="btn-primary">Сформировать отчет</button>
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
.wrap_stat {
    text-align: left;
    padding: 0 20px;
}
.wrap_input {
    height: 200px;
    width: 100%;
    border: 1px solid var(--primary);
    border-radius: 0.5rem;
    display: flex;
    //justify-content: center;
    align-items: center;
    overflow: hidden;
}

h2 {
    height: 40px;
}
</style>

<script>

export default {
    props: ['type', 'direct', 'lead', 'sale'],
    components: {},


    data() {
        return {
            file: '',
            signature: "Выберите файл для загрузки",

        }
    },
    methods: {

        downloadReport() {
            console.log('download')

            axios.get('/api/download')
            .then(res => {
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
