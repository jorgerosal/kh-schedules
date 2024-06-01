<template>
    <div class="part-item">
        <span>{{ p.time }}m</span>

        <span v-if="p.thumbnail">
            <div class="part-thumbnail">
                <img :src="p.thumbnail" alt="">
            </div>
        </span>
        <span v-else></span>
        <!-- <span v-else class="generic-label">{{ p.reference }}</span> -->

        <span>
            <div v-show="p.title" :class="p.class">{{ p.title }}</div>
            <div class="generic-label">{{ p.reference }}</div>
            <div class="assignee" @click="showSelector">
                <div class="assign-to">{{ displayAssignee }}</div>
                <PublisherSelector v-if="selector.show" :part="p" @mouseleave="hideSelector" :me="selector" />
            </div>
        </span>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import PublisherSelector from '@/components/schedule-template/PublisherSelector.vue'
    import { useAssignmentsStore } from '@/stores/assignments';

    const props = defineProps({
        p: { type: Object }
    })

    const assignmentStore = useAssignmentsStore();

    const displayAssignee = computed(() => {
        const partid = props.p.id        
        const assigned = assignmentStore.getAssignments[partid];
        return assigned ?? 'Not Assigned!';
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
