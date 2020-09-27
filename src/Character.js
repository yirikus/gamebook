class Character {
    constructor(basicAbilities){
        this._abilities = basicAbilities || [];
    }

    getAbilities(){
        return this._abilities;
    }
}