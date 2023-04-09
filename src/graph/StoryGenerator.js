const GENERATION = {
    MAX_TRANSITIONS: 3,
    MAX_NODES: 5
}
class StoryGenerator {
    static createRandomStory() {
        let nodes = [];
        let nodesToAdd = tools.randomNumbers(GENERATION.MAX_NODES, MODULES.length);
        for (let i = 0; i < nodesToAdd.length; i++) {
            // choose random from modules
            let node = new StoryNode(MODULES[nodesToAdd[i]], i);
            this.connectNode(node, nodes);
        }
        // set end node
        nodes[nodes.length - 1].setFinal();
        // connect it to the existing graph
        return this.convertGraphToStory(nodes);
    }
    static convertGraphToStory (nodes) {
            let storyMap = {
                'title': 'random story',
                'startItems': [],
                'start':nodes[0].getId(),
            };

            for (let i = 0; i < nodes.length; i++) {
                storyMap[nodes[i].getId()] = {
                    text: nodes[i].getText(),
                    options: this.createOptions(nodes[i]),
                };
            }

            console.info(JSON.stringify(storyMap));
            return storyMap;
        }

    static createOptions(node) {
            let options = [];
            for (let i = 0; i < node.getTransitions().length; i++) {
                options.push("[" + node.getTransitions()[i].getLabel() + "|" + node.getTransitions()[i].getId() + "]")
            }
            return options;
        }

    static connectNode(node, nodes){
            if (nodes.length <= 0) {
                //create start node
                node.setInitial();
                nodes.push(node);
            } else {
                // connect to other nodes
                let nodeCount = tools.randomNumber(Math.min(nodes.length, GENERATION.MAX_TRANSITIONS)) + 1;
                // select random number of existing nodes
                let nodesToConnect = tools.randomNumbers(nodeCount, nodes.length);

                for (let i = 0; i < nodesToConnect.length; i++) {
                    let nodeToConnect = nodes[i];
                    // add transition in both directions
                    //should use index or ref?
                    node.getTransitions().push(nodeToConnect);
                    nodeToConnect.getTransitions().push(node);
                }
                nodes.push(node);
            }
        }
}