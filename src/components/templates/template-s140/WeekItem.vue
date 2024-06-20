<template>
    <div class="s140-week">
        <div class="s140-grid-col2">
            <div class="s140-week-title">{{ w.week }} | {{ w.bibleReading }}</div>
        </div>

        <PartItem :part="openingParts" />
        <PartItem :part="introduction" />

        <div>
            <div class="s140-grid-col2">
                <div class="s140-meetingbar part-treasures">{{ gemTitle }}</div>

            </div>
            <div v-for="part in gemsItems" :key="part.id">
                <PartItem :part="part" />
            </div>
            <div class="s140-yspacer"></div>
        </div>

        <div>
            <div class="s140-grid-col2">
                <div class="s140-meetingbar part-ministry">{{ ministryTitle }}</div>
                <div></div>
            </div>
            <div v-for="part in w.parts.ministry" :key="part.id">
                <PartItem :part="part" />
            </div>
            <div class="s140-yspacer"></div>
        </div>

        <div>
            <div class="s140-grid-col2">
                <div class="s140-meetingbar part-living">{{ livingTitle }}</div>
                <div></div>
            </div>

            <!-- BAR RENDERER -->
            <!-- <div class="s140-grid-col2">
                <div class="s140-meetingbar part-living">{{ livingTitle }}</div>
                <div></div>
            </div> -->

            <PartItem :part="midSong" />

            <div v-for="part in livingItems" :key="part.id">
                <PartItem :part="part" />
            </div>

            <PartItem :part="closingParts" />

            <div class="s140-yspacer"></div>
            <div class="s140-yspacer"></div>
            <div class="s140-yspacer"></div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useCongregationStore } from '@/stores/congregation';
    import PartItem from './PartItem.vue';
    import translations from '@/assets/utils/translations';


    const congStore = useCongregationStore()
    const props = defineProps({
        w: { type: Object, },
        i: { type: Number, },
    })

    const gemsItems = computed(() => {
        const gems = [...props.w.parts.gems]
        gems.shift();
        return gems;
    })

    const gemTitle = computed(() => {
        return translations.mwbs140[lang.value].gems
    })

    const ministryTitle = computed(() => {
        return translations.mwbs140[lang.value].ministry
    })

    const livingTitle = computed(() => {
        return translations.mwbs140[lang.value].living
    })

    const livingItems = computed(() => {
        const items = [...props.w.parts.living]
        if (items) {
            const lastPart = items[items.length - 1];
            lastPart.title = lastPart.reference
        }
        return items;
    })

    const introduction = computed(() => {
        const gems = [...props.w.parts.gems]
        const intro = gems.shift();
        intro.title = intro.reference
        intro.label = translations.mwbs140[lang.value].chairman
        return intro
    })

    const song = computed(()=> {
        return translations.mwbs140[lang.value].song
    })

    const lang = computed(()=> {
        return congStore.congregation.lang
    })

    const openingParts = computed(() => {

        const part = {
            id: `${props.w.id}.op`,
            time: 4,
            title: `${song.value} ${props.w.songs[0]}`,
            roles: [
                'elder', 'ms'
            ],
            showNoTime: true,
            label: translations.mwbs140[lang.value].prayer,
        }
        return part
    })

    const midSong = computed(() => {
        const part = {
            id: `${props.w.id}.ms`,
            time: 4,
            title: `${song.value} ${props.w.songs[1]}`,
            roles: [],
            showNoTime: true
        }
        return part
    })

    const closingParts = computed(() => {
        const part = {
            id: `${props.w.id}.cp`,
            time: 4,
            title: `${song.value} ${props.w.songs[2]}`,
            roles: [
                'elder', 'ms'
            ],
            showNoTime: true,
            label: translations.mwbs140[lang.value].prayer,
        }
        return part
    })

    

</script>
