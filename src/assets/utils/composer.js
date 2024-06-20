import translations from "./translations"

let lang = ''

async function s140(month, language) {
    const weeks = {}
    lang = language
    const sourceWeeks = month.content.weeks


    for (let w in sourceWeeks) {
        const week = sourceWeeks[w]
        weeks[week.id] = []
        await weeklyParts(week, weeks[week.id])
    }

    return weeks;
}

export {
    s140
}

const header = (src, partCode, week) => {
    const part = {
        id: `${src.id}.h-${partCode}`,
        type: 'header',
        title: translations.mwbs140[lang][partCode],
        showNoTime: true,
    }    

    week.push(part)
}

const opening = (src, week) => {
    const part = {
        id: `${src.id}.op`,
        time: 4,
        title: `${translations.mwbs140[lang].song} ${src.songs[0]}`,
        roles: [
            'elder', 'ms'
        ],
        showNoTime: true,
        label: translations.mwbs140[lang].prayer,
    }
    week.push(part)
}

const midsong = (src, week) => {
    const part = {
        id: `${src.id}.ms`,
        time: 4,
        title: `${translations.mwbs140[lang].song} ${src.songs[1]}`,
        roles: [],
        showNoTime: true
    }

    week.push(part);
}

const closing = (src, week) => {
    const part = {
        id: `${src.id}.cp`,
        time: 4,
        title: `${translations.mwbs140[lang].song} ${src.songs[2]}`,
        roles: [
            'elder', 'ms'
        ],
        showNoTime: true,
        label: translations.mwbs140[lang].prayer,
    }
    week.push(part);
}

const introduction = (src, week) => {
    const part = src.parts.gems[0]
    part.title = part.reference
    part.label = translations.mwbs140[lang].chairman
    week.push(part)
}

const gems = (src, week) => {
    const parts = src.parts.gems
    for (let s in parts) {
        if (s > 0) {
            const part = parts[s];
            if (part.roles.includes('br')) {
                part.label = translations.mwbs140[lang].student
            }
            week.push(part)
        }
    }
}

const ministry = (src, week) => {
    const parts = src.parts.ministry
    for (let s in parts) {
        const part = parts[s];

        if (part.roles.includes('demo')) {
            part.label = translations.mwbs140[lang].demo
        }

        if (part.roles.includes('talk')) {
            part.label = translations.mwbs140[lang].student
        }

        week.push(part)
    }
}

const living = (src, week) => {
    const parts = src.parts.living
    for (let s in parts) {
        const part = parts[s];
        // modify here if needed
        week.push(part)
    }
}

async function weeklyParts(src, week) {
    opening(src, week);
    introduction(src, week)
    header(src,'gems',week)
    gems(src, week)
    header(src,'ministry',week)
    ministry(src, week)
    header(src,'living',week)
    midsong(src, week);
    living(src, week)
    closing(src, week)
}




