const HAFAAR = {
    "title": "Artefakty z Hafaaru",
    "startItems": [],
    "1" : {
        text : "Oživit démonické psy pomocí artefaktů ve ztraceném městě Hafaar. Znělo to jako vtip. <br/>" +
            "Vtipné už ale tolik nebylo, když Zakradur povraždil celou výpravu. Mágům se prostě věřit nedá." +
            "Naštěstí nebyl dostatečně důkladný a ty jsi přežil.<br/>" +
            "[Kdo ale jsi?|2]",
    },
    "2" : {
        text : "Co ovládáš za schopnosti {SKILLS:-4}{SKILLS:4}?"
    },
    "2.SKILLS:-4" : {
        text :
            "[akrobacie|3|АCROBACY:-1] - jsi fakt dobrej ve skákání a podobných kejklích<br/>" +
            "[anestézie|4|ANESTHESY:-1] - aneb fakt umíš někoho dobře uspat (pěstí do brady je také forma anestézie)<br/>" +
            "[jazykofilie|5|LANGUAGES:-1] - domluvíš se opravdu s kýmkoliv<br/>" +
            "[bleskovrhání|6|LIGHTNING:-1] - k čemu je být mágem, když nemůžeš vrhat blesky?<br/>" +
            "[znakočteč|7|ANCIENT_TEXT:-1] - Rozumíš jakémukoliv hieroglifu, včetně kosočtverce.<br/>" +
            "[osvětlovač|8|LIGHT:-1] - Rozumíš jakémukoliv hieroglifu, včetně kosočtverce.<br/>" +
            "[pyromanie|9|FIRE:-1] - Dokážeš zapálit cokoliv kdekoliv<br/>" +
            "[aquamanie|10|WATER:-1] - Dokážeš zavlažit cokoliv kdekoliv<br/>" +
            "[pasťoborec|11|TRAPS:-1] - Dokážeš vyčmuchat past kdekoliv<br/>"
    },
    "2.SKILLS:4" : {
        text : "Tož to jsi zajímavý chlapík! Vzhůru na dobrodružství! Kde jsme to skončili... aha.. všichni jsou mrtví..."
    },

    "3" : {
        text : "Jsi fakt dobrej ve skákání a podobných kejklích. [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "ACROBACY", description: "Akrobacie", count: 1}
        ]
    },
    "4" : {
        text : "Fakt umíš někoho dobře uspat (pěstí do brady je také forma anestézie) [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "ANESTHESY", description: "Anestézie", count: 1}
        ]
    },
    "5" : {
        text : "Domluvíš se opravdu s kýmkoliv. [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "LANGUAGES", description: "Jazykofilie", count: 1}
        ]
    },
    "6" : {
        text : "K čemu je být mágem, když nemůžeš vrhat blesky? [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "LIGHTNING", description: "Bleskovrhání", count: 1}
        ]
    },
}

//marlbord = zakradur