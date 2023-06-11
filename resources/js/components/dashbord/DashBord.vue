<template>
    <div class="dash_container">
        <div class="dash_head d_flex">
            <div class="dash_id">id</div>
            <div class="dash_created">Дата обновления</div>
            <div class="dash_slug">Заголовок, Slug</div>
            <div class="dash_status">Статус</div>
            <div class="dash_edit"></div>
        </div>

        <div class="dash_body" >
            <DashElement v-for="item in pages" :data="item" @del-elem="delElem(item.id)"
                         @copy="copy(item.id)" :base="this.base" :role="this.role"/>
        </div>
    </div>
</template>

<script>


    import DashElement from './DashElement.vue';

    export default {
        components: { DashElement },
        props: ['data', 'base', 'role'],
        emits: ['del-elem', 'copy'],

        data() {
            return {
                pages: '',
            }
        },
        methods: {
            delElem(id){
                this.pages = this.pages.filter(item => item.id !== id);
            },
            copy(id){
                location.reload();
            },
        },
        mounted () {
            this.pages = this.data.data;
        }
    }
</script>
