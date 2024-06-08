<template>
    <div class="part-item">
        <span>{{ p.time }}m</span>

        <span v-if="p.thumbnail">
            <div class="part-thumbnail">
                <img :src="p.thumbnail" alt="">
            </div>
        </span>
        <span v-else></span>

        <span>
            <div v-show="p.title" :class="p.class">{{ p.title }}</div>
            <div class="generic-label">{{ p.reference }}</div>
            <div class="assignee" @click="showSelector">
                <div :class="assignClasses">{{ displayAssignee }}</div>
                <PublisherSelector v-if="selector.show" :part="p" @mouseleave="hideSelector" :me="selector" :assignee="partAssignedTo" @hide-me="hideSelector"/>

            </div>
        </span>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { useAssignmentsStore } from '@/stores/assignments';
    import PublisherSelector from '@/components/template-psp/PublisherSelector.vue'

    const props = defineProps({
        p: { type: Object }
    })

    const assignmentStore = useAssignmentsStore();

    const displayAssignee = computed(() => {
        const partid = props.p.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned ?? 'Not Assigned!';
    })

    const partAssignedTo = computed(()=> {
        const partid = props.p.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned
    })

    const assignClasses = computed(() => {
        return [
            'assign-to',
            {
                'faded': displayAssignee.value == 'Not Assigned!'
            }
        ]
    })

    const selector = ref({
        show: false
    })

    function showSelector() {
        selector.value.show = true
    }

    function hideSelector() {
        selector.value.show = false
    }
</script>
