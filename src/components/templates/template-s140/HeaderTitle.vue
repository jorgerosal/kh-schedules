<template>
    <div>
        <div class="s140-header">
            <div class="s140-header-cong">{{ cong.congName }}</div>
            <div class="s140-header-title">{{ title }}</div>
        </div>
        <div class="s140-hr"> </div>
    </div>
</template>

<script setup>

    import translations from '@/assets/utils/translations';
    import { useCongregationStore } from '@/stores/congregation';
    import { computed } from 'vue';

    const cong = useCongregationStore()

    const title = computed(() => {
       return translations.mwbs140[cong.congregation.lang].title
    })
</script>
