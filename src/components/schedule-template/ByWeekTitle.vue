<template>
    <div class="title" :style="bg">
        <div class="week-sched">
            <span class="icon">
                <IconCalendar />
            </span>
            <span class="week-date">
                {{ w.week }}
            </span>
        </div>
        <div class="week-sched">
            <span class="icon">
                <IconBible />
            </span>
            <span>
                {{ w.bibleReading }}
            </span>
        </div>
        <div class="week-sched">
            <span class="icon">
                <IconMusicNotes />
            </span>
            <span>
                {{ w.songs.join(', ') }}
            </span>
        </div>
        <div class="week-sched">
            <span class="icon">
                <IconPraying />
            </span>
            <span>
                #Prayer Assignments
            </span>
        </div>
    </div>
</template>

<script setup>
    import IconCalendar from '@/components/icons/IconCalendar.vue';
    import IconBible from '@/components/icons/IconBible.vue';
    import IconMusicNotes from '../icons/IconMusicNotes.vue';
    import IconPraying from '../icons/IconPraying.vue';
    import { computed } from 'vue';
    import { useFileStore } from '@/stores/files';
    

    const props = defineProps({
        w: { type: Object, }
    })

    const fileStore = useFileStore();

    const bg = computed(() => {
        return {
            background: fileStore.selectedMonth.content.theme
        }
    })

</script>
