<template>
    <TemplateView>
        <div id="template-bg">
            <div id="fsl-mwb">
                <article>
                    <MainHeader :modals="modals" />
                    <MeetingSections />
                    <ScheduleContainer />
                </article>
            </div>
        </div>
    </TemplateView>
</template>

<script setup>
    import { ref } from 'vue';
    import MainHeader from '@/components/template-psp/MainHeader.vue';
    import MeetingSections from '@/components/template-psp/MeetingSections.vue';
    import ScheduleContainer from '@/components/template-psp/ScheduleContainer.vue';
    import TemplateView from '@/components/layouts/TemplateView.vue'

    const modals = ref({
        show: false
    })
</script>