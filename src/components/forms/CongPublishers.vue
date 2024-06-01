<template>
    <div id="cong-publishers">
        <div class="wrapper">
            <div class="pubs-header">
                <div>
                    <span class="pubs-title">Publishers and Students</span>
                    <span class="pubs-cong">{{ congStore.congName }}</span>
                </div>
                <div class="btns">
                    <button class="btn-md" @click="showPubForm">New Person</button>
                    <button class="btn-md" @click="backToSched">Go To Schedule</button>
                </div>
            </div>
            <div class="pub-list">
                <div class="pub-row" v-for="p in congStore.publishers" :key="p.name" @click="editPub(p)" >
                    <div> {{ p.name }} </div>
                    <div> {{ p.roles.join(' ') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';

    const congStore = useCongregationStore()
    const viewStore = useViewStore()

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
        max-width: 1080px;
        height: 100%;
        padding: .8rem;
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
        color: #FEBE10;
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
        grid-auto-rows: 60px;
        gap: 10px;
        padding-top: 20px;
    }

    .pub-row
    {
        cursor: pointer;
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        transition: ease-in-out .2s;
        display: grid;
        grid-template-rows: 1fr 1fr;
    }

    .pub-row:hover
    {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }

    .btns
    {
        display: flex;
        gap: 10px;
    }
</style>
