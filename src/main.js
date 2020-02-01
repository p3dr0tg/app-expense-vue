import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
//import firebase from 'firebase'
import Base from './base'
import './registerServiceWorker'
import './filters'
require('materialize-css');
require('materialize-css/dist/css/materialize.min.css')
require('toastr/build/toastr.min.css')
Vue.config.productionTip = false
let app=null;
window.axios = require('axios');
const config =require('../config');
const base = window.axios.create({
    baseURL: config.url,
})
/***/



/**/
Vue.prototype.$http = base
/*const firebaseConfig = {
    apiKey: "AIzaSyD9rN75YXlCqTUY9LxpVo5QjpuyOjtQJo8",
    authDomain: "app-expenses.firebaseapp.com",
    databaseURL: "https://app-expenses.firebaseio.com",
    projectId: "app-expenses",
    storageBucket: "",
    messagingSenderId: "304631067653",
    appId: "1:304631067653:web:9cc6f2652c1a22c6e3186c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);*/
Vue.mixin(Base);
//firebase.auth().onAuthStateChanged(()=>{
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
//})

