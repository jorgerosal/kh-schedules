<template>
    <div class="cong-form-modal" ref="congformModal">
        <div>
            <CongFormInputs />
        </div>
        <div>
            <COVisitForm />
        </div>
        <div>
            <AssemblyForm />
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useFileStore } from '@/stores/files';
    import CongFormInputs from '../forms/CongFormInputs.vue';
    import COVisitForm from '../forms/COVisitForm.vue';
    import AssemblyForm from '../forms/AssemblyForm.vue';

    const emits = defineEmits(['hideMe']);
    const file = useFileStore();
    const congformModal = ref(null);

    function hideCongSettings() {
        emits('hideMe')
    }

    const handleOutsideCongform = (event) => {
        if (congformModal.value && !congformModal.value.contains(event.target)) {
            hideCongSettings();
            const period = file.selectedMonth.content.period
            file.setMWBMonth(period);
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleOutsideCongform);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleOutsideCongform);
    });
</script>

<style scoped>
    .cong-form-modal
    {

        position: absolute;
        width: 550px;
        top: calc(100% + 20px);
        right: calc(100% - 30px);
        min-height: 400px;
        max-height: 600px;
        overflow: auto;
        height: auto;
        padding: 40px;
        background: white;

        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
</style>