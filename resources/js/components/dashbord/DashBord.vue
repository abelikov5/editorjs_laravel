<template>
    <div class="dash_container">

        <FileUpload type="direct" @saleEvent="saleEvent" @leadEvent="leadEvent" @directEvent="directEvent"/>

        <Statistica type="direct" :direct="count_direct" :lead="count_lead" :sale="count_sale" />

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
    import Statistica from "@/components/dashbord/Statistica.vue";

    export default {
        components: {Statistica, FileUpload },
        props: ['direct', 'sale', 'lead', 'role'],
        emits: ['del-elem', 'copy'],

        data() {
            return {
                pages: '',
                count_direct: this.direct,
                count_sale: this.sale,
                count_lead: this.lead,
            }
        },
        methods: {
            saleEvent(el) {
                this.count_sale = el;
            },
            directEvent(el) {
                this.count_direct = el;
            },
            leadEvent(el) {
                this.count_lead = el;
            }

        },
        mounted () {

        }
    }
</script>
