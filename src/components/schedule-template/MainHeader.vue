<template>
    <div class="header">
        <div class="mwb-thumbnail">
            <img src="https://assetsnffrgf-a.akamaihd.net/assets/m/mwb/univ/202405/art/mwb_univ_202405_lg.jpg" alt="">
        </div>
        <div class="details">
            <div> {{ schedule.congregation.name }}</div>
            <div class="details-title">Our Christian Life and Ministry Meeting Schedule</div>
            <div class="details-month">June 2024</div>
        </div>
    </div>
</template>

<script setup>
    import { useScheduleStore } from '@/stores/schedule'
    const schedule = useScheduleStore()

</script>
