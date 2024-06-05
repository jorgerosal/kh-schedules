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
            <div class="details-title" :style="bg">Our Christian Life and Ministry Meeting Schedule</div>
            <div class="details-month" v-if="true" >
                <div id="active-month" @click="showMonthSelector">{{ file.selectedMonth.content?.display }}</div>

                <div id="month-selector-form" v-if="viewMonthSelector" :class="{ show: viewMonthSelector }"
                    @mouseleave="viewMonthSelector = false">
                    <div class="month-selector-title">SELECT MONTH</div>
                    <div class="select-options">
                        <div class="select-option" v-for="f in file.availableMonths" @click.stop="loadMonth(f)">
                            {{ f.content.display }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation'
    import { useFileStore } from '@/stores/files';
    import { computed, ref } from 'vue';

    const props = defineProps({
        modals: Object
    });

    const viewMonthSelector = ref(false)

    const congregation = useCongregationStore()
    const file = useFileStore()

    const bg = computed(() => {
        if (!file.selectedMonth.content) return null

        return {
            color: file.selectedMonth.content.theme
        }
    })

    function showMonthSelector() {
        props.modals.show = true
        viewMonthSelector.value = true
    }

    function loadMonth(selection) {
        const period = selection.content.period
        file.setMWBMonth(period)
        viewMonthSelector.value = false
    }

    function updateCongName(event) {
        congregation.setCongName(event.target.value);
    }
</script>
