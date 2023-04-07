class Character {
    constructor(abilities, maxLife){
        this._abilities = abilities || [];
        this._maxLife = maxLife;
        this._life = maxLife;
        this._buffs = [];
    }

    setLifeToMax(){
        this._life = this._maxLife;
    }

    getLife(){
        return this._life;
    }

    getAbilities(){
        return this._abilities;
    }

    getAbility(abilityId) {
        for (let i = 0; i < this._abilities.length; i++) {
            if (this._abilities[i].id === abilityId) {
                return this._abilities[i];
            }
        }
        throw 'Ability ' + abilityId + ' not found in list!';
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
        if (ability.cooldown) {
            ability.time = ability.cooldown;
        }
        //activate buff
        if (ability.buff) {
            this._buffs.push(ability.buff);
            ability.buff.time = ability.buff.duration;
        }
        //apply damage buffs
        let damageMultiplier = 1 + this.getBuff('damageMultiplier');
        //return damage
        return {
            damage: (ability.damage || 0) * damageMultiplier,
            description: ability.description
        };
    }

    alterLife(amount) {
        if (this._life < this._maxLife) {
            this._life += amount;
        }
    }

    receiveAttack(damage) {
        // apply damage reduction
        if (damage) {
            let damageReduction = this.getBuff('damageReduction');
            let totalDamage = Math.max(damage - damageReduction, 0);
            this._life -= totalDamage;
            return totalDamage;
        }
        
        return 0;
    }

    clearBuffs() {
        this._buffs = [];
    }

    /**
     * Decrements time for buffs. If time reaches 0, buff is removed
     */
    updateBuffs(){
        let i = this._buffs.length;
        while (i--) {
            this._buffs[i].time--;
            if (this._buffs[i].time <= 0) { 
                this._buffs.splice(i, 1);
            } 
        }
    }
    /**
     * decrements time ability was not used. If time reaches zero, ability can be used again
     */
    updateCooldowns(){
        let i = this._abilities.length;
        while (i--) {
            let ability = this._abilities[i];
            if (ability.cooldown && ability.time) {
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