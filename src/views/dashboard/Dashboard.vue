<template>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a href="#test1" @click.prevent="tabs('resumen')">Resumen</a></li>
                <li class="tab col s3"><a class="active" href="#test2" @click.prevent="tabs('movimiento')">Movimiento</a></li>
                <li class="tab col s3"><a href="#test3" @click.prevent="tabs('estadistica')">Estadistica</a></li>
            </ul>
        </div>
        <div id="test1" class="col s12">
            <summaries></summaries>
        </div>
        <div id="test2" class="col s12">
            <movement></movement>
        </div>
        <div id="test3" class="col s12">
            <categories></categories>
        </div>
        <footer-movement :total="total"></footer-movement>
    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import Movement from "./Movement";
    import Summaries from "./Summaries";
    import FooterMovement from "../../components/FooterMovement";
    import Categories from "./Categories";
    import {EventBus} from "../../event-bus";

    export default {
        name: "Dashboard",
        components: {Categories, Summaries, Movement,FooterMovement},
        methods:{
            tabs(tab){
                EventBus.$emit('tabs:dashboard', tab);
            }
        },
        computed:{
            ...mapState(['total'])
        }
    }
</script>

<style scoped>
    .tabs .tab a.active{
        color:#395280;
    }
    .tabs .tab a:focus, .tabs .tab a:focus.active {
        background-color: rgba(13, 34, 66, 0.2);
        outline: none;
    }
    .tabs .tab a {
     color: #039be5;
    }

</style>