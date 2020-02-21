<template>
    <footer class="page-footer">
        <div class="footer-copyright ">
            <span style="position: absolute;font-weight: 600;font-size: 15px;left: 1%;">Saldo</span>
            <span class="span-total center-align">S/ {{total|numberFormat}}</span>
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
        background-color: #607d8b;
    }
    .page-footer .footer-copyright{
        min-height: 40px;
    }
    .span-total{
        font-size: 24px;
        font-weight: 700;
        position: relative;
        left: 50%;
    }
</style>