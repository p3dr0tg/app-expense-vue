<template>
    <div class="row">
        <div class="input-field col s5">
            <select-month v-model="month"></select-month>
        </div>
        <div class="input-field col s5">
            <select-year v-model="year"></select-year>
        </div>
        <div class="input-field col s2" style="margin-top: 1.5em;">
            <button  class="waves-effect waves-light btn btn-small" @click.prevent="onClick"><i class="material-icons left">find_in_page</i></button>
        </div>
    </div>
</template>

<script>
    import SelectMonth from "./SelectMonth";
    import SelectYear from "./SelectYear";
    export default {
        name: "FilterMovement",
        components: {SelectYear, SelectMonth},
        data(){
            return{
                month:1,
                year:1,
            }
        },
        created(){
            const date=new Date();
            this.month=date.getMonth()+1;
            this.year=date.getFullYear();
        },
        methods:{
            onClick(){
                this.$emit('click',this.$data)
            }
        }
    }
</script>

<style scoped>

</style>