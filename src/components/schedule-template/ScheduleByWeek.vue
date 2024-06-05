<template>
    <section :class="pagebreaker">
        <ByWeekTitle :w="w" />
        <div class="assignments">
            <div>
                <template v-for="p in w.parts.gems" :key="p.id">
                    <PartItem :p="p" />
                </template>
            </div>
            <div>
                <template v-for="p in w.parts.ministry" :key="p.id">
                    <PartItem :p="p" />
                </template>
            </div>
            <div>
                <template v-for="p in w.parts.living" :key="p.id">
                    <PartItem :p="p" />
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed } from 'vue';
    import ByWeekTitle from './ByWeekTitle.vue';
    import PartItem from './PartItem.vue'

    const isFourthWeek = computed(() => {
        const isLastWeek = props.weeks == props.i + 1;
        if (isLastWeek) return false;
        return (props.i + 1) % 4 == 0;
    })

    const pagebreaker = computed(() => {
        return isFourthWeek.value ? 'page-break' : '';
    })

    const props = defineProps({
        w: { type: Object, },
        i: { type: Number, },
        weeks: { type: Number, },
    })
</script>