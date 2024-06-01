import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useViewStore = defineStore('views', () => {
    const publishers = ref(false);
    const congregationForm = ref(false);
    const pubForm = ref(false)
    const editPublisher = ref({})
    const pubFormMode = ref('new')

    return { publishers, congregationForm, pubForm, pubFormMode, editPublisher }
})