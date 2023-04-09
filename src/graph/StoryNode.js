/**
 * Graph node for story generation
 * */
class StoryNode {
    constructor(module) {
        this._module = module;
        this._transitions = [];
        this._initial = false;
        this._final = false;
        this._id = module.id;
        this._label = module.label || this._id;
        if (!module.label) {
            console.error('module ' + module.id + ' has no label');
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
}