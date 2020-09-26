class Game{
    constructor(story) {
        this._story = story;
        this._page = 0;
        this._inventory = new Inventory(story.startItems);          
        this._statuses = [];                        
    }

    getInventory() { return this._inventory }
    
    getPageText(pageId) {
        const mergeOptionalText = (text) => {
            let optionalText = text.match(/{([^}]*)}/g);
            if (!optionalText) {
                return text;    
            }
            for (let i = 0; i<optionalText.length; i++) {
                let query = parser.parseQuery(optionalText[i]);
                if (this.hasStatus(query.id) && query.count != '-1' || 
                    !this.hasStatus(query.id) && query.count == '-1') {                        
                    text = text.replace(optionalText[i], this._story[pageId + '.' + optionalText[i].replace(/{(.*)}/,"$1")].text);  
                } else {
                    text = text.replace(optionalText[i],'');   
                }
            }
            return text;
        }
        return mergeOptionalText(this._story[pageId].text);
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