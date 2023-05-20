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
            <dash-element v-for="item in pages" :data="item" />
        </div>
    </div>
</template>

<script>


    import DashElement from './DashElement.vue';

    export default {
        components: { DashElement },
        props: ['data'],
        data() {
            return {
                pages: '',
            }
        },
        mounted () {
            // Как-то обрабатываем данные
            this.pages = this.data.data;
            // console.log(this.data.data);
        }
    }
</script>
