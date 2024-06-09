<template>
    <div id="cong-publishers">
        <div class="wrapper">
            <div class="pubs-header">
                <div>
                    <span class="pubs-title">Congregation Students</span>
                    <span class="pubs-cong">{{ congStore.congName }}</span>
                </div>
                <div class="btns">
                    <button class="btn-md" @click="showPubForm">Add Student</button>
                    <button class="btn-md" @click="backToSched">Go To Schedule</button>
                </div>
            </div>
            <div class="pub-list">
                <template v-for="p in congStore.publishers" :key="p.name">
                    <PublisherListItem :p="p" @click="editPub(p)" />
                </template>

                <template v-if="noStudents">
                    <div class="no-students">
                        <h1>No students were added yet!</h1>
                        <p>Click <b>Add Student</b> to start adding</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import PublisherListItem from '../template-psp/PublisherListItem.vue';
    import { computed } from 'vue';


    const congStore = useCongregationStore()
    const viewStore = useViewStore()
    const noStudents = computed(() => {
        if (!congStore.publishers) return true
        return congStore.publishers.length == 0
    })

    function backToSched() {
        viewStore.publishers = false
    }

    function showPubForm() {
        viewStore.pubFormMode = 'new'
        viewStore.pubForm = true
    }

    function editPub(pub) {
        viewStore.editPublisher = pub
        viewStore.pubFormMode = 'update'
        viewStore.pubForm = true
    }
</script>

<style scoped>
    .wrapper
    {
        display: flex;
        flex-direction: column;
        max-width: 1180px;
        height: 100%;
        padding: 3.8rem;
        margin: auto;
    }

    .pubs-header
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .pubs-title
    {
        display: block;
        font-size: 1.6rem;
        font-weight: 600;
        color: #3DA8EA;
    }

    .pubs-cong
    {
        color: grey;
        font-size: small;
    }

    .pub-list
    {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 75px;
        gap: 10px;
        padding-top: 20px;
    }

    .btns
    {
        display: flex;
        gap: 10px;
    }

    .no-students
    {
        width: 100%;
        padding: 10px;
        grid-column: span 3;
        background: rgba(128, 128, 128, 0.068);
        border-radius: 2px;
    }

    .no-students h1
    {
        font-weight: 600;
        color: #145177;
        font-size: 1.9rem;
    }

    .no-students p
    {
        color: gray;
        font-size: 14px;
    }

</style>
