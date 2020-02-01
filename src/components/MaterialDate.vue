<template>
    <input type="text" autocomplete="off" >
</template>

<script>
    export default {
        name: "MaterialDate",
        props:{
            dateFormat:{
                default:'dd/mm/yyyy'
            }
        },
        mounted() {
            M.Datepicker.init(this.$el,{
                autoClose:true,
                i18n:{
                    cancel:'Cancelar',
                    months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'],
                    monthsShort:['En','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oc','Nov','Dic'],
                    weekdays:['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
                    weekdaysShort:['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
                    weekdaysAbbrev:['D','L','M','Mi','J','V','S']
                },
                format:this.dateFormat,
                onSelect:(date)=>{
                    let format=this.dateFormat.toUpperCase();
                    const now=new Date(date);
                    let result=`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`
                    this.$emit('input', {
                        target: {
                            value: result
                        }
                    })
                }
            });
        }
    }
</script>

<style scoped>

</style>