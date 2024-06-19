import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCongregationStore } from './congregation';
import { useCoVisitStore } from './covisits';
import { useAssembliesStore } from './assemblies';
import { cloneDeep } from 'lodash';

export const useFileStore = defineStore('files', () => {
    const loadedMonth = ref({});
    const availableMonths = ref([]);
    const template = ref('a-100')

    const templates = ref([
        { code: 's-140', supported: true, name: "S-140 Template" },
        { code: 'a-100', supported: true, name: "Customized Template" },
    ]);

    const supportedTemplates = computed(() => {
        return templates.value.filter(t => t.supported)
    })

    const jsonFilesCeb = import.meta.glob('@/lib/ceb/*.json');
    const jsonFilesPsp = import.meta.glob('@/lib/psp/*.json');
    const jsonFilesWar = import.meta.glob('@/lib/war/*.json');
    const jsonFilesTl = import.meta.glob('@/lib/tl/*.json');

    async function loadFiles() {
        const congregationStore = useCongregationStore();
        const lang = congregationStore.getStoredLanguage?.code;

        let jsonFiles;
        if (lang === 'ceb') {
            jsonFiles = jsonFilesCeb;
        } else if (lang === 'psp') {
            jsonFiles = jsonFilesPsp;
        } else if (lang === 'war') {
            jsonFiles = jsonFilesWar;
        } else if (lang === 'tl') {
            jsonFiles = jsonFilesTl;
        }

        availableMonths.value = []
        for (const path in jsonFiles) {
            const fileName = path.split('/').pop();
            const content = await jsonFiles[path]();
            if (content.default.publish)
                availableMonths.value.unshift({ name: fileName, content: content.default });
        }
    }

    const selectedMonth = computed(() => {
        return loadedMonth.value;
    })

    async function setMWBMonth(monthNum) {
        if (!monthNum) {
            const period = loadedMonth.value?.content?.period;
            const targetMonth = period
                ? availableMonths.value.find(f => f.name === `${period}.json`)
                : null;
            loadedMonth.value = cloneDeep(targetMonth || availableMonths.value[0]);
        } else {
            loadedMonth.value = cloneDeep(availableMonths.value.find(f => f.name === `${monthNum}.json`));
        }

        await loadMonthsVisit();
        await loadMonthEvents()
    }

    async function loadMonthsVisit() {
        const visitStore = useCoVisitStore()
        const currMonth = selectedMonth.value
        visitStore.currentMonth = currMonth?.content?.period
        await visitStore.retrieveLocal();
        const hasVisit = visitStore.hasMonthVisit === 'Y'

        if (!hasVisit) return

        const monthId = visitStore.currentMonth
        const visitDetails = visitStore.visitDetails[monthId]
        const weekId = visitDetails.weekId

        if (!weekId) return
        loadVisitToTargetWeek(visitDetails);
    }

    async function loadVisitToTargetWeek(visitDetails) {
        const visitWeek = selectedMonth.value.content.weeks.find(w => w.id == visitDetails.weekId)
        const cbsPart = visitWeek.parts.living.find(p => p.roles.includes('cbs'))

        // replacing the CBS part
        cbsPart.thumbnail = "https://cms-imgp.jw-cdn.org/img/p/1011229/univ/art/1011229_univ_sqr_lg.jpg";
        cbsPart.title = visitDetails.talk;
        cbsPart.reference = 'CO\'s 1st Service Talk';
        cbsPart.isVisit = true;
        cbsPart.co = visitDetails.co

        // disabling the reader
        const readerId = `${cbsPart.id}.r`
        visitWeek.parts.living = visitWeek.parts.living.filter(p => p.id !== readerId);

        // replacing the last song
        if (visitDetails.sjj) visitWeek.songs[2] = visitDetails.sjj


    }

    async function loadMonthEvents() {
        const eventStore = useAssembliesStore()

        const currMonth = selectedMonth.value
        eventStore.currentMonth = currMonth?.content?.period
        await eventStore.retrieveLocal();
        const hasEvent = eventStore.hasMonthAssembly === 'Y'
        if (!hasEvent) return

        const monthId = eventStore.currentMonth
        const targetEvent = eventStore.details[monthId]
        const weekId = targetEvent.weekId

        if (!weekId) return

        const eventWeek = selectedMonth.value.content.weeks.find(w => w.id == weekId)
        eventWeek.hasEvent = true

    }

    return {
        availableMonths, selectedMonth,
        setMWBMonth,
        loadFiles, supportedTemplates, template,
        loadMonthsVisit,
    }
})
