<template>
    <div class="row">
        <div class="col s12">
            <filter-movement @click="getData"></filter-movement>
        </div>
        <div class="col s12" :class="{'sk-loading':loading}">
            <spinner v-if="loading"></spinner>
            <material-collection>
                <li class="collection-item avatar item-summary selectable" v-for="(row,index) in rows" :key="index" @click.prevent="onDetail(index)">
                    <span class="title left">{{row.date|dateFormat}}</span>
                    <div class="left collection-progress">
                        <div class="progress-bar progress-bar-success" role="progressbar"  :style="{ width: progress[index] + '%' }"></div>
                    </div>
                    <div style="clear: both;margin-bottom: -.5em;text-align: center">
                        <label class="income">{{row.income|numberFormat}}</label>
                        <label class="expenses">{{row.expenses|numberFormat}}</label>
                    </div>
                </li>
            </material-collection>
        </div>
        <detail
            ref="detail"
            :title="title"
            :show-category="true"
            :show-date="false"
        >

        </detail>
       

    </div>
</template>

<script>
    import Vue from 'vue';
    import FilterMovement from "../../components/FilterMovement";
    import MaterialCollection from "../../components/MaterialCollection";
    import Spinner from "../../components/Spinner";
    import Detail from "./Detail";
    export default {
        name: "Summaries",
        components: {Detail, Spinner, MaterialCollection, FilterMovement},
        data(){
            return{
                rows:[],
                total:0,
                loading:false,
                title:'',
                filterDate:{}
            }
        },
        mounted(){
            this.getData({
                month:this.now().getMonth()+1,
                year:this.now().getFullYear()
            });
        },
        computed:{
            progress(){
                return this.rows.map((item)=>{
                    let total=Number(item.income)+Number(item.expenses*-1)
                    let percentage=0;
                    if(item.income==0){
                        return 0;
                    }
                    percentage=(Number(item.income)*100)/total;
                    return Number(percentage).toFixed(2);
                })
            }
        },
        methods:{
            getData(date){
                Vue.set(this.$data,'filterDate',date);
                this.loading=true;
                this.$http.get('movements/summary',{
                    params:{
                        month:date.month,
                        year:date.year
                    }
                }).then((res)=>{
                    Vue.set(this.$data,'rows',res.data.rows);
                    this.$store.commit('setTotal', res.data.total.amount)
                }).finally(()=>{
                    this.loading=false;
                })
            },
            onDetail(index){
                console.log('click detalle',index);
                const record=this.rows[index];
                this.title='Fecha: '+record.date.split('-').reverse().join('/');
                const filters='date:'+record.date;
                this.$refs.detail.fetch(this.filterDate.month,this.filterDate.year,filters);
            }
        }
    }
</script>

<style scoped>
    .item-summary{
        min-height: 40px !important;
        padding: 5px 20px;
    }

    .collection-progress{
        border-radius: 0;
        box-shadow: none;
        background: #f44336;
        height: 20px;
    }
    .collection-progress{
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color:#f44336;
        border-radius: .25rem;
    }
    .collection-progress .progress-bar {
        vertical-align: middle;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 1.2rem;
        -ms-flex-align: center;
        align-items: center;
    }
    .collection-progress .progress-bar.progress-bar-success {
        background-color: #4caf50;
    }
    .progress-bar {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: center;
        justify-content: center;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #007bff;
        transition: width .6s ease;
    }


</style>