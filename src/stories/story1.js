const STORY_1 = {
    "1" : {
        text : "Stojíš před branou města. Okolo města je příkop, přes který vede most přímo k hlavní bráně. Půjdeš <po mostě|3>, nebo zkusíš <přeplavat příkop|2>?"
    },
    "2" : {
        text : "Najdeš si místo, kde je možné přeplavat příkop a vniknout do městské kanalizace. <Skočíš do příkopu|22>" 
    },
    "3" : {
        text : "Před branou stojí stráž a velmi se mračí. Zřejmě měl špatný den a rozhodl se tě nepustit do města. Chceš přesto <projít okolo stráže a tvářit se jakoby nic|4>, nebo zkusíš stráž <podplatit|5|MONEY:1>, nebo se rozhodneš na nic nečekat a na stráž <zaútočit|6>?"
    },
    "4" : {
        text: "Upřeně hledíš před sebe a stráže si nevšímáš. Jdeš kupředu. Vidíš jak koutkem oka mijíš stráž. Po čele ti stéká kapička potu. Ale, <vypadá to, že to vyjde!|9>"
    },
    "5": {
        text: "Přijdeš ke stráži a mile se na něj usměješ. Nenápadně mu strčíš zlaťáky do ruky. Kolik mu dáš? <Jeden zlaťák|9|MONEY:1>, <Pět zlaťáků|23|MONEY:5>, <Deset zlaťáků|24|MONEY:10>"
    },

    "6": {
        text: "Stráž tvůj útok nečeká, ale jednoduché to mít nebudeš ani tak. Bojuj! Pokud vyhraješ, omráčíš stráž a můžeš <vejít do města|10>, v opačném případě <záleží na náladě strážce|9>",
        fight: "2/4"
    },

    "8": {
        text: "Přeplaveš příkop a úspěšně se vyškrábeš do kanalizace. Východ není daleko, ale čeká na tebe další překážka... z temných koutů kanalizace se na tebe vrhá... KRYSA! Bojuj! Porazil jsi krysu? <ANO|16>, <NE|17>",
        fight: "1/3"
    },

    "9": {
        text: "Uslyšíš jak strážce brány zavrčí a citíš jak tě silné ruce chytají za ramena. Uvědomuješ si, že <letíš do příkopu|22>"
    },
    

    "10": {
        text: "Stojíš za hlavní branou. Kam půjdeš teď?"
    },

    "12": {
        text: "Topíš se, hoď si mincí. Pokud <uspěješ|13>, pokud <nikoliv|25>"
    },

    "22": {
        text: "*ŠPLOUCH*. Jsi ve městském příkopu. Smrdí jako prase. Není divu, když sem vytékájí kanalizací veškeré tekutiny vyloučené obyvateli města. Teď i ty smrdíš jako prase. Umíš Vůbec plavat? <Ano|8|SWIMMING>, <Ne|12>",
        gain: {itemId: "SMRAD", description:"Smrdíš jako prase.", count: 1}
    },

    "23": {
        text: "Strážce si strčí pěníze do kapsy a dál si tě nevšímá. <Úspěšně pronikáš do města|10>",
        gain: {itemId: "MONEY", description: "Měšec", count: -5}
    },

    "24": {
        text: "Strážce se usměje a strčí si pěníze, vítá tě ve městě a přeje ti mnoho štěstí. <Úspěšně jsi se dostal za bránu!|10>",
        gain: {itemId: "MONEY", description: "Měšec", count: -10}
    },

    "25": {
        text: "Utopil jsi se, tvé dobrodružství končí.",
        end:true
    }



};