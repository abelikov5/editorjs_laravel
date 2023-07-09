<template>
    <div class="dash_container">
        <FileUpload title="Директ" type="direct"/>

        <FileUpload title="Лиды" type="lead"/>
    </div>
</template>

<style scoped>
    .dash_container {
        display: flex;
        justify-content: space-around;
    }
</style>

<script>


    import FileUpload from './FileUpload.vue';

    export default {
        components: { FileUpload },
        props: ['data', 'base', 'role'],
        emits: ['del-elem', 'copy'],

        data() {
            return {
                pages: '',
            }
        },
        methods: {

        },
        mounted () {

        }
    }
</script>
