<template>
    <div class="contents">
        <template v-for="(w, i) in weeks" :key="w.order">
            <ScheduleByWeek :w="w" :i="i" :weeks="weeksCount" />
        </template>
    </div>
</template>

<script setup>
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';
    import ScheduleByWeek from '@/components/template-psp/ScheduleByWeek.vue'

    const fileStore = useFileStore()

    const weeks = computed(() => {
        return fileStore.selectedMonth?.content?.weeks || [];
    });

    const weeksCount = computed(()=> {
        return weeks.value.length
    })
</script>
