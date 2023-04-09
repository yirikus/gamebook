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
    nodes.forEach(n => count += n.getFreeTransitionCount());
    return count;
}

Nodes.maxTransitionsReached = (node) => {
    let length = node.getTransitions().length;
    return  length >= GENERATION.MAX_TRANSITIONS || (node.module.maxTransitions ? length >= node.module.maxTransitions : false);
}