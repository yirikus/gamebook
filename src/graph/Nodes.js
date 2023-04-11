/* static StoryNode helper methods */
const Nodes = {};
Nodes.connectable = (nodes) => {
    let conncetable = [];
    for (let i =0; i < nodes.length; i++) {
        if (!Nodes.maxTransitionsReached(nodes[i])) {
            conncetable.push(nodes[i]);
        }
    }
    return conncetable;
}

Nodes.countPaths = (nodes) => {
    let count = 0;
    nodes.forEach(n => count += n.getRemainingTransitions());
    return count;
}

Nodes.findAdjacentNodes = (node, nodes) => {
    let adjacentCoords = Nodes.findAdjacentCoords(node)
    let adjacentNodes = [];
    adjacentCoords.forEach(a => adjacentNodes.concat(nodes.filter(n => n.x == a.x && n.y == a.y)));
    return adjacentNodes;
}

Nodes.findAdjacentCoords = (node) => {
    return [
        {x: node.x+1,y: node.y},
        {x: node.x,y: node.y+1},
        {x: node.x-1,y: node.y},
        {x: node.x,y: node.y-1},
    ];
}

Nodes.maxTransitionsReached = (node) => {
    let length = node.getTransitions().length;
    return  length >= GENERATION.MAX_TRANSITIONS || (node.maxTransitions ? length >= node.maxTransitions : false);
}
