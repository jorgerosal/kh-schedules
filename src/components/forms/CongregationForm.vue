<template>
    <div id="cong-form">
        <div class="wrapper">
            <div class="h2">
                Welcome to OCLM Scheduler!
            </div>
            <div class="h1">
                What congregation are you from?
            </div>
            <div>
                <input type="text" placeholder="e.g. Sign Language Congregation - Tacloban City" v-model="cong">
            </div>
            <div>
                <button @click="assignCongName">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { ref } from 'vue';

    const viewStore = useViewStore()

    const congStore = useCongregationStore()
    const cong = ref(null)

    function assignCongName() {
        congStore.setCongName(cong.value);
        congStore.storeToLocal();
        viewStore.congregationForm = false
    }
</script>
