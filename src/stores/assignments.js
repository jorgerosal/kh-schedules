import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAssignmentsStore = defineStore('assignments', () => {

    const LOCAL_KEY = 'assignments'
    const assignments = ref({});

    const getAssignments = computed(() => {
        return assignments.value
    });

    async function retrieveLocal() {
        const storedAssignments = localStorage.getItem(LOCAL_KEY);

        if (storedAssignments && storedAssignments != 'null') {
            const parsed = JSON.parse(storedAssignments)
            assignments.value = parsed
        } else {
            assignments.value = {}
            storeToLocal()
        }
    }

    function storeToLocal() {
        const storable = JSON.stringify(assignments.value)
        localStorage.setItem(LOCAL_KEY, storable)
    }

    function setAssignment(partid, students) {
        assignments.value[partid] = students;
        storeToLocal();
    }

    return { retrieveLocal, getAssignments, storeToLocal, setAssignment }
})