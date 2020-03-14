<template>
    <material-select v-model="value">
        <option v-for="(item,index) in items" :value="index+1" :key="index">{{item}}</option>
    </material-select>
</template>

<script>
    import MaterialSelect from "./MaterialSelect";
    export default {
        name: "SelectMonth",
        props: ['value'],
        components: {MaterialSelect},
        data() {
            return {
                item:'1',
                items: ["ENERO", "FEBREBRO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
            }
        },
        mounted() {
            let vm = this;
            let select = this.$el;

            select.value=this.value;
            select.onchange =function () {

                vm.$emit('input', this.value);
            };
        },
        watch: {
            value(value) {
                this.relaod(value);
            }
        },
        methods:{
            relaod(value){
                let select = this.$el;
                select.value=value || this.value;
            }
        },
        updated: function () {

            this.relaod();
        },
    }
</script>

<style scoped>

</style>