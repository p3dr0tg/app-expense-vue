<template>
    <footer class="page-footer">
        <div class="footer-copyright ">
            <span class="span-total center-align">{{total|numberFormat}}</span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "FooterMovement",
        props:['total']
    }
</script>

<style scoped>
    .page-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding-top: 0;
       /* background-color: #3b4c55;*/
    }
    .page-footer .footer-copyright{
        min-height: 40px;
    }
    .span-total{
        font-size: 20px;
        font-weight: 700;
        position: relative;
        left: 50%;
    }
</style>