/* eslint-disable */
import auth from './auth';
import guest from './guest';
//import firebase from 'firebase'
import {store} from './../store';
export default (to, from, next) => {
    if (!to.matched.length) {
        next({name: 'Login'});
        //next('/404');
        return;
    }
    //const currentUser = firebase.auth().currentUser;
    if (store.state.auth.isAuth) {
        auth(to, from, next);
        //allow(to, from, next);
    } else {
        guest(to, from, next);
    }
};