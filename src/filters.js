import Vue from 'vue'
Vue.filter('numberFormat', (value) => {
    return Number(value)
    .toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
});
Vue.filter('dateFormat', (value) => {
    if (value == null)
        return '';
    value = value + '';
    if (value != null && value.length > 0 && value.length != '') {
        if (value.indexOf('-') != -1) {
            var arrayFecha = value.split('-').reverse();
            return arrayFecha.join('/');
            //return arrayFecha[2] + '/' + arrayFecha[1] + '/' + arrayFecha[0];
        }
        return value;
    }
    return '';
});
Vue.filter('upper',(value)=>{
    return value.toString().toUpperCase()
})
Vue.filter('ucwords',(value)=>{
    return  value?.toString().toLowerCase().replace(/\b[a-z]/g, (letter) =>{
        return letter.toUpperCase();
    });
})