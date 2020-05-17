<template>
    <div class="responsive-table content-collection scroll-content">
        <ul class="collection">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MaterialCollection"
    }
</script>

<style scoped>
    .content-collection{
        height: 59vh;/*320*/
        overflow-y: auto;
    }

</style>