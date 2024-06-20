import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFileStore } from './files'

export const useAssembliesStore = defineStore('assemblies', () => {

    const STORAGE_KEY = 'khms-events'
    const STORAGE_DETAILS_KEY = 'khms-events-details'
    const eventCode = ref(null)
    const assemblies = ref([])
    const details = ref({})
    const currentMonth = ref(null)
    const fileStore = useFileStore()

    const options = ref(
        [
            { code: 'rc', name: "Regional Convention" },
            { code: 'cabr', name: "Circuit Assembly with Brach Representative" },
            { code: 'caco', name: "Circuit Assembly with Circuit Overseer" },
        ]
    )

    const hasMonthAssembly = computed(() => {
        return assemblies.value.includes(currentMonth.value) ? 'Y' : 'N'
    })

    const model = {
        code: "",
        weekId: "",
        theme: "",
    }

    const currentDetail = computed(() => {
        const basic = details.value[currentMonth.value]
        const event = options.value.find(o => o.code == basic.code)
        const week = fileStore.selectedMonth.content.weeks.find(w => w.id == basic.weekId)
        const colorTheme = fileStore.selectedMonth.content.theme
        return {
            theme: basic.theme,
            event,
            week,
            colorTheme,
        }
    })

    async function retrieveLocal() {
        const storedAssemblies = localStorage.getItem(STORAGE_KEY);
        const storedDetails = localStorage.getItem(STORAGE_DETAILS_KEY);

        if (storedAssemblies)
            assemblies.value = JSON.parse(storedAssemblies) ?? []

        if (storedDetails)
            details.value = JSON.parse(storedDetails) ?? {}
    }

    function storeToLocal() {
        const storable = JSON.stringify(assemblies.value)
        const storeDetails = JSON.stringify(details.value)
        localStorage.setItem(STORAGE_KEY, storable)
        localStorage.setItem(STORAGE_DETAILS_KEY, storeDetails)
    }


    function setEvent(isAddEvent = true) {
        if (isAddEvent) {
            const exist = assemblies.value.includes(currentMonth.value)
            if (!exist) assemblies.value.push(currentMonth.value)

            // adding event detail prop with month id
            details.value[currentMonth.value] = { ...model }
        } else {
            assemblies.value = assemblies.value.filter(v => v != currentMonth.value)
            delete details.value[currentMonth.value]
        }
        storeToLocal()
    }

    watch(
        () => details.value,
        () => {
            storeToLocal();
        },
        { deep: true }
    )

    return {
        eventCode, options, model,
        retrieveLocal, storeToLocal, currentMonth,
        setEvent, hasMonthAssembly, details, currentDetail
    }
})