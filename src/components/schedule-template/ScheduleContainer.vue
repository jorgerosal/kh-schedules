<template>
    <div class="contents">
        <template v-for="w in weeks" :key="w.order">
            <ScheduleByWeek :w="w"/>
        </template>
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
</script>
