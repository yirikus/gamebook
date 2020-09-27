class Character {
    constructor(abilities){
        this._abilities = abilities || [];
        this._maxLife = 10;
        this._life = 10;
        this._buffs = [];
    }

    getAbilities(){
        return this._abilities;
    }

    getAbility(abilityId) {
        return this._abilities[abilityId];
    }

    getBuff(buffType) {
        let result = 0;
        for (let i = 0; i < this._buffs.length; i++) {
            if (this._buffs[i].buffType === buffType) {
                result += this._buffs[i].value;
            }
        }
        return result;
    }

    /**
     * Uses ability, if ability has cooldown, sets time to cooldown value.
     * @param {} abilityId 
     */
    useAbility(abilityId){
        let ability = this.getAbility(abilityId);
        if (ability.coolDown) {
            ability.time = ability.coolDown;
        }
        //activate buff
        if (ability.buff) {
            this._buffs.push(ability.buff);
            ability.buff.time = ability.buff.duration;
        }
        //apply damage buffs
        let damageMultiplier = 1 + this.getBuff('damageMultiplier');
        //return damage
        return (ability.damage || 0) * damageMultiplier;
    }

    receiveAttack(ability) {
        // apply damage reduction
        if (ability.damage) {
            this.getBuff
        }
    }

    clearBuffs() {
        this._buffs = [];
    }

    /**
     * Decrements time for buffs. If time reaches 0, buff is removed
     */
    updateBuffs(){
        var i = this._buffs.length;
        while (i--) {
            this._buffs[i].time--;
            if (this._buffs[i].time <= 0) { 
                this._buffs[i].splice(i, 1);
            } 
        }
    }
    /**
     * decrements time ability was not used. If time reaches zero, ability can be used again
     */
    updateCooldowns(){
        var i = this._abilities.length;
        while (i--) {
            let ability = this._abilities[i];
            if (ability.coolDown && ability.time) {
                ability.time--;                
            }            
        }
    }

    /**
     * Called at the end of fighting round, reduces timers, cooldowns, removes inactive buffs
     */
    updateTimers(){
        this.updateBuffs();
        this.updateCooldowns();
    }
}