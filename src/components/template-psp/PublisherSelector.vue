<template>
    <div id="assignee-selector" ref="modalSelector">
        <div class="wrapper">
            <div class="head-title">
                Select Students
            </div>
            <div class="list">
                <div class="publisher-option" @click.stop="assignPart(p)" v-for="p in feedOptions" :key="p.name">
                    <span class="pubname">{{ p.name }}</span>
                    <span v-show="isDemo" class="demo-assignment">{{ demoAssignment(p) }}</span>
                    <span v-show="isPrayer" class="demo-assignment">{{ prayerAssignment(p) }}</span>
                </div>

                <div v-show="noPublishers" class="no-pubs">
                    <span>No students added yet that can be assigned to this part!</span>
                    <button @click="viewPublisherList">Set Up Students</button>
                </div>

                <div v-show="!noPublishers" class="cntrls">
                    <button class="btn-sm" @click.prevent="openPubForm">Add Student</button>
                    <button class="btn-sm" @click.prevent="showPubList">Manage Students</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAssignmentsStore } from '@/stores/assignments';
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { computed, ref, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        part: Object,
        me: Object,
        assignee: String,
    })

    const DEMO_ASSIGN_SEPARATOR = ' & '
    const congStore = useCongregationStore()
    const viewStore = useViewStore()
    const assignmentStore = useAssignmentsStore()

    const modalSelector = ref(null)

    const handleOutsideModalClick = (event) => {
        if (modalSelector.value && !modalSelector.value.contains(event.target)) {
            props.me.show = false
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleOutsideModalClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleOutsideModalClick);
    });

    const student = ref(null);
    const assistant = ref(null);

    const prayer = ref({
        opening: null,
        closing: null,
    });

    const feedOptions = computed(() => {
        if (!props.part.roles) return congStore.publishers

        return congStore.publishers.filter(publisher =>
            publisher.roles.some(role => props.part.roles.includes(role))
        )
    })

    const isDemo = computed(() => {
        if (!props.part.roles) return false
        return props.part.roles.includes("demo")
    })

    const isPrayer = computed(() => {
        if (!props.part.roles) return false
        return props.part.roles.includes("prayer")
    })

    const noPublishers = computed(() => {
        return feedOptions.value.length == 0
    })

    onMounted(() => {
        if (isDemo.value && props.assignee) {
            const students = props.assignee.split(DEMO_ASSIGN_SEPARATOR);
            student.value = students[0]
            assistant.value = students[1]
        }

        if (isPrayer.value && props.assignee) {
            const students = props.assignee.split(DEMO_ASSIGN_SEPARATOR);
            prayer.value.opening = students[0]
            prayer.value.closing = students[1]
        }

    })

    function viewPublisherList() {
        viewStore.publishers = true
    }

    function assignPart(pub) {
        if (!isDemo.value && !isPrayer.value) {
            assignmentStore.setAssignment(props.part.id, pub.name)
            
            // check if there are autofills
            if (props.part.autofills) {
                const autofills = props.part.autofills
                autofills.forEach(fill => {
                    assignmentStore.setAssignment(fill, pub.name);
                });
            }

            props.me.show = false
        } else if (isDemo.value) {
            handleDemoSelections(pub)
        } else if (isPrayer.value) {
            handlePrayerSelections(pub)
        }
    }

    function handleDemoSelections(pub) {
        let hasAssigned = false
        if (!student.value && assistant.value != pub.name) {
            if (assistant.value == pub.name)
                assistant.value = null
            student.value = pub.name
            hasAssigned = true
        } else if (student.value == pub.name) {
            student.value = null
        }

        if (!assistant.value && !hasAssigned) {
            if (student.value == pub.name)
                student.value = null

            assistant.value = pub.name
        } else if (assistant.value == pub.name) {
            assistant.value = null
        }

        if (student.value && assistant.value) {
            const combined = []
            combined.push(student.value ?? '')
            combined.push(assistant.value ?? '')
            assignmentStore.setAssignment(props.part.id, combined.join(DEMO_ASSIGN_SEPARATOR))
        } else if ((!student.value && !assistant.value)) {
            assignmentStore.setAssignment(props.part.id, null)
        }
    }

    function handlePrayerSelections(pub) {
        let hasAssigned = false
        if (!prayer.value.opening && prayer.value.closing != pub.name) {
            if (prayer.value.closing == pub.name)
                prayer.value.closing = null
            prayer.value.opening = pub.name
            hasAssigned = true
        } else if (prayer.value.opening == pub.name) {
            prayer.value.opening = null
        }

        if (!prayer.value.closing && !hasAssigned) {
            if (prayer.value.opening == pub.name)
                prayer.value.opening = null

            prayer.value.closing = pub.name
        } else if (prayer.value.closing == pub.name) {
            prayer.value.closing = null
        }

        if (prayer.value.opening && prayer.value.closing) {
            const combined = []
            combined.push(prayer.value.opening)
            combined.push(prayer.value.closing)
            console.log(props.part.id);
            assignmentStore.setAssignment(props.part.id, combined.join(DEMO_ASSIGN_SEPARATOR))
        } else if ((!prayer.value.opening && !prayer.value.closing)) {
            assignmentStore.setAssignment(props.part.id, null)
        }
    }

    function demoAssignment(pub) {
        if (student.value == pub.name) return "Student"
        if (assistant.value == pub.name) return "Assistant"
        return null
    }


    function prayerAssignment(pub) {
        if (prayer.value.opening == pub.name) return "Opening"
        if (prayer.value.closing == pub.name) return "Closing"
        return null
    }

    function openPubForm() {
        viewStore.pubFormMode = "new"
        viewStore.pubForm = true
        props.me.show = false
    }

    function showPubList() {
        viewStore.publishers = true
        props.me.show = false
    }

</script>

<style scoped>
    .wrapper
    {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 10px;
        position: relative;
    }

    .head-title
    {
        font-weight: 600;
        color: gray;
        width: 100%;
        padding: 4px;
        box-shadow: 0 3px 2px -2px gray;
    }

    .controls
    {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    input
    {
        width: 100%;
        border: none;
        border-bottom: 1px solid grey;
        padding: 4px;
        outline: none;
    }

    .list
    {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto
    }

    .publisher-option
    {
        cursor: pointer;
        padding: 5px 8px;
        display: flex;
        gap: 5px;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }

    .publisher-option:not(:first-child)
    {
        border-top: 1px dotted #3da8ea5e;
    }

    .pubname
    {
        color: grey;
        font-size: 14px !important;
    }

    .pubname:hover
    {
        color: #3DA8EA;
        font-weight: 600
    }

    .no-pubs
    {
        font-size: 15px;
        padding: 5px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .no-pubs span
    {
        text-align: left
    }

    .no-pubs button
    {
        cursor: pointer;
        border-radius: 5px;
        font-size: small;
        padding: 5px 25px;
        background: #3DA8EA;
        color: white;
        border: none;
        transition: ease-in-out .2s;
    }

    .no-pubs button:hover
    {
        background: #3DA8EA;
    }

    .cntrls
    {
        display: flex;
        gap: 4px;
        padding: 8px;
    }

    .demo-assignment
    {
        font-size: 10px;
        color: #3DA8EA;
        padding: 0 4px;
        border-radius: 3px;
    }
</style>