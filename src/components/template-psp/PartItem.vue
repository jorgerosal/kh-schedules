<template>
    <div class="part-item">
        <span>{{ p.time }}m</span>

        <span v-if="p.thumbnail">
            <div class="part-thumbnail">
                <img :src="thumbnail" alt="">
            </div>
        </span>
        <span v-else></span>

        <span>
            <div v-show="p.title" :class="p.class">{{ p.title }}</div>
            <div class="generic-label">{{ p.reference }}</div>
            <div class="assignee" @click.stop="showSelector">
                <div :class="assignClasses">{{ displayAssignee }}</div>
                <PublisherSelector v-if="selector.show" :part="p" :me="selector" :assignee="partAssignedTo" />
            </div>
        </span>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { useAssignmentsStore } from '@/stores/assignments';
    import PublisherSelector from '@/components/template-psp/PublisherSelector.vue'
    import thumbnails from '@/assets/utils/thumbnails';

    const props = defineProps({
        p: { type: Object }
    })

    const assignmentStore = useAssignmentsStore();

    const displayAssignee = computed(() => {
        if (!props.p.isVisit) {
            const partid = props.p.id
            const assigned = assignmentStore.getAssignments[partid];
            return assigned ?? 'Not Assigned!';
        } else {
            return props.p.co
        }
    })

    const partAssignedTo = computed(() => {
        const partid = props.p.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned
    })

    const assignClasses = computed(() => {
        return [
            'assign-to',
            { 'faded': displayAssignee.value == 'Not Assigned!' }
        ]
    })

    const thumbnail = computed(() => {
        if (!props.p.thumbnail) return null
        const tn = thumbnails[props.p.thumbnail]
        return (tn) ? tn.thumbnail : props.p.thumbnail
    });

    const selector = ref({
        show: false
    })

    function showSelector() {
        selector.value.show = true
    }
</script>
