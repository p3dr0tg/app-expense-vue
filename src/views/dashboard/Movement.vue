<template>
    <div class="row">
        <div class="col s12">
            <filter-movement @click="getAll"></filter-movement>
        </div>
        <div class="col s12" :class="{'sk-loading':loading_index}">
            <spinner v-if="loading_index"></spinner>
            <list-view
                :rows="rows"
                @edit="onEdit"
            >
            </list-view>
        </div>
    
        <div class="fixed-action-btn">
            <a  class="btn-floating btn-large waves-effect waves-light light-blue" @click.prevent="add"><i class="material-icons">add</i></a>
        </div>
        <vue-modal ref="dlgMovement" :loading="loading" @close="resetForm">
            <template slot="title">Movimiento {{title}}</template>
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
                        <div class="input-field col s12" :class="{'field_error':errors.saving_account_id}">
                            <material-select v-model="form.saving_account_id">
                                <option v-for="(item,index) in accountList" :value="item.id" :key="index">{{item.description|upper}}</option>
                            </material-select>
                            <label >Cuenta</label>
                            <div v-if="errors.saving_account_id">
                                <div  class="error" style="display: block;">
                                    {{errors.saving_account_id}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{'field_error':errors.month}">
                            <select-month v-model="form.month"></select-month>
                            <label >Mes</label>
                            <div v-if="errors.month">
                                <div  class="error" style="display: block;">
                                    {{errors.month}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{'field_error':errors.date}">
                            <material-date date-format="dd/mm/yyyy" @input="onDate" ref="date"></material-date>
                            <label >Fecha</label>
                            <div v-if="errors.date">
                                <div  class="error" style="display: block;">
                                    {{errors.date}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{'field_error':errors.amount}">
                            <input type="number" v-model="form.amount">
                            <label>Monto</label>
                            <div v-if="errors.amount">
                                <div  class="error" style="display: block;">
                                    {{errors.amount}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12" :class="{'field_error':errors.category_id}">
                            <material-select v-model="form.category_id">
                                <option v-for="(item,index) in filteredCategory" :value="item.id" :key="index">{{item.description|upper}}</option>
                            </material-select>
                            <label >Categoria</label>
                            <div v-if="errors.category_id">
                                <div class="error" style="display: block;">
                                    {{errors.category_id}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <textarea  class="materialize-textarea" v-model="form.description"></textarea>
                            <label >Descripcion</label>
                        </div>
                    </div>
                </form>
            </div>
            <template slot="footer">
                <a href="#" class="modal-close red darken-3 waves-effect waves-light btn-small" @click.prevent="onCancel"><i class="material-icons left">close</i>Cerrar</a>
                <a href="#" class="blue darken-4 waves-effect waves-light btn-small" @click.prevent="onSave" ><i class="material-icons left">save</i>Guardar</a>
            </template>
        </vue-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { SwipeList, SwipeOut } from 'vue-swipe-actions';
    import { mapMutations } from 'vuex'
    import SelectMonth from "../../components/SelectMonth";
    import SelectYear from "../../components/SelectYear";
    import VueModal from "../../components/VueModal";
    import MaterialSelect from "../../components/MaterialSelect";
    import MaterialDate from "../../components/MaterialDate";
    import FilterMovement from "../../components/FilterMovement";
    import MaterialCollection from "../../components/MaterialCollection";
    import Spinner from "../../components/Spinner";
    import ListView from "../../components/ListView";
    const initFromData = {
        id:-1,
        category_id:null,
        saving_account_id:1,
        month:1,
        date:'',
        amount:0,
        description:'',
        user:null,
    };
    export default {
        name: "Movement",
        components: {
            ListView,
            SwipeList,
            SwipeOut,
            Spinner,
            MaterialCollection,
            FilterMovement, MaterialDate, MaterialSelect, VueModal, SelectYear, SelectMonth},
        data(){
            return{
                title:'Nuevo',
                loading:false,
                loading_index:false,
                filterDate:{},
                form: Object.assign({}, initFromData),
                type_category:'Ingresos',
                categoryList:[],
                accountList:[],
                rows:[],
                store:'',
                method:'POST',
                total:0,
                errors:{}
            }
        },
        created(){

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

        },
        methods:{
            
            getAll(date){
                this.loading_index=true;
                Vue.set(this.$data,'filterDate',date);
                this.$http.get('movements',{
                    params:{
                        month:date.month,
                        year:date.year
                    }
                }).then((res)=>{
                    Vue.set(this.$data,'rows',res.data.rows)
                    this.$store.commit('setTotal', res.data.total.amount)
                    
                }).finally(()=>this.loading_index=false)
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
                this.title='Nuevo';
                this.method='POST';
                this.resetForm();
                this.$refs.dlgMovement.open();
            },
            onSave(){
                if(this.isEdit){
                    this.method='PUT'
                }
                this.errors={};
                this.loading=true;
                this.$http({
                    method:this.method,
                    url:'movements',
                    data:this.form
                }).then((res) => {
                    this.$refs.dlgMovement.close();
                    this.alertSuccess('datos guardados');
                    this.getAll(this.filterDate);
                    this.resetForm();
                }).catch((error) => {
                    if(error.response.status==422){
                        this.showValidateRequest(error.response.data);
                    }
                }).finally(()=>{
                    this.loading=false
                })
            },
            onEdit(index){
                this.title='Editar';
                //this.$refs.list.closeActions(index);
                this.resetForm();
                this.loading_index=true;
                this.$http.get('movements/'+this.rows[index].id).then((res) => {
                    let data = res.data;
                    this.setForm(data);
                    this.$refs.dlgMovement.open();
                    setTimeout(()=>{
                        M.updateTextFields();
                    },1)
                }).catch((error) => {

                }).finally(()=>{
                    this.loading_index=false;
                })
            },
            onDestroy(index){
                this.$refs.list.closeActions(index);
                if(confirm('deseas eliminar el registro?')){

                }
            },
            setForm(data){
                this.type_category=data.category.type;
                if(data.amount<0){
                    console.log('negativo');
                    data.amount=data.amount*-1;
                }
                Object.keys(this.form).forEach((key)=>{
                    if(data[key]){
                        this.form[key]=data[key];
                    }
                });
                this.$refs.date.setDate(data.date);

            },
            resetForm(){
                Vue.set(this.$data, 'form', Object.assign({}, initFromData));
                this.$refs.date.clean();
                this.form.month=this.now().getMonth()+1;
            },
            onCancel(){
                this.resetForm();
                this.$refs.dlgMovement.close();
            },
            showValidateRequest(errors){
                const mapErrors={};
                for (let field of Object.keys(errors)) {
                    mapErrors[field]=errors[field][0];
                }
                this.errors=mapErrors;
            }
        }
    }
</script>

<style scoped>


    .btn-small{
        padding-right: 8px;
    }


</style>