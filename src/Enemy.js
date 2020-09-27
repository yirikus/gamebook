class Enemy{
    constructor(pageEnemy){
        this._life = pageEnemy.life;
        this._maxLife = pageEnemy.life;
        this._abilities = pageEnemy.abilities;
        this._abilityCounter = 0;
    }

    fight(characterAbility) {

    }

    chooseAbility(){
        let ability = this._abilities[_abilityCounter % this._abilities.length];
        this._abilityCounter++;
        return ability;
    }
}