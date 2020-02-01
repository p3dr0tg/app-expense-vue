<template>
    <div class="responsive-table content-collection">
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
        height: 320px;
        overflow-y: auto;
    }
    .collection .collection-item.avatar{
        padding-left: .5em;
        min-height: 62px;
    }
    .collection .collection-item.avatar .title {
        font-size: 14px;
        font-weight: 600;
    }
    .collection .collection-item.avatar p {
        font-size: 13px;
    }
    .secondary-content{
        font-weight: bold;
    }
</style>