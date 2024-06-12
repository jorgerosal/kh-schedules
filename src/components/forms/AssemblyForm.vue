<template>
    <div class="form-settings">

        <CustomSwitch v-model="hasAssemblyWeek" :label="'Has assembly/convention this month'"
            false-value="N" true-value="Y" hide-details />

        <div class="inputs" v-if="hasAssemblyWeek === 'Y'">
            <CustomSelect :items="weekOptions" label="Assembly Week" placeholder="Select Assembly Week" display="name"
                v-model="assemblyDetails.weekId" />
            <CustomSelect :items="eventStore.options" placeholder="Select Event" label="Event" id="code" display="name"
                v-model="assemblyDetails.code" />
            <CustomInput label="Theme" placeholder="Enter Event's Theme" v-model="assemblyDetails.theme" />
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import { useFileStore } from '@/stores/files';
    import { useAssembliesStore } from '@/stores/assemblies';

    import CustomSwitch from '../reusables/CustomSwitch.vue';
    import CustomSelect from '@/components/reusables/CustomSelect.vue';
    import CustomInput from '@/components/reusables/CustomInput.vue';

    const fileStore = useFileStore();
    const eventStore = useAssembliesStore();
    const hasAssemblyWeek = ref('N')

    const assemblyDetails = ref({ ...eventStore.model });

    const weekOptions = computed(() =>
        (fileStore.selectedMonth?.content?.weeks ?? []).map(w => ({
            id: w.id,
            name: w.week
        }))
    );


    watch(
        [hasAssemblyWeek, assemblyDetails],
        (
            [newAssemblyWeek, newAssemblyDetails]) => {
            const isAddEvent = newAssemblyWeek === 'Y';

            eventStore.setEvent(isAddEvent)

            if (isAddEvent) {
                eventStore.details[eventStore.currentMonth] = { ...newAssemblyDetails };
            }
        },
        { deep: true }
    )

    onMounted(async () => {
        await eventStore.retrieveLocal();
        eventStore.currentMonth = fileStore.selectedMonth.content.period;
        hasAssemblyWeek.value = eventStore.hasMonthAssembly;
        setInitialValues();
    })

    function setInitialValues() {
        const monthId = eventStore.currentMonth;
        const details = eventStore.details[monthId];

        if (details) {
            Object.assign(assemblyDetails.value, details);
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

    .form-settings
    {
        color: grey;
        font-size: 14px;
    }
</style>