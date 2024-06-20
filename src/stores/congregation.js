import { ref, computed, watch } from 'vue'
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
        { code: "talk", display: "Talks" },
        { code: "demo", display: "Demos" },
        { code: "cbs", display: "CBS Conductor" },
        { code: "rdr", display: "CBS Reader" },
    ])

    const languages = ref([
        { code: 'ceb', support: true, lang: 'Cebuano' },
        { code: 'psp', support: true, lang: 'Filipino Sign Language' },
        { code: 'war', support: true, lang: 'Waray-waray' },
        { code: 'tl', support: true, lang: 'Tagalog' },
    ]);

    const ministryClasses = ref([
        { id: 1, display: "Main Hall Only" },
        // { id: 2, display: "With Auxillary Class" },
    ])

    const supportedLanguages = computed(() => {
        return languages.value.filter(l => l.support)
    })

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

    const getStoredLanguage = computed(() => {
        if (!congregation.value) return null

        const storedLang = congregation.value.lang
        return storedLang ? languages.value.find(l => l.code == storedLang) : null
    })

    const getStoredMinistryClass = computed(() => {
        if (!congregation.value) return null

        const storedClass = congregation.value.class
        return storedClass ? ministryClasses.value.find(c => c.id == storedClass) : null
    })

    async function retrieveLocal() {
        const storedCongInfo = localStorage.getItem(LOCAL_KEY);

        if (storedCongInfo) {
            const parsed = JSON.parse(storedCongInfo)
            congregation.value = parsed

            if (!congregation.value.midweekTime)
                congregation.value.midweekTime = '06:00'
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

    function setLanguage(code) {
        congregation.value['lang'] = code
        storeToLocal()
    }

    function setMinistryClass(code) {
        congregation.value['class'] = code
        storeToLocal()
    }

    function removePublisher(pub) {
        congregation.value.publishers = congregation.value.publishers.filter(f => f.name !== pub.name);
    }

    watch(
        () => congregation.value,
        () => storeToLocal(),
        { deep: true }
    );

    return {
        congregation, congName, setCongName,
        publisherNames, publishers, roles, eldersMs, addPublisher, updatePublisher, removePublisher,
        languages, supportedLanguages, getStoredLanguage, setLanguage,
        ministryClasses, setMinistryClass, getStoredMinistryClass,
        retrieveLocal, storeToLocal,
    }
})