<template>
    <div :id="idModal" class="modal modal-fixed-footer" >
        <div :class="{'sk-loading':loading}">
            <spinner v-if="loading"></spinner>
            <div class="modal-header">
                <button type="button" data-dismiss="modal" aria-hidden="true" class="close modal-close">×</button>
                <h5>
                    <slot name="title"></slot>
                </h5>
            </div>
            <div class="modal-content">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
</template>

<script>
    import Spinner from "./Spinner";
    export default {
        name: "VueModal",
        components: {Spinner},
        props: {
            loading:{
                default:false
            }
        },
        data(){
            return{
                instance:null
            }
        },
        mounted() {
            M.AutoInit();
           // const elem=document.querySelector(this.);
            this.instance=M.Modal.getInstance(this.$el);
        },
        computed:{
            idModal(){
                return Math.floor(Math.random() * (999 - 100 + 1)) + 100+'_modal';
            }
        },
        methods:{
            open(){
                this.instance.open();
            },
            close(){
                this.instance.close();
            },
        }
    }
</script>

<style scoped>
    .modal{
        overflow-x: hidden;
        width: 96%;
        max-height: 80%;
    }
    .modal-header{
        border-bottom: 1px solid rgba(0,0,0,0.1);
        /* position: absolute; */
        top: 0;
        padding: 4px 10px;
        /* height: 56px; */
        width: 100%;
    }
    .modal-header h5{
        font-weight: 600;
        font-size: 14px;
    }
    .modal-header .close {
        margin-top: 5px;
        margin-right: .5em;
    }
    button.close {
        -webkit-appearance: none;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
    }
    .close {
        float: right;
        font-size: 21px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
    }
    .modal-content{
        padding-left: 8px;
        padding-right: 8px;
    }
    .modal-footer .btn-small{
        margin: 6px .1em !important;
    }
</style>