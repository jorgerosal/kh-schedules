<script setup>
  import MidweekFSL from '@/components/templates/MidweekFSL.vue';
  import CongregationForm from '@/components/forms/CongregationForm.vue';
  import CongPublishers from './components/forms/CongPublishers.vue';
  import PublisherForm from './components/forms/PublisherForm.vue';

  import { onMounted } from 'vue';
  import { useFileStore } from './stores/files';
  import { useCongregationStore } from './stores/congregation';
  import { useAssignmentsStore } from './stores/assignments';
  import { useViewStore } from './stores/views';


  const viewStore = useViewStore()

  const files = useFileStore()
  const cong = useCongregationStore()


  const assignments = useAssignmentsStore()


  onMounted(async () => {
    await files.loadFiles();
    files.setMWBMonth();
    cong.retrieveLocal();
    assignments.retrieveLocal();
    viewStore.congregationForm = cong.congName == null || typeof cong.congName == 'undefined'
  })
</script>

<template>
  <!-- Modal -->
  <PublisherForm v-if="viewStore.pubForm" />

  <!-- Modal -->
  <template v-if="viewStore.congregationForm">
    <CongregationForm />
  </template>

  <!-- Modal -->
  <template v-else-if="viewStore.publishers">
    <CongPublishers />
  </template>

  <!-- MWB FSL -->
  <template v-else>
    <MidweekFSL />
  </template>

</template>
