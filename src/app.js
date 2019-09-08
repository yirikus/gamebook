var game = {
    activeStory: null,
    status: null
}

const main = () => {   
    testStory(STORY_1);  
    startGame(STORY_1);    
    gotoPage("1");
}

const testStory = (story) => {
    followPaths(story, 1);
};

const followPaths = (story, pageId) => {
    let locations = getLocations(story[pageId].text);    
    let noCond = 0;
    for (let i = 0; i < locations.length; i++) {
        if (!locations[i].condition) {
            noCond++;
        }
        if (!story[locations[i].id]) {
            console.error(pageId + ": Location " + locations[i].id + " does not exist!");
        } else {
            followPaths(story,locations[i].id);
        }
    } 
    if (locations.length != 0 && noCond === 0) {
        console.error(pageId + ": All options have condition!");
    }
    if (locations.length === 0 && !story[pageId].end ) {
        console.error(pageId + ": Story ends, but not marked as end");
    } else if (locations.length != 0 && story[pageId].end ) {
        console.error(pageId + ":Story is marked to end, but has options to follow");
    }    
}

/**
 * Moves player to location with given id and renders it along with inventory
 * @param {*} pageId 
 */
const gotoPage = (pageId) => {
    status.page = pageId;   
    renderPage(pageId);
    gainItems(pageId);
    document.write("<hr/>");
    renderInventory(game.status.inventory);   
}

const gainItems = (pageId) => {
    let gain = game.activeStory[pageId].gain;
    if (gain && !Array.isArray(gain)) {
        gain = [gain];
    }
    if (gain) {
        for (let i = 0; i < gain.length; i++) {              
            addItem(gain[i]);
        } 
    }
}

/**
 * Adds copy of given item to inventory
 * @param {*} itemToAdd 
 */
const addItem = (itemToAdd) => {
    let inv = game.status.inventory;
    let found = findItem(itemToAdd.itemId);
    if (found) {
        found.count += itemToAdd.count; 
        if (found.count <= 0) {
            inv.splice(inv.indexOf(found),1);
        }
    } else if (itemToAdd.count > 0) {
        inv.push({
            ...itemToAdd
        });
    }
}

const renderPage = (pageId) => {   
    console.log("rendering " + pageId);
    document.write("<h1>");
    document.write("#" + pageId);
    document.write("</h1>");
    document.write("<div>");
    document.write(expandText(game.activeStory[pageId].text));
    document.write("</div>");    
}

const renderInventory = (inventory) => {
    document.write("<ul>");
    for (let i = 0; i < inventory.length; i++) {
        renderItem(inventory[i]);
    }  
    document.write("</ul>");
}

const renderItem = (item) => {
    document.write("<li>");
        document.write(item.description)
        if (item.count && item.count > 1) {
            document.write("(" + item.count + ")");
        }
        document.write("</li>");
}

/**
 * Parses target location in <> to an object with label, id and condition
 */
const getTargetLocation = (text) => {
    let splitted = text.replace(/<(.*)>/,"$1").split("|");

    return {
        label: splitted[0],
        id : splitted[1],
        condition : splitted[2],
    };
};

const findItem = (itemId) => {
    for (let i = 0; i < game.status.inventory.length; i++) {
        if (game.status.inventory[i].itemId === itemId ) {
            return game.status.inventory[i];
        }
    }
    return null;    
}

/**
 * Returns true if player has given item in given count or more
 * @param {*} item object with itemId and count
 */
const hasItem = (item) => {
    let found = findItem(item.itemId) 
    return !found || (!item.count || found.count >= item.count)    
}

/**
 * Converts text condition to object with itemId and count
 *  name -> {itemId: "name"}
 *  name:5 -> {itemId: "name", count: 5}
 */
parseItemCondition = (condition) => {
    splitted = condition.split(":");
    return {
        itemId: splitted[0], 
        count: splitted[1]
    };
}

/**
 * Returns renderable anchor for given page ID
 */
const pageAnchor = (anchorLabel, pageId, condition) => {
    if (!condition || (condition && hasItem(parseItemCondition(condition)))) {
        return '<a href="#" onclick="gotoPage(' + pageId + ')" >' + anchorLabel + ' (#' + pageId + ')</a>';
    } else {
        return '<s>' + anchorLabel + ' (#' + pageId + ')</s>'; 
    }
};

const getExpandableText = (text) => text.match(/<([^>]*)>/g);

const expandText = (text) => {
    console.log("expanding: " + text);
    let toExpand = getExpandableText(text);
    var replaced = text;  
    if (toExpand) {        
        for (let i = 0; i < toExpand.length; i++) {
            let targetLocation = getTargetLocation(toExpand[i]);
            replaced = replaced.replace(toExpand[i], pageAnchor(targetLocation.label, targetLocation.id, targetLocation.condition));            
        }
    }
    return replaced;
}

const getLocations = (text) => {
    let toExpand = getExpandableText(text);  
    let locations = [];
    if (toExpand) {        
        for (let i = 0; i < toExpand.length; i++) {
            locations.push(getTargetLocation(toExpand[i])); 
        }
    }
    return locations;

}

const startGame = (story) => {
    game.activeStory = story;
    game.status = {
        page : 0,
        inventory: [
            {itemId:"SWIMMING", description: "Plavání", count: 1},
            {itemId:"GOLD", description: "Měšec", count:5}
        ]
    };
};

main();
