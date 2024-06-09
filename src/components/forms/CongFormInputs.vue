<template>
    <div class="inputs">
        <div class="field">
            <label for="" v-show="props.settings.showLabels">Congregation or Language Group</label>
            <input class="input" type="text" :placeholder="props.settings.PhCong" v-model="congStore.congregation.name">
        </div>
        <div class="select field" @mouseleave="hideLangOptions">
            <label for="" v-show="props.settings.showLabels">Meeting Language</label>
            <input class="input" type="text" :placeholder="props.settings.PhLanguage" readonly @click="showLangOptions"
                :value="congStore.getStoredLanguage?.lang">
            <div :class="langClasses">
                <div class="dd-items" v-for="l in congStore.supportedLanguages" :key="l.code"
                    @click="setLanguage(l.code)">
                    {{ l.lang }}
                </div>
            </div>
        </div>
        <div class="select field" @mouseleave="hideClassOptions">
            <label for="" v-show="props.settings.showLabels">Ministry School Classes</label>
            <input class="input" type="text" :placeholder="props.settings.PhClasses"
                :value="congStore.getStoredMinistryClass?.display" @focus="showClassOptions" readonly>
            <div :class="classClasses">
                <div class="dd-items" v-for="c in congStore.ministryClasses" :key="c.id"
                    @click="setMinistryClass(c.id)">
                    {{ c.display }}
                </div>
            </div>
        </div>
    </div>
    <div v-show="filledRequired && props.settings.showConfirm">
        <button id="start" @click="loadCongSettings">Confirm</button>
    </div>

</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { computed, ref } from 'vue';
    import { useViewStore } from '@/stores/views';
    import { useFileStore } from '@/stores/files';
    import { useAssignmentsStore } from '@/stores/assignments';

    const viewStore = useViewStore()
    const congStore = useCongregationStore()
    const fileStore = useFileStore()
    const assignments = useAssignmentsStore()
    const cong = ref(null)
    const ddLangs = ref(false)
    const ddClasses = ref(false)

    const props = defineProps({
        settings: {
            type: Object,
            default: {
                showLabels: true,
                PhCong: "",
                PhLanguage: "",
                PhClasses: "",
                showConfirm: false,
            }
        },

    })

    const filledRequired = computed(() => {
        return congStore.getStoredLanguage && congStore.getStoredMinistryClass
    })

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

    async function loadCongSettings() {
        viewStore.congregationForm = false
        viewStore.initialStorageCheck = true

        await loadCongSettingChanges()
    }

    async function loadCongSettingChanges() {
        await congStore.retrieveLocal();
        await fileStore.loadFiles();
        fileStore.setMWBMonth();
        assignments.retrieveLocal();
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
        congStore.setLanguage(code);
        hideLangOptions();
        if (!props.settings.showConfirm) {
            loadCongSettingChanges();
        }
    }

    function setMinistryClass(code) {
        congStore.setMinistryClass(code)
        hideClassOptions()
    }
</script>

<style scoped>
    .inputs
    {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
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

    .field label
    {
        color: gray;
        font-size: 12px;
    }

</style>