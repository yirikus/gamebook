var game = {};

const STORIES = [
    DUMMY_STORY,
    STORY_1
];

const version = "27.9.2020, 15:45 (v5 - conditional page parts!)";

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
            StoryValidator.testStory(STORIES[i]);  
            startGame(STORIES[i]);    
            gotoPage("1");
            return;
        }
    }
}

/**
 * Moves player to location with given id and renders it along with inventory
 * @param {*} pageId 
 */
const gotoPage = (pageId) => {      
    renderPage(pageId);    
    game.gotoPage(pageId)    
    renderInventory(game.getInventory().getItems());   
    renderFight(pageId);
}

const renderFight = (pageId) => {
    if (game.shouldFight(pageId)){
        document.getElementById("fight").className = '';
    } else {
        document.getElementById("fight").className = 'hidden';
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
    let text = expandText(game.getPageText(pageId));    
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
 * Returns renderable anchor for given page ID
 */
const pageAnchor = (anchorLabel, pageId, condition) => {
    if (!condition || (condition && game.getInventory().hasItem(condition))) {
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
            let targetLocation = parser.parseLocation(toExpand[i]);
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
            locations.push(parser.parseLocation(toExpand[i])); 
        }
    }
    return locations;

}

const startGame = (story) => {
    writeElement("storyTitle",story.title);
    game = new Game(story);
};

main();
