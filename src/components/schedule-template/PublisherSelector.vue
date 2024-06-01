<template>
    <div id="assignee-selector">
        <div class="wrapper">
            <!-- <div v-show="!noPublishers" class="controls">
                <input type="search" name="" id="" placeholder="Find participant">
            </div> -->
            <div class="list">
                <div class="publisher-option" @click.stop="assignPart(p)" v-for="p in feedOptions" :key="p.name">
                    <span class="pubname">{{ p.name }}</span>
                    <span></span>
                </div>
                <div v-show="noPublishers" class="no-pubs">
                    <span>No publishers or students added yet!</span>
                    <button @click="viewPublisherList">Set Up</button>
                </div>

                <div class="cntrls">
                    <button class="btn-sm" @click.prevent="openPubForm">Add Publisher</button>
                    <button class="btn-sm" @click.prevent="showPubList">See Publishers</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAssignmentsStore } from '@/stores/assignments';
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { computed } from 'vue';

    const congStore = useCongregationStore()
    const viewStore = useViewStore()
    const assignmentStore = useAssignmentsStore()

    const props = defineProps({
        part: Object,
        me: Object
    })

    const feedOptions = computed(() => {
        if (!props.part.roles) return congStore.publishers

        return congStore.publishers.filter(publisher =>
            publisher.roles.some(role => props.part.roles.includes(role))
        )
    })

    const noPublishers = computed(() => {
        return congStore.publishers.length == 0
    })

    function viewPublisherList() {
        viewStore.publishers = true
    }

    function assignPart(pub) {
        assignmentStore.setAssignment(props.part.id, pub.name)
        props.me.show = false
    }

    function openPubForm() {
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
        display: grid;
        gap: 5px;
        grid-template-columns: 1fr 20px;
    }

    .pubname
    {
        font-size: 14px !important;
    }

    .pubname:hover
    {
        color: #FEBE10;
        font-weight: 600
    }

    .no-pubs
    {
        font-size: 15px;
        padding: 5px;
        flex: 1;
        align-self: center;
        align-items: center;
        justify-items: center;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .no-pubs span
    {
        text-align: center
    }

    .no-pubs button
    {
        cursor: pointer;
        border-radius: 5px;
        font-size: small;
        padding: 5px 25px;
        background: orange;
        color: white;
        border: none;
        transition: ease-in-out .2s;
    }

    .no-pubs button:hover
    {
        background: rgb(221, 144, 0);
    }

    .cntrls
    {
        display: flex;
        gap: 4px;
        padding: 8px;
    }
</style>