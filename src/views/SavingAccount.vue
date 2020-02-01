<template>
    <div>
        <h2>Cuentas</h2>
        <div class="row">
            <div class="col s12">
                <div class="responsive-table">
                    <table class="striped">
                        <thead>
                        <tr>
                            <th>Descripcion</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row,index) in rows" :key="index">
                            <td>{{row.description}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large waves-effect waves-light red" @click.prevent="add"><i class="material-icons">add</i></a>
        </div>
        <vue-modal ref="dlgAccount">
            <template slot="title">Cuenta</template>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">comment</i>
                            <input id="icon_prefix" type="text" class="validate" v-model="form.description">
                            <label for="icon_prefix">Descripcion</label>
                        </div>
                    </div>
                </form>
            </div>
            <template slot="footer">
                <a href="#" class="modal-close red darken-3 waves-effect waves-light btn-small"><i class="material-icons left">close</i>Cerrar</a>
                <a href="#" class="blue darken-4 waves-effect waves-light btn-small" @click.prevent="onSave" ><i class="material-icons left">save</i>Guardar</a>
            </template>
        </vue-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    //import firebase from 'firebase'
    import VueModal from "../components/VueModal";
    export default {
        name: "SavingAccount",
        components: {VueModal},
        data(){
            return{
                form:{
                    description:'',
                },
                isEdit:false,
                db:null,
                rows:[],
                store:'',
                method:'POST',
            }
        },
        created(){
            this.store = this.$route.name;
            this.getAll();
        },
        mounted() {

        },
        methods:{
            getAll(){
                this.$http.get(this.store).then((res)=>{
                    Vue.set(this.$data,'rows',res.data)
                })
            },
            add(){
                this.form.description='';
                this.isEdit=false;
                this.method='POST'
                this.$refs.dlgAccount.open();
            },
            onSave(){

                if(this.isEdit){
                    this.method='PUT'
                }
                this.$http({
                    method:this.method,
                    url:this.store,
                    data:this.form
                }).then((res) => {
                    this.$refs.dlgAccount.close();
                    this.alertSuccess('datos guardados');
                    this.getAll();
                }).catch((error) => {
                    console.log(error);
                }).finally(()=>{
                })

            }
        }
    }
</script>

<style scoped>

</style>