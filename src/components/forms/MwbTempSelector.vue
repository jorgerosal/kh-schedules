<template>
    <div id="sett-prefs">
        <div class="form-subtitle">PREFERENCES</div>
        <CustomSelect :items="files.supportedTemplates" label="Template" placeholder="Select Template"
            v-model="files.template" id="code" />
        <CustomSelect v-if="isS140" :items="generateTimes" label="Midweek Start Time" placeholder="Select Time"
            v-model="cong.congregation.midweekTime" />
    </div>
</template>

<script setup>
    import CustomSelect from '@/components/reusables/CustomSelect.vue';
    import { useCongregationStore } from '@/stores/congregation';
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';

    const files = useFileStore()
    const cong = useCongregationStore()

    const isS140 = computed(()=> {
        return files.template === 's-140'
    })

    const generateTimes = computed(() => {
        const times = [];
        let hours = 8;
        let minutes = 0;

        while (hours < 20 || (hours === 20 && minutes === 0)) {
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const id = `${formattedHours}:${formattedMinutes}`;
            const period = hours < 12 ? ' AM' : ' PM';
            const displayHours = hours % 12 === 0 ? 12 : hours % 12;
            const name = `${displayHours}:${formattedMinutes}${period}`;

            times.push({ id, name });

            minutes += 15;
            if (minutes >= 60) {
                minutes = 0;
                hours += 1;
            }
        }

        return times;
    })
</script>

<style scoped>
    #sett-prefs
    {
        margin: 20px 0 0px;
        display: flex;
        flex-direction: column;
        gap: 10px
    }

</style>