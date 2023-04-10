const MODULES = [
{
    label: 'hřbitov',
    text: 'jsi na <strong>hřibotvě</strong>',
    maxTransitions: 1,
    /*transitions: ['goBack','cemeteryAction','goToC'],
    exits: [1,2,3],
    gatedExits:[4],*/
    actions: [{
        label: 'kopat hrob',
        condition: 'GRAVE_DUG:-1',
        text: 'Vykopal jsi hrob a něco jsi našel!',
        gain: [{itemId: "MONEY", description: "peníze", count: 1}, {itemId: "GRAVE_DUG", count: 1, type: 'status'}],
    }]
},
    {
    label: 'brána', text: 'jsi před branou, kterou hlídá stráž'
    /*transitions: ['goBack','overcomeGateGoToD','goToC']*/
},
    {label: 'radnice', text:'jsi před radnicí'},
    {label: 'park', text:'jsi v parku'},
    {label: 'arena', text:'jsi před arénou'},
    {label: 'museum', text:'jsi před muzeem', maxTransitions:1},
    {label: 'nemocnice', text:'jsi před nemocnicí'},
    {label: 'redLight', text:'jsi v červené uličce'},
    {label: 'továrna', text:'jsi před továrnou'},
    {label: 'náměstí', text:'jsi na náměstí'},
    {label: 'hospoda', text:'jsi před hospodou', maxTransitions:1},
    {label: 'obchod', text:'jsi v obchůdku', maxTransitions:1},
];

const SEARCH_SUCCESS = {
    label: 'prohledat ',
    text: 'Našel jsi <span class="emp3"> klíč k pokladu!</span>',
    gain: [{itemId: "KEY", description: "klíč k pokladu!", count: 1}]
};

const SEARCH_FAIL = {
    label: 'prohledat ',
    text: 'Našel jsi prd.'
};

const ARTIFACT_FOUND = {
    condition: 'KEY',
    label: 'otevřít bednu s pokladem',
    end: true,
    text: 'Otevřel jsi bednu s pokladem a našel jsi v ní... <span class="emp3">POKLAD</span>.'
};

// instead of an intro, attach it to a character/obstacle, this way, one person can give several quests.
const QUEST_STUBS = [
    {   intro: "Vidíš kočku, na krku má cosi připnuté",
        start: {label: 'Zkusit chytit kočku', text: 'Nemáš šanci, kočka hbitě uskočila pryč'},
        finish:{label: 'Nalákat kočku na <QUEST_ITEM>', text: 'Opatrně se přibližuješ ke kočce a máváš návnadou. Kočka je zvědavá a nechává tě se přiblížit. Jakmile to jde, okamžitě chňapneš věc co má na krku. Cha-chá, přelstil jsi kočku! Odměna je tvoje.' },
        reward: '<REWARD>'
    }
]

const ARTIFACT_LOCATION = ' Na zemi leží bedna s pokladem';

const ITEMS = [
    {itemId: "MONEY", description: "peníze", count: 1},
    {itemId: "SANDWICH", description: "Sendvič", count: 1, effect: {hp: 1}},
]
