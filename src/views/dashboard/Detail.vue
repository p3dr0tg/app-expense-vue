<template>
    <vue-modal ref="dlgDetail" :loading="loading">
        <template slot="title">{{title}}</template>
        <div class="row">
            <div class="col s12">
                <list-view
                   :rows="rows"
                   :disabled="true"
                   :show-category="showCategory"
                   :show-date="showDate"
                >
                </list-view>
            </div>
        </div>
        <template slot="footer">
            <a href="#" class="modal-close red darken-3 waves-effect waves-light btn-small" @click.prevent="close"><i class="material-icons left">close</i>Cerrar</a>
        </template>
    </vue-modal>
</template>

<script>
    import VueModal from "../../components/VueModal";
    import Vue from "vue";
    import ListView from "../../components/ListView";
    export default {
        name: "Detail",
        components: {ListView, VueModal},
        props:['title','showCategory','showDate'],
        data(){
            return{
                loading:false,
                rows:[]
            }
        },
        methods:{
            close(){
                this.$refs.dlgDetail.close();
            },
            fetch(month,year,filters){
                console.log('month',month);
                console.log('year',year);
                this.loading=true;
                this.$http.get('movements',{
                    params:{
                        month:month,
                        year:year,
                        filters:filters
                    }
                }).then((res)=>{
                    Vue.set(this.$data,'rows',res.data.rows);
                    this.$refs.dlgDetail.open();
                    //this.$store.commit('setTotal', res.data.total.amount)
                }).finally(()=>this.loading=false)
            }
        }
    }
</script>

<style scoped>

</style>