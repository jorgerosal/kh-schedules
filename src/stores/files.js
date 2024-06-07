import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore('files', () => {
    const month = ref();
    const availableMonths = ref([]);
    const templates = ref([
        { code: 's-140', supported: false, name: "S-140" },
        { code: 'a-100', supported: true, name: "Customized" },
    ]);

    const supportedTemplates = computed(() => {
        return templates.value.filter(t => t.supported)
    })

    async function loadFiles() {
        const jsonFiles = import.meta.glob('@/lib/psp/*.json');
        availableMonths.value = []
        for (const path in jsonFiles) {
            const fileName = path.split('/').pop();
            const content = await jsonFiles[path]();
            if (content.default.publish)
                availableMonths.value.unshift({ name: fileName, content: content.default });
        }
    }

    const selectedMonth = computed(() => {
        const moNum = `${month.value}.json`
        const mo = availableMonths.value.find(f => f.name == moNum)
        return mo ?? {};
    })

    async function setMWBMonth(monthNum) {
        if (!monthNum) {
            month.value = availableMonths.value[0].content.period
        } else {
            month.value = monthNum;
        }
    }

    return {
        availableMonths, selectedMonth,
        setMWBMonth,
        loadFiles, supportedTemplates,
    }
})
