class Game{
    constructor(story) {
        this._story = story;
        this._page = 0;
        this._enemy = {
            life : 0,
            abilityCounter: 0,            
        }
        this._inventory = new Inventory(story.startItems);          
        this._character = new Character(story.basicAbilities, 10);
        this._statuses = [];                        
    }

    getInventory() { return this._inventory }

    shouldFight() {
        return !!this._story[this._page].fight;
    }

    getFightInfo() {
        let fight = this._story[this._page].fight;
        let fightInfo = {
            title: fight.title,
            enemyName: this._enemy.getName(),
            playerLife: this._character.getLife(),
            enemyLife: this._enemy.getCharacter().getLife(),
            abilities: this._character.getAbilities(),
            playerWon: this._enemy.getCharacter().getLife() <= 0 ? fight.win : undefined,
            enemyWon: this._character.getLife() <= 0 ? fight.lose : undefined
        }
        if (fightInfo.playerWon || fightInfo.enemyWon) {
            this.endFight();
        }

        return fightInfo;
    }

    startFight(){
        let pageEnemy = this._story[this._page].fight.id;
        this._enemy = new Enemy(this._story.enemies[pageEnemy]);
        this._character.setLifeToMax();
    }

    endFight() {
        this._character.clearBuffs();
    }

    attack(abilityId) {
        let playerAbility = this._character.useAbility(abilityId);
        let enemyAbility = this._enemy.useAbility();
        let enemyReceived = this._enemy.getCharacter().receiveAttack(playerAbility.damage);
        let playerReceived = this._character.receiveAttack(enemyAbility.damage);
        this._enemy.getCharacter().updateTimers();
        this._character.updateTimers();
        
        return {
            playerAbility: playerAbility.description + ' Uštědřil jsi ' + enemyReceived + ' zranění!',
            enemyAbility: enemyAbility.description + ' Byl jsi zraněn za ' + playerReceived + ' body!'
        };
    }

    hasStatusOrItem(query) {
        let parsedQuery = parser.parseQuery(query);
        if (parsedQuery.count === '-1') {
            //both must satisfy query if we are asking for non presence
            return (this.hasStatus(query) && this.getInventory().hasItem(query));
        } else {
            return (this.hasStatus(query) || this.getInventory().hasItem(query));
        }
    }

    mergePage = (page) => {
        let optionalText = page.text.match(/{([^}]*)}/g);
        let options = [];
        if (!optionalText) {
            return page;
        }
        let text = page.text;
        let gain = [];
        if (page.gain) {
            gain = gain.concat(page.gain);
        }
        let fight = page.fight;
        for (let i = 0; i<optionalText.length; i++) {
            if (this.hasStatusOrItem(optionalText[i])) {
                let pagePart = this._story[this._page + '.' + optionalText[i].replace(/{(.*)}/,"$1").trim()];
                text = text.replace(optionalText[i], pagePart.text);
                if (pagePart.options) {
                    options = options.concat(pagePart.options);
                }
                if (pagePart.fight) {
                    fight = pagePart.fight;
                }
                if (pagePart.gain) {
                   gain = gain.concat(pagePart.gain);
                }
            } else {
                text = text.replace(optionalText[i],'');
            }
        }
        return {text, fight, options, gain};
    }

    getImg() {
        return this._story[this._page].img;
    }

    getPageText() {
        const concatOptions = (options, page) => {
            if (page.options) {
                return options.concat(page.options);            
            }
            return options;
        }
        let page = this._story[this._page];
        let mergedPage = this.mergePage(page);
        let options = concatOptions(concatOptions([], page), mergedPage);           
        
        return mergedPage.text + ' ' + options.join(', ');
    }

    gainStuff = () => {
        let gain = this.mergePage(this._story[this._page]).gain;
        if (gain && !Array.isArray(gain)) {
            gain = [gain];
        }
        if (gain) {
            for (let i = 0; i < gain.length; i++) {
                if (gain[i].itemId) {
                    this.getInventory().addItem(gain[i]);
                }
                if (gain[i].statusId) {
                    this.addStatus(gain[i].statusId, gain[i].count);
                }
            }
        }
    }    

    gotoPage(pageId) {
        this._page = pageId; 
        this.gainStuff();
        return { text: this.getPageText(), img: this.getImg() };
    }

    addStatus(statusId, count) {
        if (count < 0) {
            this.removeStatus(statusId);
        } else if (this._statuses.indexOf(statusId) < 0){
            this._statuses.push(statusId);
        }
    }

    removeStatus(statusId) {        
        const index = this._statuses.indexOf(statusId);
        if (index > -1) {
            this._statuses.splice(index, 1);
        }
    }

    hasStatus(query) {
        let parsedQuery = parser.parseQuery(query);
        let found = this._statuses.indexOf(parsedQuery.id) > -1;
        return found && parsedQuery.count != '-1' || !found && parsedQuery.count == '-1';
    }
}