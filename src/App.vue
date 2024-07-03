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
  <template v-else-if="viewStore.initialStorageCheck">
    <MidweekMwb />
  </template>

  <SmallScreen />
</template>

<script setup>
  import MidweekMwb from '@/components/templates/MidweekMwb.vue';
  import CongregationForm from '@/components/forms/CongregationForm.vue';
  import CongPublishers from './components/forms/CongPublishers.vue';
  import PublisherForm from './components/forms/PublisherForm.vue';
  import SmallScreen from './components/layouts/SmallScreen.vue';

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
    await cong.retrieveLocal();
    await files.loadFiles();
    files.setMWBMonth();
    assignments.retrieveLocal();
    viewStore.congregationForm = cong.congName == null || typeof cong.congName == 'undefined'

    if (!viewStore.congregationForm) viewStore.initialStorageCheck = true
  })
</script>
