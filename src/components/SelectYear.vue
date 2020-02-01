<template>
    <material-select v-model="value">
        <option v-for="(year,index) in years" :value="year" :key="index">{{year}}</option>
    </material-select>
</template>

<script>
    import MaterialSelect from "./MaterialSelect";
    export default {
        name: "SelectYear",
        props: ['value'],
        components: {MaterialSelect},
        computed:{
            years(){
                const date=new Date();
                let year=date.getFullYear();
                let years=[];
                for (var i = year - 5; i <= year; i++){
                    years.push(i);
                }
                return years;
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