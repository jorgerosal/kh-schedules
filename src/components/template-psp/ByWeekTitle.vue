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
                <div class="assignee" @click="showSelector">
                    {{ assigneeDisplay }}
                </div>

                <PublisherSelector v-if="selector.show" :part="prayer" @mouseleave="hideSelector" :me="selector"
                    :assignee="assignee" />
            </span>
        </div>
    </div>
</template>

<script setup>
    import IconCalendar from '@/components/icons/IconCalendar.vue';
    import IconBible from '@/components/icons/IconBible.vue';
    import IconMusicNotes from '../icons/IconMusicNotes.vue';
    import IconPraying from '../icons/IconPraying.vue';
    import PublisherSelector from '@/components/template-psp/PublisherSelector.vue'

    import { computed, ref, watch, onMounted } from 'vue';
    import { useFileStore } from '@/stores/files';
    import { useAssignmentsStore } from '@/stores/assignments';

    const selector = ref({
        show: false
    })

    const assignmentStore = useAssignmentsStore();

    const props = defineProps({
        w: { type: Object, }
    })

    const prayer = ref({
        id: null,
        roles: ['elder', 'ms', 'prayer']
    })

    watch(
        () => props.w,
        (newVal) => {
            prayer.value.id = newVal.id
        },
        { deep: true }
    )

    onMounted(() => { 
        prayer.value.id = props.w.id
    })

    const assigneeDisplay = computed(() => {
        const partid = props.w.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned ?? 'Not Assigned!'
    })

    const assignee = computed(() => {
        const partid = props.w.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned
    })

    const fileStore = useFileStore();

    const bg = computed(() => {
        return {
            background: fileStore.selectedMonth.content.theme
        }
    })

    const weekId = computed(() => {
        return props.w.id
    })

    function showSelector() {
        selector.value.show = true
    }

    function hideSelector() {
        selector.value.show = false
    }

</script>
