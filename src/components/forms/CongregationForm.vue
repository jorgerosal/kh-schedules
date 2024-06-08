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
                <div class="inputs">
                    <input class="input" type="text" placeholder="Congregation" v-model="cong">
                    <div class="select" @mouseleave="hideLangOptions">
                        <input class="input" type="text" placeholder="Select Meeting Language" readonly
                            @click="showLangOptions" :value="congStore.getStoredLanguage?.lang">
                        <div :class="langClasses">
                            <div class="dd-items" v-for="l in congStore.supportedLanguages" :key="l.code"
                                @click="setLanguage(l.code)">
                                {{ l.lang }}
                            </div>
                        </div>
                    </div>
                    <div class="select" @mouseleave="hideClassOptions">
                        <input class="input" type="text" placeholder="Ministry Classes"
                            :value="congStore.getStoredMinistryClass?.display" @focus="showClassOptions" readonly>
                        <div :class="classClasses">
                            <div class="dd-items" v-for="c in congStore.ministryClasses" :key="c.id"
                                @click="setMinistryClass(c.id)">
                                {{ c.display }}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button id="start" @click="assignCongName">Start</button>
                </div>
            </div>
            <div id="background"></div>
        </div>
    </div>

</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { computed, ref } from 'vue';

    const viewStore = useViewStore()
    const ddLangs = ref(false)
    const ddClasses = ref(false)

    const congStore = useCongregationStore()
    const cong = ref(null)

    const langClasses = computed(() => {
        return [
            'dd-holder', { 'show': ddLangs.value }
        ]
    })

    const classClasses = computed(() => {
        return [
            'dd-holder', { 'show': ddClasses.value }
        ]
    })


    function assignCongName() {
        congStore.setCongName(cong.value);
        congStore.storeToLocal();
        viewStore.congregationForm = false
        viewStore.initialStorageCheck = true
    }

    function showLangOptions() {
        ddLangs.value = true
    }

    function hideLangOptions() {
        ddLangs.value = false
    }

    function showClassOptions() {
        ddClasses.value = true
    }

    function hideClassOptions() {
        ddClasses.value = false
    }

    function setLanguage(code) {
        congStore.setLanguage(code)
        hideLangOptions()
    }

    function setMinistryClass(code) {
        congStore.setMinistryClass(code)
        hideClassOptions()
    }
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
        height: 450px;
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

    .inputs
    {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5px;
    }

    .input
    {
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(128, 128, 128, 0.308);
        padding: 10px;
        outline: none;
        font-size: 15px;
        font-weight: 600;
        color: #3DA8EA;
        cursor: pointer;

    }

    button
    {
        background: #3DA8EA;
        border: none;
        color: white;
        font-size: 12px;
        padding: 10px 35px;
        border-radius: 50px;
        cursor: pointer;
        transition: ease-in-out .5s;
    }

    button:hover
    {
        background: #2878aa;
    }

    .select
    {
        position: relative;
        cursor: pointer !important;
    }

    .dd-holder.show
    {
        display: flex;
        opacity: 1;
    }

    .dd-holder
    {
        display: none;
        opacity: 0;
        position: absolute;
        width: 100%;
        background: white;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        z-index: 1;
        top: calc(100% - 1px);
        transform: translateY(0);
        transition: opacity .3s;

        flex-direction: column;
    }

    .dd-items
    {
        cursor: pointer;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(128, 128, 128, 0.795);
    }

    .dd-items:hover
    {
        color: gray;
    }
</style>
