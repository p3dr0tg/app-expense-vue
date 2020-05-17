<template>
    <div class="gauge">
        <div class="gauge__body">
            <div class="gauge__fill"></div>
            <div class="gauge__cover">
                <label  class="income">{{income|numberFormat}}</label>
                <label  class="expenses">{{expenses|numberFormat}}</label>
                <label class="balance">{{balance|numberFormat}}</label>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "VueGauge",
        data(){
            return{
                income:0,
                expenses:0,
                balance:0
            }
        },
        mounted() {
        },
        methods:{
            setValue(value,income,expenses,balance){
                this.income=income;
                this.expenses=expenses;
                this.balance=balance;
                const gaugeElement = this.$el;
                if (value < 0 || value > 1) {
                    return;
                }
                gaugeElement.querySelector(".gauge__fill").style.transform = `rotate(${
                    value / 2
                }turn)`;
                /*gaugeElement.querySelector(".gauge__cover").textContent = `${Math.round(
                    value * 100
                )}%`;*/

            }
        }
    }
</script>

<style scoped>
    .gauge {
        width: 100%;
        max-width: 200px;
        font-family: "Roboto", sans-serif;
        font-size: 32px;
        color: #004033;
        margin: 0 auto;
    }

    .gauge__body {
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        background: #4caf50;
        position: relative;
        border-top-left-radius: 100% 200%;
        border-top-right-radius: 100% 200%;
        overflow: hidden;
    }

    .gauge__fill {
        position: absolute;
        top: 100%;
        left: 0;
        width: inherit;
        height: 100%;
        background: #f44336;
        transform-origin: center top;
        transform: rotate(0.25turn);
        transition: transform 0.2s ease-out;
    }

    .gauge__cover {
        width: 75%;
        height: 150%;
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);

        /* Text */
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 25%;
        box-sizing: border-box;
    }
    .balance{
        position: absolute;
        bottom: 48%;
        font-weight: 700;
        margin: 0 auto;
        text-align: center;
    }
</style>