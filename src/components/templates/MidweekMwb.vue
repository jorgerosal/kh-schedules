<template>
    <TemplateView>
        <div id="template-bg">
            <div id="fsl-mwb">
                <article v-if="isCustomize">
                    <MainHeader :modals="modals.show" />
                    <MeetingSections />
                    <ScheduleContainer />
                </article>
            </div>
        </div>
    </TemplateView>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { useFileStore } from '@/stores/files';
    import MainHeader from '@/components/templates/template-psp/MainHeader.vue';
    import MeetingSections from '@/components/templates/template-psp/MeetingSections.vue';
    import ScheduleContainer from '@/components/templates/template-psp/ScheduleContainer.vue';
    import TemplateView from '@/components/layouts/TemplateView.vue'

    const file = useFileStore()
    const modals = ref({
        show: false
    })


    const isCustomize = computed(() => {
        return file.template === 'a-100'
    })
</script>