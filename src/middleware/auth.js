export default (to, from, next) => {
    if (to.meta.guestGuard!=undefined && to.meta.guestGuard) {
        next({name: '/'});
    } else {
        next();
    }
};
