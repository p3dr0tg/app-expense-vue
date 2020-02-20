<template>
    <div>
        <h2>Categorias</h2>
        <div class="row">
            <div class="col s12">
                <div class="responsive-table">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Descripcion</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,index) in rows" :key="index">
                                <td>{{row.description}}</td>
                                <td>{{row.type}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large waves-effect waves-light red" @click.prevent="add"><i class="material-icons">add</i></a>
        </div>
        <vue-modal ref="dlgCategory">
            <template slot="title">Categoria</template>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">comment</i>
                            <input id="icon_prefix" type="text" class="validate" v-model="form.description">
                            <label for="icon_prefix">Descripcion</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix" style="margin-left: 3rem;left: -1em;">class</i>
                            <material-select v-model="form.type">
                                <option value="Ingresos">Ingresos</option>
                                <option value="Egresos">Egresos</option>
                            </material-select>
                            <label for="icon_prefix">Tipo</label>
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
    import VueModal from "../components/VueModal";
    import MaterialSelect from "../components/MaterialSelect";
    export default {
        name: "Category",
        components: {MaterialSelect, VueModal},
        data(){
            return{
                form:{
                    description:'',
                    type:'Ingresos'
                },
                isEdit:false,
                method:'POST',
                db:null,
                rows:[],
                store:'',
            }
        },
        created(){
            //this.db=firebase.database();
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
                /*this.db.ref('/categories')
                    .on('value',(snapshot)=>{
                        console.log('snapshot',snapshot)
                        Vue.set(this.$data,'rows',snapshot.val())
                    })*/
            },
            add(){
                this.form.description='';
                this.isEdit=false;
                this.method='POST'
                this.$refs.dlgCategory.open();
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
                    this.$refs.dlgCategory.close();
                    this.alertSuccess('datos guardados');
                    this.getAll();
                }).catch((error) => {
                    console.log(error);
                }).finally(()=>{
                })
                /*this.db.ref('categories').push(this.form).then(()=>{
                    this.alertSuccess('Guardado Correctamente');
                    this.$refs.dlgCategory.close();
                }).catch((error)=>{
                    console.log(error);
                })*/

            }
        }
    }
</script>

<style scoped>

</style>