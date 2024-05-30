<template>
    <div class="header">
        <div class="mwb-thumbnail">
            <img src="https://assetsnffrgf-a.akamaihd.net/assets/m/mwb/univ/202405/art/mwb_univ_202405_lg.jpg" alt="">
        </div>
        <div class="details">
            <div> {{ congregation.congregation.name }}</div>
            <div class="details-title">Our Christian Life and Ministry Meeting Schedule</div>
            <div class="details-month" v-if="true">{{ file.selectedMonth.content?.display }}</div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation'
    import { useFileStore } from '@/stores/files';

    const congregation = useCongregationStore()
    const file = useFileStore()
</script>
