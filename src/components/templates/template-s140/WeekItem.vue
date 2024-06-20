<template>
    <div class="s140-week">
        <div class="s140-grid-col2">
            <div class="s140-week-title">{{ w.week }} | {{ w.bibleReading }}</div>
        </div>

        <template v-for="part in composedParts" :key="part.id">

            <template v-if="part.type == 'header'">
                <div class="s140-grid-col2">
                    <div :class="part.classNames">{{ part.title }}</div>
                    <div></div>
                </div>
            </template>

            <template v-else>
                <PartItem :part="part"/>        
            </template>
        </template>

        <div class="s140-yspacer no-print"></div>
        <div class="s140-yspacer no-print"></div>
        <div class="s140-yspacer no-print"></div>
        <!-- </div> -->
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import PartItem from './PartItem.vue';
    import { useFileStore } from '@/stores/files';

    const props = defineProps({
        w: { type: Object, },
        i: { type: Number, },
    })

    const file = useFileStore()
    const composedParts = computed(() => {
        return file.s140Parts[props.w.id]
    })

</script>
