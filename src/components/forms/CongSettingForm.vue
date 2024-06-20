<template>
    <div class="cong-form-modal" ref="congformModal">
        <div>
            <CongFormInputs :settings="settings" />
        </div>
        <div>
            <MwbTempSelector />
        </div>
        <div>
            <COVisitForm />
        </div>
        <div>
            <AssemblyForm />
        </div>
        <div>
            <BackUp />
        </div>
        <div>
            <DevContact />
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useFileStore } from '@/stores/files';
    import CongFormInputs from '../forms/CongFormInputs.vue';
    import COVisitForm from '../forms/COVisitForm.vue';
    import AssemblyForm from '../forms/AssemblyForm.vue';
    import DevContact from '../forms/DevContact.vue';
    import BackUp from '../forms/BackUp.vue';
    import MwbTempSelector from './MwbTempSelector.vue';

    const emits = defineEmits(['hideMe']);
    const file = useFileStore();
    const congformModal = ref(null);

    const settings = ref({
        showLabels: true,
        PhCong: "",
        PhLanguage: "",
        PhClasses: "",
        showConfirm: false,
        showSubtitle: true
    })

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
        max-height: 90vh;
        height: max-content;
        overflow: auto;
        padding: 40px;
        background: white;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        color: grey;
    }
</style>

<style>
    .form-subtitle
    {
        font-size: small;
        text-transform: uppercase;
        color: #3DA8EA;
        font-weight: 500;

    }

</style>
