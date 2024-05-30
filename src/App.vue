<script setup>
  import MainHeader from '@/components/schedule-template/MainHeader.vue';
  import MeetingSections from '@/components/schedule-template/MeetingSections.vue';
  import ScheduleContainer from '@/components/schedule-template/ScheduleContainer.vue';
  import { onMounted } from 'vue';
  import { useFileStore } from './stores/files';

  const files = useFileStore()
  onMounted(() => {
    files.loadFiles();
    files.setMWBMonth('202406')
  })
</script>

<template>
  <article>
    <MainHeader />
    <MeetingSections />
    <ScheduleContainer />
  </article>
</template>
