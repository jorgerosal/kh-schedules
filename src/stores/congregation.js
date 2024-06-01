import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCongregationStore = defineStore('congregation', () => {

    const LOCAL_KEY = "congregation"
    const congregation = ref({});

    const congName = computed(() => {
        return congregation.value?.name ?? null
    })

    const roles = ref([
        { code: "elder", display: "Elder" },
        { code: "ms", display: "MS" },
        { code: "cobe", display: "Coordinator" },
        { code: "so", display: "Service Overseer" },
        { code: "sec", display: "Secretary" },
        { code: "br", display: "Bible Reading" },
        { code: "talk", display: "Talk Assignments" },
        { code: "demo", display: "Demonstrations" },
    ])

    const publisherNames = computed(() => {
        const pubs = congregation.value?.publishers ?? []
        const names = pubs.map(p => p['name']);
        return names.sort();
    });

    const publishers = computed(() => {
        const pubs = congregation.value?.publishers ?? [].slice();
        const sorted = pubs.sort((p1, p2) => {
            const name1 = p1['name']
            const name2 = p2['name']

            return name1.localeCompare(name2)
        })
        return sorted;
    });

    const eldersMs = computed(() => {
        const pubs = publishers.value
        return pubs.filter(p => p.roles && (p.roles.includes('elder') || p.roles.includes('ms')));
    })

    async function retrieveLocal() {
        const storedCongInfo = localStorage.getItem(LOCAL_KEY);

        if (storedCongInfo) {
            const parsed = JSON.parse(storedCongInfo)
            congregation.value = parsed
        }
    }

    function storeToLocal() {
        const storable = JSON.stringify(congregation.value)
        localStorage.setItem(LOCAL_KEY, storable)
    }

    function setCongName(name) {
        congregation.value['name'] = name 
    }

    function addPublisher(pub) {
        const pubs = congregation.value.publishers

        if (!pubs) congregation.value.publishers = []
        congregation.value.publishers.push(pub)

        storeToLocal();
    }

    function updatePublisher(pub) {
        const pubs = congregation.value.publishers
        const target = pubs.find(p => p.name == pub.name)
        
        if (target) {
            target.name = pub.name;
            target.roles = pub.roles;
        } else {
            congregation.value.publishers.push(pub)
        }

        storeToLocal();
    }

    function removePublisher(pub) {
        congregation.value.publishers = congregation.value.publishers.filter(f => f.name !== pub.name);
    }
    
    return { congregation, congName, setCongName, publisherNames, publishers, roles, eldersMs, retrieveLocal, storeToLocal, addPublisher, updatePublisher, removePublisher }
})