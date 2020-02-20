<template>
    <div id="app">
        <home v-if="auth.isAuth"></home>
        <auth v-if="!auth.isAuth"></auth>
    </div>
</template>

<style>
    #app {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
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
                        console.log('error 401');
                        this.authLogout();
                        this.$router.push({name: 'Login'})
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
            ...mapActions(['authLogout']),
        }
    }
</script>