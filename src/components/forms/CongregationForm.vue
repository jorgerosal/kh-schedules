<template>
    <div class="main">
        <div id="wrapper">
            <div id="form">
                <div>
                    <p id="welcome">
                        Welcome!
                    </p>
                    <h3 id="message">
                        I am your meetings scheduler assistant!
                    </h3>
                </div>
                <div class="shoutout">
                    Let’s Get Started!
                </div>
                <CongFormInputs :settings="settings"/>
            </div>
            <div id="background"></div>
        </div>
    </div>

</template>

<script setup>
    import CongFormInputs from './CongFormInputs.vue';
    import { ref } from 'vue'
    const settings = ref({
        showLabels: false,
        PhCong: "Congregation or Group Name",
        PhLanguage: "Meeting Language",
        PhClasses: "Ministry Classes",
        showConfirm: true,
    })
</script>

<style scoped>
    .main
    {
        display: grid;
        height: 100%;
        width: 100%;
        background: #F3F5F7;
        place-items: center;
    }

    #wrapper
    {
        height: 460px;
        width: 450px;
        position: relative;
        margin-top: -100px;
    }

    #form
    {
        background: white;
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 20px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        z-index: 2;
        padding: 40px 50px;
        display: grid;
        grid-template-rows: 2.5fr 1.5fr 5fr 1fr;
    }

    #background
    {
        height: 100%;
        width: 100%;
        background: #3DA8EA;
        border-radius: 20px;
        transform: rotate(-15deg);
        z-index: 1;
        position: absolute;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        top: 10px;
        left: -25px;
    }

    #welcome
    {
        color: rgba(128, 128, 128, 0.849);
        font-weight: 600;
    }

    #message
    {
        color: #3DA8EA;
        font-size: 22px;
        font-weight: 600;
    }

    .shoutout
    {
        font-weight: 600;
        display: flex;
        font-size: 18px;
        align-items: center;
        color: rgb(53, 53, 53);
    }

</style>
