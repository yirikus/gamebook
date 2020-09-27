/**
 * Enemy is a character with attack pattern 
 * */
class Enemy{
    constructor(pageFight){
        this._character = new Character(pageFight.abilities, pageFight.life);
        this._abilityCounter = 0;
        this._name = pageFight.name;        
    }

    getName(){
        return this._name;
    }

    getCharacter(){
        return this._character;
    }

    useAbility() {
        return this.getCharacter().useAbility(this.chooseAbility());
    }

    chooseAbility(){
        let abilities = this.getCharacter().getAbilities();
        let ability = abilities[this._abilityCounter % abilities.length];
        this._abilityCounter++;
        return ability.id;
    }
}