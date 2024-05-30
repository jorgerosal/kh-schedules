<template>
    <section>
        <ByWeekTitle :w="w" />
        <div class="assignments">
            <div>
                <template v-for="p in w.parts.gems" :key="p.id">
                    <PartItem :p="p"/>
                </template>
            </div>
            <div>
                <template v-for="p in w.parts.ministry" :key="p.id">
                    <PartItem :p="p"/>
                </template>
            </div>
            <div>
                <template v-for="p in w.parts.living" :key="p.id">
                    <PartItem :p="p"/>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>

    import ByWeekTitle from './ByWeekTitle.vue';
    import PartItem from './PartItem.vue'

    const props = defineProps({
        w: { type: Object, }
    })
</script>