<template>
    <div class="dash_container">
        <div class="dash_head d_flex">
            <div class="dash_id">id</div>
            <div class="dash_created">Дата создания</div>
            <div class="dash_slug">Заголовок, Slug</div>
            <div class="dash_status">Статус</div>
            <div class="dash_edit"></div>
        </div>

        <div class="dash_body" >
            <DashElement v-for="item in pages" :data="item" @del-elem="delElem(item.id)" />
        </div>
    </div>
</template>

<script>


    import DashElement from './DashElement.vue';

    export default {
        components: { DashElement },
        props: ['data'],
        emits: ['del-elem'],

        data() {
            return {
                pages: '',
            }
        },
        methods: {
            delElem(id){
                this.pages = this.pages.filter(item => item.id !== id);
            },
        },
        mounted () {
            this.pages = this.data.data;
        }
    }
</script>
