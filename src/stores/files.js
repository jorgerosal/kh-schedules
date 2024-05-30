import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore('files', () => {
    const month = ref();
    const availableMonths = ref([])

    async function loadFiles() {
        const jsonFiles = import.meta.glob('@/lib/mwb-scheds/*.json');
        availableMonths.value = []
        for (const path in jsonFiles) {
            const fileName = path.split('/').pop();
            const content = await jsonFiles[path]();
            availableMonths.value.push({ name: fileName, content: content.default });
        }
    }

    const selectedMonth = computed(() => {
        const moNum = `${month.value}.json` 
        const mo = availableMonths.value.find(f=> f.name == moNum)
        return mo ?? {};
    })

    function setMWBMonth(monthNum) {
        month.value = monthNum;
    }

    return { availableMonths, selectedMonth, setMWBMonth, loadFiles }
})