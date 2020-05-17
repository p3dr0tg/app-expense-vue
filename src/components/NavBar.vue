<template>
    <div>
        <nav class="" role="navigation">
            <div class="nav-wrapper">
                <a href="javascript:void(0);" @click="routeTo('dashboard')" class="brand-logo"><i class="material-icons">cloud</i>{{auth.user.email}}</a>
                <ul class="right">
                    <li ><a href="javascript:void(0);" title="cerrar session" @click="onLogout" class="logout" ><i class="material-icons">phonelink_off</i></a></li>
                    <li><a href="javascript:void(0);" data-target="slide-out" id="menu-navbar"  class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
                </ul>
            </div>
        </nav>
        <ul id="slide-out" class="sidenav">
            <li>
                <div class="user-view">
                    <div class="background" style="background: rgb(43, 69, 81)">
                    </div>
                    <a href="#user">
                        <img class="circle" src="./../assets/avatar.png">
                    </a>
                    <a href="#name"><span class="white-text name">{{auth.user.email}}</span></a>
                    <a href="#email"><span class="white-text email"></span></a>
                </div>
            </li>
            <li>
                <ul class="collapsible collapsible-accordion">
                    <ul class="collapsible collapsible-accordion">
                        <li>
                            <a class="collapsible-header waves-effect waves-blue" @click="routeTo('dashboard')"><i class="material-icons">home</i>Inicio</a>
                        </li>
                        <li>
                            <a class="collapsible-header waves-effect waves-blue"><i class="material-icons">desktop_windows</i>Administrar <i class="material-icons right" style="margin-right:0;">arrow_drop_down</i></a>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                        <a class="waves-effect waves-blue" @click="routeTo('saving_accounts')"><i class="material-icons">account_balance</i>Cuentas</a>
                                        <a class="waves-effect waves-blue" @click="routeTo('categories')"><i class="material-icons">assignment</i>Categorias</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </ul>
            </li>
        </ul>
    </div>


</template>

<script>
    import {mapState, mapMutations,mapActions} from 'vuex';
    export default {
        name: "NavBar",
        mounted() {
            M.AutoInit();
            document.addEventListener('DOMContentLoaded',()=>{
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems);
            });
        },
        methods:{
            routeTo(route){
                const sidenav=document.querySelector('.sidenav')
                M.Sidenav.getInstance(sidenav).close();
                this.$router.push({name:route});

            },
            onLogout(){
                this.authLogout();
            },
            ...mapActions(['authLogout']),
        },
        computed: {
            ...mapState(['auth']),
        }
    }
</script>

<style scoped>
    nav{
        background-color: #607d8b;
    }
    .sidenav-trigger{
        display: block;
    }
    .logout{
        position: relative;
    }
</style>