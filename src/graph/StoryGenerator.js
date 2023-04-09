const GENERATION = {
    MAX_TRANSITIONS: 3,
    MAX_NODES: 10
}

class StoryGenerator {
    constructor(module, index) {
        this._id = 0;
    }

    createRandomStory() {
        let nodes = [];
        let nodesToAdd = tools.randomNumbers(GENERATION.MAX_NODES, MODULES.length);
        for (let i = 0; i < nodesToAdd.length; i++) {
            let connectables = Nodes.connectable(nodes)
            // choose random from modules
            let node = new StoryNode(MODULES[nodesToAdd[i]], this._id);
            let paths = Nodes.countPaths(connectables) + node.getFreeTransitionCount();
            if (paths <= 1 &&  i < (nodesToAdd.length - 1)) {
                // reroll node, more paths are needed
                node = new StoryNode(this.findIntersectionModuleFrom(i), this._id);
            }
            this._id++;
            this.connectNode(node, nodes, connectables, paths);
        }
        //FIXME set end node - the node must make sense
        nodes[nodes.length - 1].setFinal();
        // connect it to the existing graph
        return this.convertGraphToStory(nodes);
    }

    findIntersectionModuleFrom(start) {
        for(let i = start; i < MODULES.length; i++) {
            if (!MODULES[i].maxTransitions || MODULES[i].maxTransitions > 1) {
                return MODULES[i];
            }
        }
        for (let i = 0; i < MODULES.length; i++) {
            if (!MODULES[i].maxTransitions || MODULES[i].maxTransitions > 1) {
                return MODULES[i];
            }
        }
    }

    convertGraphToStory(nodes) {
        let storyMap = {
            'title': 'random story',
            'startItems': [],
            'start': nodes[0].getId(),
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

    createOptions(node) {
        let options = [];
        for (let i = 0; i < node.getTransitions().length; i++) {
            options.push("[" + node.getTransitions()[i].getLabel() + "|" + node.getTransitions()[i].getId() + "]")
        }
        return options;
    }

    connectNode(node, nodes, connectableNodes, paths) {
        if (nodes.length <= 0) {
            //create start node
            node.setInitial();
            nodes.push(node);
        } else {
            // connect to other nodes
            let nodeCount =  tools.randomNumber(node.module.maxTransitions ? node.module.maxTransitions : GENERATION.MAX_TRANSITIONS) + 1;
            // we always have to have at least one open path to connect an intersection.
            // By reducing number of transitions to 1 when we have low amounts of paths we ensure that intersection is added
            if (nodeCount >= paths) {
                nodeCount = 1;
            }
            // select random number of existing nodes that have free connections
            let nodesToConnect = tools.randomElements(Math.min(connectableNodes.length, nodeCount), connectableNodes);

            for (let i = 0; i < nodesToConnect.length; i++) {
                // add transition in both directions
                node.getTransitions().push(nodesToConnect[i]);
                nodesToConnect[i].getTransitions().push(node);
            }
            // connect action nodes
            nodes.push(node);
        }
    }
}