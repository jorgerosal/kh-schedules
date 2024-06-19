<template>
    <div id="s140">
        <div>
            <template v-for="(w, i) in weeks" :key="w.order">
                <HeaderTitle v-if="i % 2 == 0"/>
                <WeekItem :w="w" :i="i" v-if="!w.hasEvent" />
                <div v-if="i % 2 == 1 && weeks.length > i+1" class="page-break relative">
                    <div class="s140-break no-print"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import HeaderTitle from '@/components/templates/template-s140/HeaderTitle.vue';
    import WeekItem from '@/components/templates/template-s140/WeekItem.vue';
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';

    const fileStore = useFileStore()

    const weeks = computed(() => {
        return fileStore.selectedMonth?.content?.weeks || [];
    });
</script>