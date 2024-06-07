<template>
    <div class="headbar">
        <div class="set-wrappers">
            <div class="setters">
                <span>Month</span>
                <select v-if="file" v-model="selectedMonth" @change="loadMonth">
                    <template v-if="file.availableMonths">
                        <option :value="f.content.period" v-for="f in file.availableMonths" :key="f.content.period">
                            {{ f.content.display }}
                        </option>
                    </template>
                </select>
            </div>

            <div class="setters">
                <span>Language</span>
                <select>
                    <option :value="lang.code" v-for="lang in cong.supportedLanguages" :key="lang.code">
                        {{ lang.lang }}
                    </option>
                </select>
            </div>

            <div class="setters">
                <span>Template</span>
                <select>
                    <option v-for="t in file.supportedTemplates" :value="t.code">{{ t.name }}</option>
                </select>
            </div>

            <div id="printer" @click="print">
                <button>Print</button>
            </div>
        </div>
    </div>
    <slot></slot>
</template>

<script setup>
    import { useFileStore } from '@/stores/files';
    import { useCongregationStore } from '@/stores/congregation';
    import { ref, watch } from 'vue';

    const file = useFileStore();
    const cong = useCongregationStore()
    const selectedMonth = ref(file.selectedMonth?.content?.period);

    function loadMonth() {
        file.setMWBMonth(selectedMonth.value);
    }

    // Watch for changes in the file's selected month and update the local selectedMonth
    watch(() => file.selectedMonth?.content?.period, (newValue) => {
        selectedMonth.value = newValue;
    });

    function print() {
        window.print();
    }
</script>


<style scoped>
    .headbar
    {
        height: 60px;
        width: 100%;
        background: rgb(59, 56, 56);
        position: fixed;
        z-index: 3;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }

    .set-wrappers
    {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr .5fr;
        margin: auto;
        height: 100%;
        max-width: 1080px;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 300;
        font-size: 14px;
        /* gap: 60px */

    }

    .setters
    {
        display: flex;
        gap: 15px;
        align-items: center;
        outline: none;
        /* border: 1px solid white; */
    }

    .setters span
    {
        color: rgb(192, 192, 192);
        width: 70px;
    }

    select
    {
        padding: 6px 15px;
        font-size: small;
        background: rgb(230, 230, 230);
        border-radius: 4px;
        border: none;
        appearance: none;  
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-right: 20px;
        background-image: url("");
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 5px;
    }

    #printer
    {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }

    #printer button
    {
        border: 1px solid orange;
        padding: 6px 50px;
        font-size: small;
        border-radius: 4px;
        background: orange;
        color: white;
        cursor: pointer;
        transition: ease-in-out .2s;
    }

    #printer button:hover
    {
        background: rgb(255, 179, 39);
    }
</style>
