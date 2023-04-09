const version = "23.10.2020, 21:22 (v13 - json upload!)";

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

var game = {};

const STORIES = [
    DUMMY_STORY,
    STORY_1,
    HAFAAR,
    HEIST,
    StoryGenerator.createRandomStory()
];

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
            writeElement("uploadStory", '');
            StoryValidator.testStory(STORIES[i]);  
            startGame(STORIES[i]);    
            gotoPage(STORIES[i].start || "1");
            return;
        }
    }
}

/**
 * Moves player to location with given id and renders it along with inventory
 * @param {*} pageId 
 */
const gotoPage = (pageId) => {
    let page = game.gotoPage(pageId);
    renderPage(pageId, page.text, page.img);
    renderInventory();
    renderFight();
}

const renderFight = () => {
    if (game.shouldFight()){
        game.startFight();
        document.getElementById("fight").className = '';
        let fightInfo = game.getFightInfo();
        writeElement("fightTitle", fightInfo.title);
        writeElement("enemyName", fightInfo.enemyName);
        writeElement("playerLife", fightInfo.playerLife);
        writeElement("enemyLife", fightInfo.enemyLife);
        writeElement("fightRounds", '');
        renderAbilities(fightInfo.abilities);        
    } else {
        document.getElementById("fight").className = 'hidden';
    }    
}

const renderAbilities = (abilities) => {
    let text = '';
    let template = '<div class="col-sm"><a href="#" onClick="useAbility(\'{abilityId}\')">{label}</a></div>';
    for (let i = 0; i < abilities.length; i++) {
        text += template
            .replace('{abilityId}', abilities[i].id)
            .replace('{label}', abilities[i].label);
    }
    writeElement("playerAbilities", text);
}

const useAbility = (abilityId) => {
    let fightResult = game.attack(abilityId);
    let fightInfo = game.getFightInfo();
    writeElement("playerLife", fightInfo.playerLife);
    writeElement("enemyLife", fightInfo.enemyLife);
    writeElement("fightRounds", '<div class="row">' + fightResult.playerAbility + '</div>', true);
    writeElement("fightRounds", '<div class="row">' + fightResult.enemyAbility + '</div>', true);
    if (fightInfo.playerWon) {
        writeFightResult('success', fightInfo.playerWon);
    } else if (fightInfo.enemyWon) {
        writeFightResult('danger', fightInfo.enemyWon);  
    }
}

const writeFightResult = (alertType, text) =>{
    writeElement("fightRounds", '<div class="alert alert-' + alertType + '" role="alert">'
            + expandText(text)
            + '</div>', true);
        writeElement("playerAbilities", '');
}

/**
 * Writes given string value to an element with given id
 */
const writeElement = (elementId, value, append) => {
    let element = document.getElementById(elementId);
    if (!element) {
        console.error('cannot write element, [' + elementId + '] does not exist!');
        return;
    }
    if (append) {
        element.innerHTML += value;
    } else {
        element.innerHTML = value;    
    }
}

const renderPage = (pageId, pageText, img) => {
    console.log("rendering " + pageId);
    writeElement("pageId", "#" + pageId);
    if (img) {
        writeElement("illustration", '<img src="' + img + '"/>');
    } else {
        writeElement("illustration", '');
    }
    writeElement("page", expandText(pageText));
}

/**
 * @param itemsToRender array
 */
const renderInventory = (effectText) => {
    let itemsToRender = game.getInventory().getItems();
    let text = "<strong>HP: " + game.getCharacter().getLife() + "</strong>" +
        "<ul>";
    for (let i = 0; i < itemsToRender.length; i++) {
        text += renderItem(itemsToRender[i]);
    }  
    text += "</ul>";
    $('#character [data-toggle="tooltip"]').tooltip('dispose');
    if (effectText){
        document.getElementById("effect").className = '';
        writeElement("effectText", effectText);
    } else {
        document.getElementById("effect").className = 'hidden';
    }
    writeElement("character", text);
    $('#character [data-toggle="tooltip"]').tooltip();

}

const consumeItem = (itemId) => {
    renderInventory( game.consumeItem(itemId));
}

const renderItem = (item) => {
    let itemText = "<li>";
    if (item.tooltip) {
        itemText = "<li data-toggle=\"tooltip\" data-placement=\"left\" title=\""+ item.tooltip +"\">"
    }
    if (item.effect) {
        itemText += "<a href=\"#\" onclick=\"consumeItem(\'" + item.itemId + "\')\" >";
    }
    itemText += item.description;
    if (!item.description) {
        console.error("missing item description for " + item.itemId);
    }
    if (item.count && item.count > 1) {
        itemText += "(" + item.count + ")";
    }
    if (item.effect) {
        itemText += "</a>"
    }
    itemText += "</li>";
    return itemText;
}

/**
 * Returns renderable anchor for given page ID
 */
const pageAnchor = (anchorLabel, pageId, condition) => {
    if (!condition || (condition && game.getInventory().hasItem(condition))) {
        return '<a href="#" onclick="gotoPage(\'' + pageId + '\')" >' + anchorLabel + ' (#' + pageId + ')</a>';
    } else {
        return '<s>' + anchorLabel + ' (#' + pageId + ')</s>'; 
    }
};



const expandText = (text) => {
    console.log("expanding: " + text);    
    let toExpand = parser.getExpandableText(text);
    var replaced = text;  
    if (toExpand) {        
        for (let i = 0; i < toExpand.length; i++) {
            let targetLocation = parser.parseLocation(toExpand[i]);
            replaced = replaced.replace(toExpand[i], pageAnchor(targetLocation.label, targetLocation.id, targetLocation.condition));            
        }
    }
    return replaced;
}

const getLocations = (text, options) => {
    let toExpand = parser.getExpandableText(text) || [];
    if (options) {
        toExpand = toExpand.concat(options);
    }
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
