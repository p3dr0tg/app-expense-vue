<template>
    <div id="app">
        <home v-if="auth.isAuth"></home>
        <auth v-if="!auth.isAuth"></auth>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
<script>
    import Home from "./views/Home";
    import {mapState,mapActions} from 'vuex';
    import Auth from "./views/Auth";
    export default {
        components: {Auth, Home},
        created(){
            this.$http.interceptors.response.use(undefined, (err) => {
                return new Promise((resolve, reject) => {
                    if (err.response.status == 401 && err.config && err.config.__isRetryRequest == undefined) {
                        this.auth_logout();
                        //this.$router.push({ name: 'Login' });
                       // this.$store.dispatch('auth_logout','');
                        //window.location.reload();
                    }
                    if (err.response.status == 403 && err.config && err.config.__isRetryRequest == undefined) {
                        this.$router.push({name:'unauthorized'});
                        //window.location.reload();
                    }
                    throw err;
                });
            });
        },
        computed: {
            ...mapState(['auth']),
        },
        methods:{
            ...mapActions(['auth_logout']),
        }
    }
</script>