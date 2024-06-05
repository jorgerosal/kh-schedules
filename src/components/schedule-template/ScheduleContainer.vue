<template>
    <div class="contents">
        <template v-for="(w, i) in weeks" :key="w.order">
            <ScheduleByWeek :w="w" :i="i" :weeks="weeksCount" />
        </template>
    </div>
    <div id="printer">
        <button @click="print">Print</button>
    </div>
</template>

<script setup>
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';
    import ScheduleByWeek from '@/components/schedule-template/ScheduleByWeek.vue'

    const fileStore = useFileStore()

    const weeks = computed(() => {
        return fileStore.selectedMonth?.content?.weeks || [];
    });

    const weeksCount = computed(()=> {
        return weeks.value.length
    })

    function print() {
        window.print();
    }
</script>
