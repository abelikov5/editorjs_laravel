<template>

    <div class="file_upload">
        <div class="wrap_input">
            <div class="wrap_stat">
                <stat-element type="Директ" :qnt="direct"   />
                <stat-element type="Лиды"   :qnt="lead"     />
                <stat-element type="Заказы" :qnt="sale"     />
            </div>
        </div>

        <button @click="downloadReport()" class="btn-primary">Сформировать отчет</button>
    </div>
</template>

<style scoped>
.file_upload {
    width: 300px;
}
.btn-clean {
    background-color: #efe17e;
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
    align-items: center;
    overflow: hidden;
}

h2 {
    height: 40px;
}
</style>

<script>
import StatElement from './StatElement.vue';

export default {
    props: ['type', 'direct', 'lead', 'sale'],
    components: {StatElement},
    emits: ["saleEvent", 'leadEvent', 'directEvent'],


    data() {
        return {
            file: '',
            signature: "Выберите файл для загрузки",

        }
    },
    methods: {
        downloadReport() {
            axios.get('/api/download')
            .then(res => {
                // this.signature = 'Успешно загружено и обработано ' + res.data.length + ' строк!'
                window.open(res.data, '_blank');
                console.log('SUCCESS!!', res.data)
            })
             .catch(res => {
                 // this.signature = 'Error! Ошибка парсинга файла';
                 console.log('FAILURE!! ', res)
             });
        },


    },

    mounted() {

    }
}
</script>
