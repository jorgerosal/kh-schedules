<template>
    <div class="event-main">
        <div class="top-bar" :style="barBg"></div>
        <div class="event-holder" :style="bottomBorder">
            <div class="thumbnail">
                <img src="https://cms-imgp.jw-cdn.org/img/p/jwbkm/201504/univ/art/jwbkm_univ_201504_lss_01_lg.jpg"
                    alt="">
            </div>
            <div class="event-details">
                <div class="event-week">{{ weekEvent.week.week }} | Assembly Week </div>
                <div class="event-name">{{ weekEvent.event?.name }}</div>
                <div class="event-theme" :style="color"> {{ weekEvent.theme }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAssembliesStore } from '@/stores/assemblies';
    import { computed } from 'vue';

    const event = useAssembliesStore()
    const weekEvent = event.currentDetail

    const barBg = computed(() => {
        return {
            background: weekEvent.colorTheme
        }
    })

    const bottomBorder = computed(() => {
        return {
            borderBottom: `4px solid ${weekEvent.colorTheme}`
        }
    })

    const color = computed(() => {
        return {
            color: weekEvent.colorTheme
        }
    })
</script>

<style scoped>
    .event-main
    {
        grid-column: span 3;
    }

    .top-bar
    {
        display: flex;
        height: 15px;
    }

    .event-holder
    {
        display: grid;
        grid-template-columns: 200px 1fr;
        align-items: center;
        padding: 35px 25px;
        gap: 20px;
    }

    .thumbnail
    {
        width: 100%;
    }

    .thumbnail img
    {
        width: 100%;
        filter: brightness(110%);

    }

    .event-details
    {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }

    .event-name
    {
        font-size: large;
        font-weight: 600;
        color: rgb(83, 83, 83)
    }

    .event-theme
    {
        font-size: 26px;
        font-weight: 600;
        color: #a66340;
    }
</style>