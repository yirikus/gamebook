/**
 * Graph node for story generation
 * */
class StoryNode {
    constructor(module, index) {
        if (!module || index === undefined) {
            throw 'index and module must be provided';
        }
        this.module = module;
        this._transitions = [];
        this._initial = false;
        this._final = false;
        this._id =  index;
        this._label = module.label || this._id;

        if (!module.label) {
            console.error('module ' + module.label + ' has no label');
        }
        this._text = module.text;
    }

    setInitial() {
        this._initial = true;
    }

    setFinal() {
        this._final = true;
    }

    isInitial() {
        return this._initial;
    }

    isFinal() {
        return this._final;
    }

    getId () {
        return this._id;
    }

    getLabel () {
        return this._label;
    }

    getText () {
        return this._text;
    }

    getTransitions() {
        return this._transitions;
    }

    getFreeTransitionCount() {
        return Math.max(0,this.module.maxTransitions ? this.module.maxTransitions : GENERATION.MAX_TRANSITIONS - this.getTransitions().length);
    }
}