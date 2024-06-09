<template>
    <div class="header">
        <div class="mwb-thumbnail">
            <img :src="file.selectedMonth?.content?.thumbnail" alt="">
        </div>
        <div class="details">
            <div class="detail-congname">
                <input type="text" placeholder="Provide your congregation here! " :value="congregation.congName"
                    @input="updateCongName">
            </div>
            <div class="details-title" :style="bg">{{ file.selectedMonth.content?.title }}</div>
            <div class="details-month" v-if="true">
                <div id="active-month">{{ file.selectedMonth.content?.display }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation'
    import { useFileStore } from '@/stores/files';
    import { computed } from 'vue';

    const congregation = useCongregationStore()
    const file = useFileStore()

    const bg = computed(() => {
        if (!file.selectedMonth.content) return null

        return {
            color: file.selectedMonth.content.theme
        }
    })

    function updateCongName(event) {
        congregation.setCongName(event.target.value);
    }
</script>
