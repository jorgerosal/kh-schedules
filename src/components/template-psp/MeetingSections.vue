<template>
    <div class="parts">
        <div class="col-part part-treasures">
            <MwbGem />
        </div>
        <div class="col-part part-ministry">
            <MwbMinistry />
        </div>
        <div class="col-part part-living">
            <MwbLiving />
        </div>
    </div>
</template>

<script setup>
    import MwbGem from '../icons/MwbGem.vue';
    import MwbLiving from '../icons/MwbLiving.vue';
    import MwbMinistry from '../icons/MwbMinistry.vue';
</script>
