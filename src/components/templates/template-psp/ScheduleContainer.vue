<template>
    <div class="contents">
        <template v-for="(w, i) in weeks" :key="w.order">
            <ScheduleByWeek :w="w" :i="i" :weeks="weeksCount" v-if="!w.hasEvent" />
            <ScheduleEvent v-else />
        </template>
    </div>
</template>

<script setup>
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';
    import ScheduleByWeek from '@/components/templates/template-psp/ScheduleByWeek.vue'
    import ScheduleEvent from '@/components/templates/template-psp/ScheduleEvent.vue'

    const fileStore = useFileStore()

    const weeks = computed(() => {
        return fileStore.selectedMonth?.content?.weeks || [];
    });

    const weeksCount = computed(() => {
        return weeks.value.length
    })
</script>
