<script setup>
  import MainHeader from '@/components/schedule-template/MainHeader.vue';
  import MeetingSections from '@/components/schedule-template/MeetingSections.vue';
  import ScheduleContainer from '@/components/schedule-template/ScheduleContainer.vue';
  import { onMounted } from 'vue';
  import { useFileStore } from './stores/files';
  import { useCongregationStore } from './stores/congregation';
  import { ref } from 'vue'

  const files = useFileStore()
  const cong = useCongregationStore()
  const enforceBasic = ref(false)

  onMounted(() => {
    files.loadFiles();
    files.setMWBMonth('202406');
    cong.retrieveLocal();

    enforceBasic.value = cong.congName == null
  })
</script>

<template>
  <article v-if="!enforceBasic" >
    <MainHeader />
    <MeetingSections />
    <ScheduleContainer />
  </article>
  <div v-else>
    What congregation are you trying to set up?
  </div>
</template>
