import toastr from 'toastr'
export default {
    methods: {
        now(){
            return new Date();
        },
        isEmpty(value){
            if(value==undefined || value==null || value==''){
                return true;
            }
            return false;
        },
        alertSuccess(message) {
            this.alertGeneral('success', 'Operacion Terminada', message);
        },
        alertWarning(message) {
            this.alertGeneral('warning', 'Advertencia', message);
        },
        alertError(message) {
            this.alertGeneral('error', 'Error en el sistema', message);
        },
        alertGeneral(shortCutFunction, title, message) {
            toastr.options = {
                closeButton: true,
                debug: false,
                newestOnTop: false,
                progressBar: false,
                rtl: false,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                onclick: null,
                showDuration: 100,
                hideDuration: 200,
                timeOut: 3500,
                extendedTimeOut: 1500,
            };
            toastr[shortCutFunction](message, title);
        },
    }

}