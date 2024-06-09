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
            <div class="actions">
                <div id="printer">
                    <button @click="print">
                        <span class="icon">
                            <IconPrinter />
                        </span>
                        Print
                    </button>
                </div>

                <div id="students">
                    <button @click="toStudents">Students</button>
                </div>

                <div class="cong-form">
                    <lord-icon src="https://cdn.lordicon.com/lecprnjb.json" trigger="hover" colors="primary:#e6e6e6"
                        style="width:25px;height:25px" @click.stop="showCongSettings">
                    </lord-icon>
                    <div class="cong-form-modal" v-if="congSettingsDisplay" ref="congformModal">
                        <CongFormInputs />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <slot></slot>
</template>

<script setup>
    import { useFileStore } from '@/stores/files';
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { ref, watch, onMounted, onUnmounted } from 'vue';
    import IconPrinter from '../icons/IconPrinter.vue';
    import CongFormInputs from '../forms/CongFormInputs.vue';

    const congformModal = ref(null);
    const file = useFileStore();
    const cong = useCongregationStore();
    const view = useViewStore()
    const selectedMonth = ref(file.selectedMonth?.content?.period);
    const selectedLanguage = ref(cong.getStoredLanguage?.code);
    const congSettingsDisplay = ref(false)

    const handleOutsideCongform = (event) => {
        if (congformModal.value && !congformModal.value.contains(event.target)) {
            hideCongSettings();
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleOutsideCongform);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleOutsideCongform);
    });

    function showCongSettings() {
        congSettingsDisplay.value = true
    }

    function hideCongSettings() {
        congSettingsDisplay.value = false
    }

    function loadMonth() {
        file.setMWBMonth(selectedMonth.value);
    }

    watch(() => file.selectedMonth?.content?.period, (newValue) => {
        selectedMonth.value = newValue;
    });

    function print() {
        window.print();
    }

    function toStudents() {
        view.publishers = true
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
        display: flex;
        margin: auto;
        height: 100%;
        max-width: 1070px;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: 300;
        font-size: 14px;
    }

    .actions
    {
        display: flex;
        gap: 20px;
        align-items: center
    }

    .setters
    {
        display: flex;
        gap: 0px;
        align-items: center;
        outline: none;
    }

    .setters span
    {
        color: rgb(192, 192, 192);
        width: 60px;
    }

    select
    {
        padding: 6px 15px;
        font-size: small;
        background: #e6e6e6;
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

    #printer,
    #students
    {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }

    #printer button
    {
        border: 1px solid #3DA8EA;
        padding: 6px 20px;
        font-size: small;
        border-radius: 4px;
        background: #3DA8EA;
        color: white;
        cursor: pointer;
        transition: ease-in-out .2s;
        display: flex;
        gap: 10px
    }

    #printer button svg
    {
        height: auto;
    }

    #students button
    {
        border: 1px solid #3DA8EA;
        padding: 7px 25px;
        font-size: small;
        border-radius: 4px;
        background: transparent;
        color: #3DA8EA;
        cursor: pointer;
        transition: ease-in-out .2s;
    }

    #printer button:hover
    {
        background: #3288bd;
    }

    #students button:hover
    {
        color: white;
        background: #3DA8EA;
    }

    lord-icon
    {
        cursor: pointer;
        opacity: .4;
    }

    lord-icon:hover
    {
        opacity: .8;
    }

    .cong-form
    {
        position: relative;

    }

    .cong-form-modal
    {

        position: absolute;
        width: 450px;
        top: calc(100% + 20px);
        right: calc(100% - 30px);
        height: 350px;
        padding: 30px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
</style>
