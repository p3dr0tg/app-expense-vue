<template>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a href="#test1">Resumen</a></li>
                <li class="tab col s3"><a class="active" href="#test2">Movimiento</a></li>
                <li class="tab col s3"><a href="#test3">Estadistica</a></li>
            </ul>
        </div>
        <div id="test1" class="col s12">
            <summaries></summaries>
        </div>
        <div id="test2" class="col s12">
            <movement></movement>
        </div>
        <div id="test3" class="col s12">Test 3</div>
        <footer-movement :total="total"></footer-movement>
    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import Movement from "./Movement";
    import Summaries from "./Summaries";
    import FooterMovement from "../../components/FooterMovement";
    export default {
        name: "Dashboard",
        components: {Summaries, Movement,FooterMovement},
        computed:{
            ...mapState(['total'])
        }
    }
</script>

<style scoped>

</style>