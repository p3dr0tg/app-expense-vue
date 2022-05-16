<template>
    <div id="wrapper" v-if="auth.isAuth">
        <nav-bar></nav-bar>
        <div id="page-wrapper" class="gray-bg dashbard-1">

            <div class="row">
                <div class="col s12">
                    <div class="wrapper wrapper-content" style="padding: 1px 0px 0px;">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import NavBar from "../components/NavBar";
    import {mapState, mapActions} from 'vuex';
    export default {
        name: 'home',
        components: {
            NavBar,
        },
        created(){
            this.loadUser();
            this.loadAccount();
        },
        watch:{
           /* auth(value){
                if(this.auth.isAuth){
                    this.loadUser();
                }
            }*/
        },
        mounted() {

        },
        methods:{
            ...mapActions(['loadUser','loadAccount']),
        },
        computed: {
            ...mapState(['auth']),
        }
    }
</script>
