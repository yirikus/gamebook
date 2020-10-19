const HAFAAR = {
    "title": "Artefakty z Hafaaru",
    "startItems": [
        {itemId:'COINS', description:'Peníze', count: 25}
    ],
    "1" : {
        text : "Oživit démonické psy pomocí artefaktů ve ztraceném městě Hafaar. Znělo to jako vtip. <br/>" +
            "Vtipné už ale tolik nebylo, když Zakradur povraždil celou výpravu. Mágům se prostě věřit nedá." +
            "Naštěstí nebyl dostatečně důkladný a ty jsi přežil.<br/>" +
            "[Kdo ale jsi?|2]",
    },
    "2" : {
        text : "Co ovládáš za schopnosti? <br/> {SKILLS:-4}{SKILLS:4}"
    },
    "2.SKILLS:-4" : {
        text :
            "[akrobacie|3|АCROBACY:-1] - jsi fakt dobrej ve skákání a podobných kejklích<br/>" +
            "[anestézie|4|ANESTHESY:-1] - aneb fakt umíš někoho dobře uspat (pěstí do brady je také forma anestézie)<br/>" +
            "[jazykofilie|5|LANGUAGES:-1] - domluvíš se opravdu s kýmkoliv<br/>" +
            "[bleskovrhání|6|LIGHTNING:-1] - k čemu je být mágem, když nemůžeš vrhat blesky?<br/>" +
            "[znakočteč|7|ANCIENT_TEXT:-1] - Rozumíš jakémukoliv hieroglifu!<br/>" +
            "[osvětlovač|8|LIGHT:-1] - Dokážeš rozsvítit všude i bez sirek!<br/>" +
            "[pyromanie|9|FIRE:-1] - Dokážeš zapálit cokoliv kdekoliv<br/>" +
            "[aquamanie|10|WATER:-1] - Dokážeš zavlažit cokoliv kdekoliv<br/>" +
            "[pasťoborec|11|TRAPS:-1] - Dokážeš vyčmuchat past kdekoliv<br/>"
    },
    "2.SKILLS:4" : {
        text : "Tož to jsi zajímavý chlapík/ženšina! Vzhůru na dobrodružství!<br/> Kde jsme to skončili... aha.. [všichni jsou mrtví... a ty ne|180]"
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
    "7" : {
        text : "Rozumíš jakémukoliv hieroglifu! [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "ANCIENT_TEXT", description: "Znakočtení", count: 1}
        ]
    },
    "6" : {
        text : "K čemu je být mágem, když nemůžeš vrhat blesky? [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "LIGHTNING", description: "Bleskovrhání", count: 1}
        ]
    },
    "8" : {
        text : "Dokážeš rozsvítit všude i bez sirek! [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "LIGHT", description: "Osvětlování", count: 1}
        ]
    },
    "9" : {
        text : "Dokážeš zapálit cokoliv kdekoliv [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "FIRE", description: "Pyromanie", count: 1}
        ]
    },
    "10" : {
        text : "Dokážeš zavlažit cokoliv kdekoliv [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "WATER", description: "Aquamanie", count: 1}
        ]
    },
    "11" : {
        text : "Dokážeš vyčmuchat past kdekoliv [Jupí|2]",
        gain: [
            {itemId: "SKILLS", description: "schopnosti", count:1, type: 'STATUS'},
            {itemId: "TRAPS", description: "Pasťoborectví", count: 1}
        ]
    },

    "180" : {
        text: "Nemáš sice mapy ani deníky cestovatelů, kteří údajně byli v Hafaaru. To si samozřejmě vzal Zakradur. " +
            "Nicméně si vzpomínáš, že musíš k poušti a poslední plán bylo [nalodit se na loď|213] a přeplout po řece Mirin do města Langard. </br>" +
            "Otázkou je jestli raději nezměnit plán a raději se [vyhnout naplánované cestě|23]. Zakradur možná není tak " +
            "blbej a zaplatil někoho, aby hlídal naplánovanou cestu. ",
    },

    "23":{
        text: "Pokračuješ dál po hlavní cestě. Nakonec dojdeš k provazovému mostu"

    },

    "213": {
        text: "Pokračuješ směrem do rybářské vesnice. Vlastně jde jen o několik domů a molo. " +
            " U mola stojí loď a členové posádky nakládají sudy do lodi."
    }
}

//marlbord = zakradur
//Black Sand = Langard
//Sumčí řeka = Mirin