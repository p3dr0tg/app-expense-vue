<template>
    <div class="row">
        <div class="col s12">
            <div class="wrapper wrapper-content" style="padding: 0px 0px 40px;">
                <router-view v-if="guestState"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "Auth",
        computed: {
            ...mapState(['guestState']),
        }
    }
</script>

<style scoped>

</style>