import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCoVisitStore = defineStore('visits', () => {
    const visitDetails = ref({})
    const visits = ref([])
    const currentMonth = ref(null)
    const VISITS_STORAGE_KEY = 'khms-co-visits'
    const VISITS_DETAILS_KEY = 'khms-co-visits-details'

    const hasMonthVisit = computed(() => {
        return visits.value.includes(currentMonth.value) ? 'Y' : 'N'
    })

    function storeToLocal() {
        const storable = JSON.stringify(visits.value)
        const details = JSON.stringify(visitDetails.value)
        localStorage.setItem(VISITS_STORAGE_KEY, storable ?? [])
        localStorage.setItem(VISITS_DETAILS_KEY, details ?? {})
    }

    async function retrieveLocal() {
        const storeVisits = localStorage.getItem(VISITS_STORAGE_KEY)
        const storeVisitDetails = localStorage.getItem(VISITS_DETAILS_KEY)

        if (storeVisits) visits.value = JSON.parse(storeVisits) ?? []
        if (storeVisitDetails) visitDetails.value = JSON.parse(storeVisitDetails) ?? {}
    }

    function setVisit(isToAdd = true) {
        if (isToAdd) {
            const exist = visits.value.includes(currentMonth.value)
            if (!exist) visits.value.push(currentMonth.value)

            // adding a visit detail prop with month id
            visitDetails.value[currentMonth.value] = {
                weekId: null,
                talk: null,
                sjj: null,
                co: null,
            }

        } else {
            visits.value = visits.value.filter(v => v != currentMonth.value)
            delete visitDetails.value[currentMonth.value]
        }
        storeToLocal();
    }

    function saveChanges() {
        storeToLocal();
    }

    watch(
        () => visitDetails.value,
        async () => {
            storeToLocal();
        },
        { deep: true }
    )

    return {
        saveChanges, retrieveLocal,
        currentMonth,
        setVisit, hasMonthVisit,
        visitDetails
    }
})