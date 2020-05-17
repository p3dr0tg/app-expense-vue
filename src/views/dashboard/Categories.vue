<template>
    <div class="row">
        <div class="col s12">
            <filter-movement @click="getAll"></filter-movement>
        </div>
        <div class="col s12" :class="{'sk-loading':loading_index}">
            <spinner v-if="loading_index"></spinner>
            <vue-gauge ref="gauge" v-show="rows.length"></vue-gauge>
            <material-collection>
                <li class="card-content collection-item avatar selectable" v-for="(item,index) in rows">
                    <span class="title left">{{item.category}}</span>
                    <a href="#!" class="secondary-content" :class="classItem[index]">{{item.amount|numberFormat}}</a>
                </li>
            </material-collection>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import FilterMovement from "../../components/FilterMovement";
    import Spinner from "../../components/Spinner";
    import MaterialCollection from "../../components/MaterialCollection";
    import VueGauge from "../../components/VueGauge";

    export default {
        name: "Categories",
        components: {VueGauge, MaterialCollection, Spinner, FilterMovement},
        data(){
          return{
              loading_index:false,
              filterDate:{},
              rows:[]
          }
        },
        mounted(){
            this.getAll({
                month:this.now().getMonth()+1,
                year:this.now().getFullYear()
            });
        },
        computed:{
            classItem(){
                return this.rows.map((item)=>{
                    let amount=Number(item.amount)
                    let className='green-text';
                    if(amount<0){
                        className='red-text'
                    }
                    return className;
                })
            }
        },
        methods:{
            getAll(date){
                this.loading_index=true;
                Vue.set(this.$data,'filterDate',date);
                this.$http.get('movements/categories',{
                    params:{
                        month:date.month,
                        year:date.year
                    }
                }).then((res)=>{
                    Vue.set(this.$data,'rows',res.data.rows)
                    this.setGauge(res.data.totals)
                    //this.$store.commit('setTotal', res.data.total.amount)

                }).finally(()=>this.loading_index=false)
            },
            setGauge(data){
                let total=Number(data.income)+Number(data.expenses*-1)
                let percentage=0;
                if(data.income==0){
                    return 0;
                }
                percentage=(Number(data.expenses*-1))/total;
                percentage=percentage.toFixed(4);
                this.$refs.gauge.setValue(percentage,data.income,data.expenses,data.balance);
            }
        }
    }
</script>

<style scoped>
.content-collection{
    height: 46vh;
}
</style>