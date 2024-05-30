import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCongregationStore = defineStore('congregation', () => {
    const congregation = ref({
        name: "Sign Language Congregation - Tacloban City",
        publishers: [
            { name: 'Jezreel Tan', roles: ['elder'] },
            { name: 'Alberto Balleres', roles: ['ms'] },
            { name: 'Keno Dagalea', roles: ['elder', 'secretary'] },
            { name: 'Meriam Dy', roles: ['rp'] },
        ],
    });

    const publisherNames = computed(() => {
        const pubs = congregation.value.publishers
        const names = pubs.map(p => p['name']);
        return names.sort();
    });

    const publishers = computed(() => {
        const pubs = congregation.value.publishers.slice();
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

    return { congregation, publisherNames, publishers, eldersMs, }
})