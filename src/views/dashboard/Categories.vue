<template>
    <div class="row">
        <div class="col s12">
            <filter-movement @click="getAll"></filter-movement>
        </div>
        <div class="col s12" :class="{'sk-loading':loading_index}">
            <spinner v-if="loading_index"></spinner>
            <vue-gauge ref="gauge" v-show="rows.length"></vue-gauge>
            <material-collection>
                <li class="card-content collection-item avatar selectable" v-for="(item,index) in rows" @click.prevent="onDetail(index)">
                    <span class="title left">{{item.category}}</span>
                    <a href="#!" class="secondary-content" :class="classItem[index]">{{item.amount|numberFormat}}</a>
                </li>
            </material-collection>
        </div>
        <detail
            ref="detail"
            :title="title"
            :show-category="false"
            :show-date="true"
        ></detail>
    </div>
</template>

<script>
    import Vue from "vue";
    import FilterMovement from "../../components/FilterMovement";
    import Spinner from "../../components/Spinner";
    import MaterialCollection from "../../components/MaterialCollection";
    import VueGauge from "../../components/VueGauge";
    import Detail from "./Detail";

    export default {
        name: "Categories",
        components: {Detail, VueGauge, MaterialCollection, Spinner, FilterMovement},
        data(){
          return{
              loading_index:false,
              filterDate:{},
              rows:[],
              title:''
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
                    let data=res.data;
                    let rows=data.rows;
                    rows.unshift({
                        category_id:0,
                        amount:data.previous_balance.amount,
                        category:'Saldo Anterior',
                        type:"Ingresos"
                    });
                    Vue.set(this.$data,'rows',rows)
                    this.setGauge(data.totals)
                    //this.$store.commit('setTotal', res.data.total.amount)

                }).finally(()=>this.loading_index=false)
            },
            setGauge(data){
                let total=Number(data.income);//+Number(data.expenses*-1)
                let percentage=0;
                if(data.income==0){
                    return 0;
                }
                percentage=(Number(data.expenses*-1))/total;
                percentage=percentage.toFixed(4);
                console.log(percentage);
                this.$refs.gauge.setValue(percentage,data.income,data.expenses,data.balance);
            },
            onDetail(index){
                console.log('click detalle',index);
                const record=this.rows[index];
                this.title=record.category;
                const filters='category_id:'+record.category_id;
                //this.$refs.detail.setTitle(record.category);
                this.$refs.detail.fetch(this.filterDate.month,this.filterDate.year,filters);
            }
        }
    }
</script>

<style scoped>
.content-collection{
    height: 46vh;
}
</style>