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

const ITEMS = [
    {itemId: "MONEY", description: "peníze", count: 1},
    {itemId: "SANDWICH", description: "Sendvič", count: 1, effect: {hp: 1}},
]
