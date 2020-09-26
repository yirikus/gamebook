var game = {
    activeStory: null,
    status: null
}

const STORIES = [
    DUMMY_STORY,
    STORY_1
];

const version = "26.9.2020, 17:33 (v4 - with style!)";

const main = () => {  
    writeElement("version", version);
    renderStories(STORIES);     
}

const renderStories = (stories) => {
    let availableStories = '<ul>';
    for (let i = 0; i < stories.length; i++) {
        let storyTitle = stories[i].title;
        availableStories += '<li><a href="#" onclick="chooseStory(\'' + storyTitle + '\')">' + storyTitle + '</a></li>';
    }
    availableStories += '</ul>';
    writeElement("availableStories", availableStories);
}

const chooseStory = (storyTitle) => {
    for (let i = 0; i < STORIES.length; i++) {
        if (STORIES[i].title === storyTitle) {
            writeElement("availableStories", '');
            testStory(STORIES[i]);  
            startGame(STORIES[i]);    
            gotoPage("1");
            return;
        }
    }
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
            //remove from inventory
            inv.splice(inv.indexOf(found),1);
        }
    } else if (itemToAdd.count > 0) {
        inv.push({
            ...itemToAdd
        });
    }
}

/**
 * Writes given string value to an element with given id
 */
const writeElement = (elementId, value) => {
    let element = document.getElementById(elementId);
    if (!element) {
        console.error('cannot write element, [' + elementId + '] does not exist!');
        return;
    }
    element.innerHTML = value;    
}

const renderPage = (pageId) => {   
    console.log("rendering " + pageId);
    writeElement("pageId", "#" + pageId);
    let text = expandText(game.activeStory[pageId].text);
    writeElement("page", text);
}

const renderInventory = (inventory) => {
    let text = "<ul>";
    for (let i = 0; i < inventory.length; i++) {
        text += renderItem(inventory[i]);
    }  
    text += "</ul>";
    writeElement("character", text);
}

const renderItem = (item) => {
    let itemText = "<li>";
        itemText += item.description;
        if (item.count && item.count > 1) {
            itemText += "(" + item.count + ")";
        }
        itemText += "</li>";
        return itemText;
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
    return (found && (!item.count || (item.count > 0 && found.count >= item.count))) 
        || (!found && item.count < 0);
}

/**
 * Converts text condition to object with itemId and count
 *  name -> {itemId: "name"}
 *  name:5 -> {itemId: "name", count: 5}
 * !name -> must not have name
 */
parseItemCondition = (condition) => {
    splitted = condition.split(":");    
    return {
        itemId: splitted[0], 
        count: splitted[1],
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
    writeElement("storyTitle",story.title);
    game.activeStory = story;
    game.status = {
        page : 0,
        inventory: [
          //  {itemId:"SWIMMING", description: "Plavání", count: 1},
            {itemId:"MONEY", description: "Měšec", count:5}
        ]
    };
};

main();
