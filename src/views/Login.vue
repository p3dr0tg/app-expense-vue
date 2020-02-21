<template>
    <div>
        <h3 v-if="isLogin">Ingreso Al sistema&nbsp;<button style="float: right" class="btn blue darken-3" title="Agregar Usuario" @click.prevent="newUser"><i class="material-icons">person_add</i></button></h3>
        <h3 v-else>Registro Usuario</h3>

        <form class="col s12" :class="{'sk-loading':loading}">
            <spinner v-if="loading"></spinner>
            <div class="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">contact_mail</i>
                    <input id="icon_mail" type="text" class="validate" v-model="form.email">
                    <label for="icon_mail">Correo</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <input id="icon_prefix" type="password" class="validate" v-model="form.password">
                    <label for="icon_prefix">Contraseña</label>
                </div>
            </div>

        </form>
        <div class="row center">
            <a class="waves-effect waves-light btn" @click.prevent="onLogin" v-if="isLogin">Ingresar</a>
            <a class="waves-effect waves-light btn" @click.prevent="onsignUp" v-if="!isLogin">Registar</a>
        </div>
    </div>
</template>

<script>
    //import firebase from 'firebase'
    import {mapState, mapMutations} from 'vuex';
    import Spinner from "../components/Spinner";
    export default {
        name: "Login",
        components: {Spinner},
        data(){
            return{
                form:{},
                isLogin:true,
                loading:false
            }
        },
        methods:{
            onLogin(){
                /*firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
                    (user) => {
                        this.$router.replace('dashboard')
                    },
                    (err) => {
                        this.alertWarning('Oops. ' + err.message)
                    }
                );*/
                this.loading=true;
                this.$http.post('login',this.form).then((res)=>{
                    this.guestState(false);
                    this.login(res.data);
                    this.$router.push({name: '/'});
                }).catch((error)=>{
                    if (error.message.includes("Network Error")) {
                        this.alertWarning('No hay conexion al servidor');
                        return;
                    }
                    if (error.response.status === 401) {
                        this.alertWarning('Usuario O contraseña incorrectos');
                        return;
                    }
                }).finally(()=>{
                    this.loading=false;
                })
            },
            newUser(){
                this.isLogin=false;
                this.form.email='';
                this.form.password='';
            },
            onsignUp(){
                /*firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(
                    (user) => {
                        this.$router.replace('dashboard')
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                );*/
                this.loading=true;
                this.$http.post('users',this.form).then((res)=>{
                    this.guestState(false);
                    this.login(res.data);
                    this.$router.push({name: '/'});
                }).catch((error)=>{
                    if (error.message.includes("Network Error")) {
                        this.alertWarning('No hay conexion al servidor');
                        return;
                    }
                    if (error.response.status === 422) {
                        this.alertWarning('error validacion');
                        return;
                    }
                }).finally(()=>{
                    this.loading=false;
                })
            },
            ...mapMutations(['login']),
            ...mapMutations(['guestState']),
        }
    }
</script>

<style scoped>

</style>