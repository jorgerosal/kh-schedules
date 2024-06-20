import translations from "./translations"

let lang = ''
let runtime = 0;

async function s140(month, language) {
    const weeks = {}
    lang = language
    const sourceWeeks = month.content.weeks


    for (let w in sourceWeeks) {
        runtime = 0
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
        classNames: `s140-meetingbar part-${partCode}`
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

    part.runtime = runtime
    runtime = parseFloat(part.time) + runtime + 1
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

    part.runtime = runtime
    runtime = parseFloat(part.time) + runtime
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

    part.runtime = runtime
    runtime = parseFloat(part.time) + runtime
    week.push(part);
}

const introduction = (src, week) => {
    const part = src.parts.gems[0]
    part.title = part.reference
    part.label = translations.mwbs140[lang].chairman

    part.runtime = runtime
    runtime = parseFloat(part.time) + runtime

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

            part.runtime = runtime
            runtime = parseFloat(part.time) + runtime + 1

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

        part.runtime = runtime
        runtime = parseFloat(part.time) + runtime + 1

        week.push(part)
    }
}

const living = (src, week) => {
    const parts = src.parts.living
    for (let s in parts) {
        const part = parts[s];

        if (part.roles.includes('cbs')) {
            part.label = translations.mwbs140[lang].conductor
        }

        if (part.class === 'accessory') {
            part.label = part.alt.replace(':', '')
        }

        if (s == parts.length - 1) {
            part.label = translations.mwbs140[lang].chairman
            part.title = part.reference
        }

        if (part.time) {
            part.runtime = runtime
            runtime = parseFloat(part.time) + runtime
        }

        week.push(part)
    }
}

async function weeklyParts(src, week) {
    opening(src, week);
    introduction(src, week)
    header(src, 'gems', week)
    gems(src, week)
    header(src, 'ministry', week)
    ministry(src, week)
    header(src, 'living', week)
    midsong(src, week);
    living(src, week)
    closing(src, week)
}




