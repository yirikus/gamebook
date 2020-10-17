const STORY_1 = {
    "title": "Město za branou",
    "startItems": [
        {itemId:"SWIMMING", description: "Plavání", count: 1},
        {itemId:"MONEY", description: "Měšec", count:5},        
    ],  
    "basicAbilities": [
        Ability("PUNCH", "Rána pěstí", "Útočíš pěstí!", 1),
        Ability("PREPARE", "Příprava", "Připravuješ se na další útok", 0, 1,
            Buff('damageMultiplier',1, 2)),
        Ability("DEFEND", "Obrana", "Bráníš se", 0, 2,
            Buff('damageReduction', 5, 1)),
    ],
    
    "enemies": {
        "KRYSA": {
            name: 'Přerostlá krysa',
            life: 2,
            abilities: [
                Ability("BITE", '','Krysa tě pokousala!', 1),
                Ability("EVADE", '', "Krysa zmateně pobíhá a nejde jí trefit", 0, 0,
                    Buff('damageReduction',100, 1)),
            ]
        },
        "GUARD": {
            name: 'Městská stráž',
            life: 5,
            abilities: [
                Ability("PREPARE", '','Pozor! Stráž se napřahuje k velkému seku', 0,0,
                    Buff('damageMultiplier',1, 2)),
                Ability("SLASH",'',"Strážce zaútočil mečem",  2),
                Ability("SLASH", '',"Strážce zaútočil mečem", 2),
            ]
        }
    },

    "1" : {
        text : "Stojíš před branou města. Okolo města je příkop, přes který vede most přímo k hlavní bráně. " +
            "Půjdeš [po mostě|3], nebo zkusíš [přeplavat příkop|2], nebo zkusíš [přelézt zeď po laně|26|ROPE]?"
    },
    "2" : {
        text : "Najdeš si místo, kde je možné přeplavat příkop a vniknout do městské kanalizace. [Skočíš do příkopu|22]" 
    },
    "3" : {
        text : "Před branou stojí stráž. Je obalený v nesourodých kusech brnění a z helmy mu trčí pouze velký čenich. " +
            "Určitě nevidí, ale je skoro jisté, že tě cítí už nějakou dobu. Počkat! Není to náhodou... " +
            "No ano, je to trol. Trol hlídající most. Takové Klišé!<br/>" +
            "Trol se velmi mračí. Velmi! Zřejmě měl špatný den a rozhodl se tě nepustit do města. " +
            "Chceš přesto [projít okolo stráže a tvářit se jakoby nic|4], nebo zkusíš stráž [podplatit|5|MONEY:1], nebo se rozhodneš na nic nečekat a na stráž [zaútočit|6]?",
        img: "img/guard.jpg"
    },
    "4" : {
        text: "Upřeně hledíš před sebe a stráže si nevšímáš. Jdeš kupředu. Vidíš jak koutkem oka mijíš stráž. Po čele ti stéká kapička potu. Ale, [vypadá to, že to vyjde!|9]"
    },
    "5": {
        text: "Přijdeš ke stráži a mile se na něj usměješ. Nenápadně mu strčíš zlaťáky do ruky. Kolik mu dáš? [Jeden zlaťák|9|MONEY:1], [Pět zlaťáků|23|MONEY:5], [Deset zlaťáků|24|MONEY:10]"
    },

    "6": {
        text: "Strážce tvůj útok nečeká, ale jednoduché to mít nebudeš ani tak. Bojuj! Pokud vyhraješ, omráčíš stráž a můžeš [vejít do města|10], v opačném případě [záleží na náladě strážce|9]",
        img: "img/guard.jpg",
        fight: {
            title:'Bojuješ s trolím strážcem!',
            id:"GUARD",
            win: '[Omráčil jsi strážce|11]',
            lose:'[Strážce tě přemohl, těď záleží na jeho náladě co s tebou bude|9]'
        }
    },

    "8": {
        text: "Překonáš příkop a úspěšně se vyškrábeš do kanalizace. Východ není daleko, ale čeká na tebe další překážka... z temných koutů kanalizace se na tebe vrhá... KRYSA! Bojuj!",
        img: "img/rat.jpg",
        fight: {
            title:'Bojuješ s krysou!', 
            id:"KRYSA", 
            win: '[Porazil jsi tuto mocnou krysu!|16]', 
            lose:'[Krysa tě bohužel vážně pokousala|17]'
        }
    },


    "9": {
        text: "Uslyšíš jak strážce brány zavrčí a citíš jak tě silné ruce chytají za ramena. Uvědomuješ si, že [letíš do příkopu|22]"
    },
    
    // part 2 -start
    "10": {
        text: "Stojíš za hlavní branou. Kam půjdeš teď? [Do hostince|27]"
    },

    "11": {
        text: "Strážce leží bezvládně na zemi. Nic ti nebrání v přístupu do města. Chceš se pojistit a [strážce zabít|18], [okrást ho|14|GUARDTHEFT:-1], nebo ho překročit a [pokračovat do města|15]? "
    },

    "12": {
        text: "Topíš se, hoď si mincí. Padla [hlava|25], nebo [orel|13]?"
    },

    "13": {
        text: "Podařilo se ti zachytit stromu rostoucího u městských zdí! Neutopíš se! Nedaleko vydíš otvor ve zdi, ze kterého vytákají splašky do příkopu. [Jdi do kanalizace|8]",
        gain: {itemId: "LUCKY", description: "Máš štěstí!"}
    },

    "14": {
        text: "Sebral jsi mu meč, zlaťáky, svačinu a dokonce jsi u něj i našel hanbatý obrázek! [Co dál?|11]",
        gainStatus: {statusId: "GUARDTHEFT"},
        gain: [
            {itemId: "SWORD", description: "Meč", count:1, damage: 2},
            {itemId: "MONEY", description: "Měšec", count: 10},
            {itemId: "SANDWICH", description: "Sendvič", count: 1, consumable: {life: 1}},
            {itemId: "NUDE_PIC", description: "Obrázek nahaté slečny", count: 1},
        ]
    },

    "15": {
        text: "Pospícháš rychle do města, snad si tě strážce nebude pamatovat.",
        gain: {statusId: "GUARD_KNOCKEDOUT"}
    },

    //TODO kde usti kanalizace?
    "16": {
        text: "Úspěšně jsi pronikl do města! Kam půjdeš teď? [Do hostince|27]"
    },

    "17": {
        text: "Umíráš pomalou smrtí na mnohačetná krysí kousance a infekci. Tvé dobrodružství zde končí.",
        end: true
    },

    "22": {
        text: "*ŠPLOUCH*. Jsi ve městském příkopu. Smrdí jako prase. Není divu, když sem vytékájí kanalizací veškeré tekutiny vyloučené obyvateli města. Teď i ty smrdíš jako prase. Umíš Vůbec plavat? [Ano|8|SWIMMING], [Ne|12|SWIMMING:-1]",
        gain: {itemId: "SMRAD", description:"Smrdíš jako prase.", count: 1}
    },

    "23": {
        text: "Strážce si strčí pěníze do kapsy a dál si tě nevšímá. [Úspěšně pronikáš do města|10]",
        gain: {itemId: "MONEY", description: "Měšec", count: -5}
    },

    "24": {
        text: "Strážce se usměje a strčí si pěníze, vítá tě ve městě a přeje ti mnoho štěstí. [Úspěšně jsi se dostal za bránu!|10]",
        gain: {itemId: "MONEY", description: "Měšec", count: -10}
    },

    "25": {
        text: "Utopil jsi se, tvé dobrodružství končí.",
        end:true
    },

    "26": {
        text: "Přelézáš zeď po laně",      
    },

    "27": {
        text: "Vešel jsi do hospody. {ZENAPRYC:-1} Za barem stojí mohutný vousatý barman, a leští sklenice. Také na tebe podezřívavě hledí.",
        options: ["[Jít za barmanem|28]", "[vrátit se|10]"]      
    },

    "27.ZENAPRYC:-1": {
        text: "O bar se lokty opírá svůdně oblečená žena a měří si tě pohledem.",
        options: "[jít za ženou|29]"      
    },

    "28": {
        text: "Jdeš směrem k baru a výčepní se tě jen stroze optá 'Pivo?' [Ano|30], [ne|31]",      
    },

    "29": {
        text: "Jdeš za ženou, tváří se hrozně znuděně. {SMRAD}{SMRAD:-1}",      
    },

    "29.SMRAD": {
        text: "Už se chystala něco říct, ale jakmile ses přiblížil, nakrčila nos a se znechuceným výrazem odešla. [Vyber si něco jiného|27]",
        gain: {statusId: "ZENAPRYC"}
    },
    "29.SMRAD:-1": {
        text: "Ale jakmile ses přiblížil, usmála se a jedním okem na tebe mrkla."
    },



};