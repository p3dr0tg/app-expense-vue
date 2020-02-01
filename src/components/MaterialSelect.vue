<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    export default {
        name: "MaterialSelect",
        props: ['value'],
        data(){
            return{

            }
        },
        mounted(){

            let vm = this;
            let select = this.$el;

            select.value=this.value;
            select.onchange =function () {
                    vm.$emit('input', this.value);
            };

            //select.formSelect();
            M.FormSelect.init(this.$el);
        },
        watch:{
            value(value) {
                this.relaod(value);
            }
        },
        methods:{
            relaod(value){
                const instance = M.FormSelect.getInstance(this.$el);
                let select = this.$el;
                select.value=value || this.value;
                //select.formSelect('destroy');
                //select.formSelect();
                instance.destroy();
                M.FormSelect.init(this.$el);
            }
        },
        updated: function () {

            this.relaod();
        },
        destroyed: function () {
            const instance = M.FormSelect.getInstance(this.$el);
            instance.destroy();
        }
    }
</script>

<style scoped>

</style>