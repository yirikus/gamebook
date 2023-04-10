const GENERATION = {
    MAX_TRANSITIONS: 3,
    MAX_NODES: 10
}

class StoryGenerator {
    constructor(module, index) {
        this._id = 0;
    }

    /* goal: find artifact*/

    createRandomStory() {
        let nodes = [];
        const connectAction = (node, singleDirection) => (a) => {
            let newNode = new StoryNode(a, this._id, 1, NODE_TYPE.ACTION);
            newNode.addTransition(node, singleDirection);
            this._id++;
            nodes.push(newNode);
        };

        let nodesToAdd = tools.randomNumbers(GENERATION.MAX_NODES, MODULES.length);
        for (let i = 0; i < nodesToAdd.length; i++) {
            let connectables = Nodes.connectable(nodes)
            // choose random from modules
            let node = new StoryNode(MODULES[nodesToAdd[i]], this._id);
            let paths = Nodes.countPaths(connectables);
            console.info('node ' + i + ', available paths: ' + paths);
            if (paths <= 1 &&  i < (nodesToAdd.length - 1) && node.getFreeTransitionCount() < 2) {
                // reroll node, more paths are needed
                node = new StoryNode(this.findIntersectionModuleFrom(i), this._id);
            }
            this._id++;
            this.connectToRandomNodes(node, nodes, connectables, paths);
            // connect actions
            if (node.module.actions) {
                node.module.actions.forEach(connectAction(node));
            }
        }

        let locationNodes = nodes.filter( n => n.nodeType !== NODE_TYPE.ACTION);
        // hide a key and a treasure,
        let randomIndex = tools.randomNumberFromRange(1, locationNodes.length);
        let keyNode = locationNodes[randomIndex];
        if (!keyNode) console.error('undefined node at location ' + randomIndex);
        randomIndex = tools.randomNumberFromRange(Math.floor(locationNodes.length/2), locationNodes.length);
        let treasureNode = locationNodes[randomIndex];
        if (!treasureNode) console.error('undefined node at location ' + randomIndex);
        locationNodes.forEach( l => {
                if (l != keyNode && l != treasureNode) {
                    connectAction(l)(SEARCH_FAIL);
                }
            }
        );
        connectAction(keyNode)(SEARCH_SUCCESS);
        treasureNode.getText().concat(ARTIFACT_LOCATION);
        connectAction(treasureNode, true)(ARTIFACT_FOUND);

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
            storyMap[nodes[i].getId()] = this.createStoryPart(nodes[i]);
        }

        console.info(JSON.stringify(storyMap));
        return storyMap;
    }

    createStoryPart(node) {
        let storyPart = {
            text: node.getText(),
            options: this.createOptions(node),
        };
        if (node.module.gain) {
            storyPart.gain =  node.module.gain;
        }
        return storyPart;
    }

    createOptions(node) {
        let options = [];
        for (let i = 0; i < node.getTransitions().length; i++) {
            let condition = node.getTransitions()[i].module.condition;
            condition ? condition = '|' + condition : condition = '';
            options.push("[" + node.getTransitions()[i].getLabel() + "|" + node.getTransitions()[i].getId() + condition + "]")
        }
        return options;
    }

    connectToRandomNodes(node, nodes, connectableNodes, paths) {
        if (nodes.length <= 0) {
            //create start node
            node.setInitial();
            nodes.push(node);
        } else {
            if(connectableNodes.length <= 0) {
                console.error('ran out of paths');
            }
            // connect to other nodes
            let nodeCount =  tools.randomNumber(node.maxTransitions ? node.maxTransitions : GENERATION.MAX_TRANSITIONS) + 1;
            // we always have to have at least one open path to connect an intersection.
            // By reducing number of transitions to 1 when we have low amounts of paths we ensure that intersection is added
            if (nodeCount >= paths) {
                nodeCount = 1;
            }
            // select random number of existing nodes that have free connections
            let nodesToConnect = tools.randomElements(Math.min(connectableNodes.length, nodeCount), connectableNodes);

            for (let i = 0; i < nodesToConnect.length; i++) {
                // add transition in both directions
                node.addTransition(nodesToConnect[i]);
            }
            // connect action nodes
            nodes.push(node);
        }
    }
}