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
        this.x=0;
        this.y=0;
        this._label = module.label || this._id;
        this._maxTransitions = maxTransitions || this.module.maxTransitions;

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

    setCoords(coords){
        this.x = coords.x;
        this.y = coords.y;
    }

    findAdjacentCells(empty) {
        let neighbours = this.getLocationTransitions().map(a => { return {x: a.x, y: a.y}});
        let possibleCoords = Nodes.findAdjacentCoords(this);
        const findNeighbour = (a) => neighbours.find(b => b.x == a.x && b.y == a.y);
        return possibleCoords.filter(a => empty ? !findNeighbour(a) : findNeighbour(a));
    }

    getImg() {
        let adjacentCells = this.findAdjacentCells();
        let emptyCells = this.findAdjacentCells(true);
        let imgName = '';
        // top right bottom left
        if (!!adjacentCells.find(n => n.y > this.y)) {imgName += 't'}
        if (!!adjacentCells.find(n => n.x > this.x)) {imgName += 'r'}
        if (!!adjacentCells.find(n => n.y < this.y)) {imgName += 'b'}
        if (!!adjacentCells.find(n => n.x < this.x)) {imgName += 'l'}

       return imgName + '.png';
    }



    getLocationTransitions(){
        return this.getTransitions().filter(a=>a.getType !== NODE_TYPE.ACTION);
    }

    getMaxTransitions() {
        return this._maxTransitions ? this._maxTransitions : GENERATION.MAX_TRANSITIONS;
    }

    getRemainingTransitions() {
        let locationTransitions = 0;
        // action transitions are ignored
        this.getTransitions().forEach(t => (t.nodeType !== NODE_TYPE.ACTION) && locationTransitions++);
        return Math.max(0, this.getMaxTransitions() - locationTransitions);
    }
}