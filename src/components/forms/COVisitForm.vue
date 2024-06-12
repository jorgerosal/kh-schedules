<template>
    <div id="co-visit">
        
        <CustomSwitch v-model="hasVisitWeek" :label="'Has circuit overseer\'s visit this month'"
            false-value="N" true-value="Y" hide-details />

        <div class="inputs" v-if="hasVisitWeek === 'Y'">
            <CustomSelect :items="weekOptions" label="Visit Week" placeholder="Select Visit Week" display="name"
                v-model="visitDetails.weekId" />
            <CustomInput label="CO Name" placeholder="Enter Circuit Overseer's Name" v-model="visitDetails.co" />
            <CustomInput label="1st Service Talk" placeholder="Enter Talk Theme" v-model="visitDetails.talk" />
            <CustomInput label="Song No" placeholder="Enter Last Song No" v-model="visitDetails.sjj" numeric />
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { useFileStore } from '@/stores/files';
    import { useCoVisitStore } from '@/stores/covisits';
    import CustomSwitch from '../reusables/CustomSwitch.vue';
    import CustomSelect from '@/components/reusables/CustomSelect.vue';
    import CustomInput from '@/components/reusables/CustomInput.vue';


    const fileStore = useFileStore();
    const visitStore = useCoVisitStore();
    const hasVisitWeek = ref('N');

    const visitDetails = ref({
        weekId: null,
        talk: null,
        co: null,
        sjj: null,
    });

    const weekOptions = computed(() =>
        (fileStore.selectedMonth?.content?.weeks ?? []).map(w => ({
            id: w.id,
            name: w.week
        }))
    );

    watch(
        [hasVisitWeek, visitDetails],
        ([newHasVisitWeek, newVisitDetails]) => {
            const monthId = visitStore.currentMonth;
            const isAddVisit = newHasVisitWeek === 'Y';

            visitStore.setVisit(isAddVisit);

            if (isAddVisit) {
                visitStore.visitDetails[monthId] = { ...newVisitDetails };
            }
        },
        { deep: true }
    );

    onMounted(async () => {
        await visitStore.retrieveLocal();
        visitStore.currentMonth = fileStore.selectedMonth.content.period;
        hasVisitWeek.value = visitStore.hasMonthVisit;
        setInitialValues();
    });

    function setInitialValues() {
        const monthId = visitStore.currentMonth;
        const details = visitStore.visitDetails[monthId];

        if (details) {
            Object.assign(visitDetails.value, details);
        }
    }
</script>

<style scoped>
    .inputs
    {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        padding: 0 0 0 20px;
        margin-left: -20px;
        border-left: 3px solid #3da8ea34;
    }

    #co-visit
    {
        color: grey;
        font-size: 14px;
    }
</style>
