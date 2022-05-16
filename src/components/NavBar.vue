<template>
    <div>
        <nav class="" role="navigation">
            <div class="nav-wrapper">
                <a href="javascript:void(0);" @click="routeTo('dashboard')" class="brand-logo">
                    {{auth.user.email}}
                </a>

                <ul class="right ">
                    <li><a href="javascript:void(0);" data-target="slide-out" id="menu-navbar"  class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
                </ul>
              <ul class="ul-account">
                <li><a class="dropdown-trigger dropdown-account" href="javascript:void(0);" data-target="dropdown1">{{account_description|ucwords}}<i class="material-icons right">arrow_drop_down</i></a></li>
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
                        <li>
                            <a class="collapsible-header waves-effect waves-blue" @click.prevent="onLogout"><i class="material-icons">open_in_browser</i>Cerrar Sesion</a>
                        </li>
                    </ul>
                </ul>
            </li>
        </ul>
        <ul id="dropdown1" class="dropdown-content">
            <li v-for="(item,index) in accountList" @click.prevent="selectAccount(item)">
                <a href="javascript:void(0)">{{item.description|ucwords}}</a>
            </li>
        </ul>
    </div>


</template>

<script>
    import {mapState, mapMutations,mapActions} from 'vuex';
    import Vue from "vue";
    export default {
        name: "NavBar",
        data(){
            return{
                //accountList:[],
            }
        },
        mounted() {
            M.AutoInit();
            document.addEventListener('DOMContentLoaded',()=>{
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems);
            });
            this.getAccounts();
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
            ...mapActions(['authLogout','setFirstAccount','setSelectAccount']),
            getAccounts(){
                this.$http.get('saving_accounts').then((res)=>{
                    this.$store.commit('setAccountList', res.data)
                    if(res.data.length){
                       this.setFirstAccount({account:res.data[0]});
                    }
                })
            },
            selectAccount(account){
                this.setSelectAccount({account:account});
            }
        },
        computed: {
            ...mapState(['auth','accountList']),
            account_description(){
                const limit=26
                if(this.auth.account.description.length>limit){
                  return this.auth.account.description.substring(0,(limit-3))+'...'
                }
                return this.auth.account.description;
            }
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