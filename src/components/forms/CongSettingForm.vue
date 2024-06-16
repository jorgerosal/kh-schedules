<template>
    <div class="cong-form-modal" ref="congformModal">
        <div>
            <CongFormInputs :settings="settings" />
        </div>
        <div>
            <COVisitForm />
        </div>
        <div>
            <AssemblyForm />
        </div>
        <div>
            <div class="contact-form">
                <div class="form-subtitle">Help & Questions</div>
                <div>
                    Do you need assistance or have any questions? Are there any features you would like to request?
                </div>
                <a href="https://m.me/312885485248553" target="_blank">
                    <lord-icon src="https://cdn.lordicon.com/ayhtotha.json" trigger="hover" colors="primary:#ffffff">
                    </lord-icon>
                    Chat Developer
                </a>
            </div>
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
        max-height: 600px;
        overflow: auto;
        height: auto;
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

<style scoped>
    .contact-form
    {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    a
    {
        background: #1872aa;
        color: white;
        padding: 8px 20px 8px 18px;
        cursor: pointer;
        transition: ease-in .1s;
        text-decoration: none;
        font-size: small;

        display: inline-flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        max-width: fit-content;
    }

    a:hover
    {
        background: #126599;
    }
</style>