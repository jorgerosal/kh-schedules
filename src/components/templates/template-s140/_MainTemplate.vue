<template>
    <div id="s140">
        <div>
            <template v-for="(w, i) in weeks" :key="w.order">
                <HeaderTitle v-if="i % 2 == 0" />
                <WeekItem :w="w" :i="i" v-if="!w.hasEvent" />
                <EventDisplay v-else />
                <div v-if="i % 2 == 1 && weeks.length > i + 1" class="page-break relative">
                    <div class="s140-break no-print"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useFileStore } from '@/stores/files';
    import HeaderTitle from '@/components/templates/template-s140/HeaderTitle.vue';
    import WeekItem from '@/components/templates/template-s140/WeekItem.vue';
    import EventDisplay from './EventDisplay.vue';

    const fileStore = useFileStore()

    const weeks = computed(() => {
        return fileStore.selectedMonth?.content?.weeks || [];
    });
</script>