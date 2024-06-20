<template>
    <TemplateView>
        <div id="template-bg">
            <div id="fsl-mwb">
                <article id="art-temp-psp" v-if="isCustomize">
                    <CustomizedTemplate />
                </article>
                <article v-if="isS140">
                    <SimpleTemplate />
                </article>
            </div>
        </div>
    </TemplateView>
</template>

<script setup>
    import { computed, onMounted } from 'vue';
    import { useFileStore } from '@/stores/files';
    import TemplateView from '@/components/layouts/TemplateView.vue'
    import CustomizedTemplate from '@/components/templates/template-psp/_Customized.vue';
    import SimpleTemplate from '@/components/templates/template-s140/_MainTemplate.vue';

    const file = useFileStore()

    const isCustomize = computed(() => {
        return file.template === 'a-100'
    })

    const isS140 = computed(() => {
        return file.template === 's-140'
    })

    onMounted(async () => {
        await file.retrieveLocal();
    })

</script>