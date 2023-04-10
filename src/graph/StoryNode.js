const NODE_TYPE = {
    ACTION: 1
}
/**
 * Graph node for story generation
 * */
class StoryNode {
    constructor(module, index, maxTransitions, nodeType) {
        if (!module || index === undefined) {
            throw 'index and module must be provided';
        }
        this.module = module;
        this._transitions = [];
        this._initial = false;
        this._final = false;
        this.nodeType = nodeType;
        this._id =  index;
        this._label = module.label || this._id;
        this.maxTransitions = maxTransitions || this.module.maxTransitions;

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

    /**
     * Adds bidirectional transition by default
     * @param targetNode
     * @param singleDirection only targetNode will connect to this node
     */
    addTransition(targetNode, singleDirection) {
        // add transition in both directions
        targetNode.getTransitions().push(this);
        if (!singleDirection) {
            this.getTransitions().push(targetNode);

        }
    }

    getFreeTransitionCount() {
        let locationTransitions = 0;
        // action transitions are ignored
        this.getTransitions().forEach(t => (t.nodeType !== NODE_TYPE.ACTION) && locationTransitions++);
        return Math.max(0,this.maxTransitions ? this.maxTransitions : GENERATION.MAX_TRANSITIONS - locationTransitions);
    }
}