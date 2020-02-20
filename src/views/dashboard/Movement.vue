<template>
    <div class="row">
        <div class="col s12">
            <filter-movement @click="getAll"></filter-movement>
        </div>
        <div class="col s12">
            <material-collection>
                <li class="collection-item avatar" v-for="(row,index) in rows" :key="index">
                    <span class="title left">{{row.categories.description}}</span>
                    <p class="left" style="clear: both"><b>{{row.date|dateFormat}}</b> {{row.description}}</p>
                    <a href="#!" class="secondary-content" :class="classItem[index]">{{row.amount|numberFormat}}</a>
                </li>
            </material-collection>
        </div>
    
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large waves-effect waves-light red" @click.prevent="add"><i class="material-icons">add</i></a>
        </div>
        <vue-modal ref="dlgMovement" :loading="loading">
            <template slot="title">Movimiento</template>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s4">
                            <label>
                                <input  type="radio" checked value="Ingresos" v-model="type_category"/>
                                <span>Ingresos</span>
                            </label>
                        </div>
                        <div class="input-field col s4">
                            <label>
                                <input  type="radio" value="Egresos" v-model="type_category"/>
                                <span>Egresos</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <material-select v-model="form.saving_account_id">
                                <option v-for="(item,index) in accountList" :value="item.id" :key="index">{{item.description|upper}}</option>
                            </material-select>
                            <label >Cuenta</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <select-month v-model="form.month"></select-month>
                            <label >Mes</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <material-date date-format="dd/mm/yyyy" @input="onDate"></material-date>
                            <label >Fecha</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="number" v-model="form.amount">
                            <label>Monto</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <material-select v-model="form.category_id">
                                <option v-for="(item,index) in filteredCategory" :value="item.id" :key="index">{{item.description|upper}}</option>
                            </material-select>
                            <label >Categoria</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea" v-model="form.description"></textarea>
                            <label for="textarea1">Descripcion</label>
                        </div>
                    </div>
                </form>
            </div>
            <template slot="footer">
                <a href="#" class="modal-close red darken-3 waves-effect waves-light btn-small" @click.prevent="resetForm"><i class="material-icons left">close</i>Cerrar</a>
                <a href="#" class="blue darken-4 waves-effect waves-light btn-small" @click.prevent="onSave" ><i class="material-icons left">save</i>Guardar</a>
            </template>
        </vue-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapMutations } from 'vuex'
    import SelectMonth from "../../components/SelectMonth";
    import SelectYear from "../../components/SelectYear";
    import VueModal from "../../components/VueModal";
    import MaterialSelect from "../../components/MaterialSelect";
    import MaterialDate from "../../components/MaterialDate";
    import FilterMovement from "../../components/FilterMovement";
    import MaterialCollection from "../../components/MaterialCollection";
    export default {
        name: "Movement",
        components: {
            MaterialCollection,
            FilterMovement, MaterialDate, MaterialSelect, VueModal, SelectYear, SelectMonth},
        data(){
            return{
                loading:false,
                form:{
                    category_id:null,
                    saving_account_id:null,
                    month:1,
                    date:'',
                    amount:0,
                    description:'',
                    user:null,
                },
                type_category:'Ingresos',
                categoryList:[],
                accountList:[],
                rows:[],
                store:'',
                method:'POST',
                total:0,
            }
        },
        created(){
            this.form.month=this.now().getMonth()+1;
            this.store = this.$route.name;
            this.getCategories();
            this.getAccounts();
        },
        mounted(){
            this.getAll({
                month:this.now().getMonth()+1,
                year:this.now().getFullYear()
            });
        },
        computed:{
            filteredCategory(){
               return this.categoryList.filter((item)=>{
                   return item.type===this.type_category
               })
            },
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

                this.$http.get('movements',{
                    params:{
                        month:date.month,
                        year:date.year
                    }
                }).then((res)=>{
                    Vue.set(this.$data,'rows',res.data.rows)
                    this.$store.commit('setTotal', res.data.total.amount)
                    
                })
            },
            getCategories(){
                this.$http.get('categories').then((res)=>{
                    Vue.set(this.$data,'categoryList',res.data)
                })
            },
            getAccounts(){
                this.$http.get('saving_accounts').then((res)=>{
                    Vue.set(this.$data,'accountList',res.data)
                    if(res.data.length){
                        this.form.saving_account_id=res.data[0].id
                    }
                })
            },
            onDate(e){

                Vue.set(this.form, 'date', e.target.value)
            },
            add(){
                this.method='POST';
                this.$refs.dlgMovement.open();
            },
            onSave(){
                if(this.isEdit){
                    this.method='PUT'
                }
                this.loading=true;
                this.$http({
                    method:this.method,
                    url:'movements',
                    data:this.form
                }).then((res) => {
                    this.$refs.dlgMovement.close();
                    this.alertSuccess('datos guardados');
                    this.getAll();
                    this.resetForm();
                }).catch((error) => {
                    console.log(error);
                }).finally(()=>{
                    this.loading=false
                })
            },
            resetForm(){
                this.form.amount=0;
                this.form.description='';
            }
        }
    }
</script>

<style scoped>



    .btn-small{
        padding-right: 8px;
    }

</style>