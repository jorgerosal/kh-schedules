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
            <div class="assignee">???</div>
        </span>
    </div>
</template>

<script setup>
    const props = defineProps({
        p: { type: Object }
    })
</script>
