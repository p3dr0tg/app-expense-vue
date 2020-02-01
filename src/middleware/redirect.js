/* eslint-disable */


//import firebase from "firebase";
import {store} from './../store';
export default (to, from, next) => {
    //const currentUser = firebase.auth().currentUser;
    if (store.state.auth.isAuth) {
        next({path: '/'});
    } else {
        next();
    }
};
