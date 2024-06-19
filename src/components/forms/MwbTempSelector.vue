<template>
    <div id="sett-prefs">
        <div class="form-subtitle">PREFERENCES</div>
        <CustomSelect :items="files.supportedTemplates" label="Template" placeholder="Select Template" v-model="files.template" id="code" />
    </div>
</template>

<script setup>
    import CustomSelect from '@/components/reusables/CustomSelect.vue';
    import { useFileStore } from '@/stores/files';

    const files = useFileStore()


</script>

<style scoped>
    #sett-prefs
    {
        margin: 20px 0 0px;
        display: flex;
        flex-direction: column;
        gap: 10px
    }

</style>