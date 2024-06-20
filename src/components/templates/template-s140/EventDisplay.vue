<template>
    <div class="main">
        <div class="eventweek">{{ weekRange }} | Convention Week</div>
        <div class="event-name">{{ eventName }}</div>
        <div class="event-theme">{{ eventTheme }}</div>
    </div>
</template>

<script setup>
    import { useAssembliesStore } from '@/stores/assemblies';
    import { computed } from 'vue';


    const event = useAssembliesStore()
    const weekEvent = event.currentDetail

    const weekRange = computed(() => {
        return weekEvent.week.week
    })

    const eventName = computed(() => {
        return weekEvent.event?.name
    })

    const eventTheme = computed(() => {
        return weekEvent.theme
    })
</script>

<style scoped>
    .main {
        padding: 50px 40px;
        border: 1px solid oldlace;
        margin: 40px 10px;
        border-left: 20px solid oldlace;
    }

    .eventweek {
        font-size: 1.2em;
    }
    .event-name {
        font-size: 1.8em;
        font-weight: 600;
        color: gray;
    }

    .event-theme {
        font-size: 2.3em;
        font-weight: 700;
        color: gray;
    }
</style>