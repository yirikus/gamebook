class Game{
    constructor(story) {
        this._story = story;
        this._page = 0;
        this._inventory = new Inventory(story.startItems);          
        this._character = new Character(story.basicAbilities);
        this._statuses = [];                        
    }

    getInventory() { return this._inventory }

    shouldFight() {
        return !!this._story[this._page].fight;
    }
    
    getPageText(pageId) {
        const mergeOptionalText = (text) => {
            let optionalText = text.match(/{([^}]*)}/g);
            let options = [];
            if (!optionalText) {
                return {text:text};    
            }
            for (let i = 0; i<optionalText.length; i++) {
                let query = parser.parseQuery(optionalText[i]);
                if (this.hasStatus(query.id) && query.count != '-1' || 
                    !this.hasStatus(query.id) && query.count == '-1') {                        
                    let pagePart = this._story[pageId + '.' + optionalText[i].replace(/{(.*)}/,"$1").trim()];
                    text = text.replace(optionalText[i], pagePart.text);
                    if (pagePart.options) {
                        options = options.concat(pagePart.options);
                    }  
                } else {
                    text = text.replace(optionalText[i],'');   
                }                
            }            
            return {text:text, options:options};
        }
        const concatOptions = (options, page) => {
            if (page.options) {
                return options.concat(page.options);            
            }
            return options;
        }
        let page = this._story[pageId];
        let mergedPage = mergeOptionalText(page.text);  
        let options = concatOptions(concatOptions([], page), mergedPage);           
        
        return mergedPage.text + ' ' + options.join(', ');
    }

    gainItems = (pageId) => {
        let gain = this._story[pageId].gain;
        if (gain && !Array.isArray(gain)) {
            gain = [gain];
        }
        if (gain) {
            for (let i = 0; i < gain.length; i++) {              
                this.getInventory().addItem(gain[i]);
            } 
        }
    }    

    gotoPage(pageId) {
        this._page = pageId; 
        this.gainItems(pageId);      
    }

    addStatus(statusId) {
        this._statuses.push(statusId);
    }

    removeStatus(statusId) {        
        const index = this._statuses.indexOf(statusId);
        if (index > -1) {
            this._statuses.splice(index, 1);
        }
    }

    hasStatus(statusId) {
        return this._statuses.indexOf(statusId) > -1;
    }
}