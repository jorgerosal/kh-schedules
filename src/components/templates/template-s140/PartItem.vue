<template>
    <div class="s140-grid-col2 s140-part-item">
        <div class="s140-grid-titles">
            <span v-show="part.time" class="s140-runtime">0:00</span>
            <span v-show="part.time">{{ part.title }} {{ timeLimit }}</span>
        </div>
        <div class="assignee" v-show="canSelectPerson" @click.stop="showSelector">
            <div :class="assignClasses">
                <span class="s140-part-label" v-show="part.label">{{ part.label }}:</span>
                {{ displayAssignee }}
            </div>
            <PublisherSelector v-if="selector.show" :part="part" :me="selector" :assignee="partAssignedTo" />
        </div>
    </div>
</template>

<script setup>
    import { useAssignmentsStore } from '@/stores/assignments';
    import { computed, onMounted, ref, watch } from 'vue';
    import PublisherSelector from '../template-psp/PublisherSelector.vue';
    import translations from '@/assets/utils/translations';
    import { useCongregationStore } from '@/stores/congregation';


    const assignmentStore = useAssignmentsStore();
    const congStore = useCongregationStore();

    const props = defineProps({
        part: Object
    })

    const selector = ref({
        show: false
    })

    const displayAssignee = computed(() => {
        if (!props.part.isVisit) {
            const partid = props.part.id
            const assigned = assignmentStore.getAssignments[partid];
            return assigned ?? 'Not Assigned!';
        } else {
            return props.part.co
        }
    })

    const canSelectPerson = computed(() => {
        return props.part.roles.length > 0
    })

    const assignClasses = computed(() => {
        return [
            's140-person', 'relative',
            { 'faded': displayAssignee.value == 'Not Assigned!' }
        ]
    })

    const timeLimit = computed(() => {
        if (!props.part.time) return null
        if (props.part.showNoTime) return null
        return `(${props.part.time} min.)`
    })

    const partAssignedTo = computed(() => {
        const partid = props.part.id
        const assigned = assignmentStore.getAssignments[partid];
        return assigned
    })

    const lang = computed(() => {
        return congStore.congregation.lang
    })

    function showSelector() {
        selector.value.show = true
    }

    function assignLabels() {
        if (props.part.roles.includes('demo')) {
            props.part.label = translations.mwbs140[lang.value].demo
        }

        if (props.part.roles.includes('talk')) {
            props.part.label = translations.mwbs140[lang.value].student
        }

        if (props.part.roles.includes('br')) {
            props.part.label = translations.mwbs140[lang.value].student
        }
    }

    onMounted(() => {
        assignLabels()
    })

    watch(
        () => props.part,
        () => assignLabels(),
        { deep: true }
    )
</script>
