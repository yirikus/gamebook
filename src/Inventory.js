class Inventory {
    constructor(itemArray) {
        this._items = itemArray || itemArray;        
      }

    /**
     * Returns visible items, not statuses!
     * @returns {*}
     */
      getItems() { return this._items.filter(a => a.type !== 'STATUS'); }

    /**
     * Adds copy of given item to inventory
     * @param {*} itemToAdd 
     */
    addItem(itemToAdd){
        let inv = this._items;
        let found = this.findItem(itemToAdd.itemId);
        if (found) {
            found.count += (itemToAdd.count || 1);
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
     * Returns true if player has given item in given count or more
     * @param {*} query query to check for an item and count
     */
    hasItem(query) {
        let item = parser.parseQuery(query);
        let found = this.findItem(item.id) 
        return (found && ((item.count > 0 && found.count >= item.count)))
            || (!found && item.count < 0)
            || (found && item.count < 0 && found.count < Math.abs(item.count));
    }

    /**
     * Get item from inventory by itemId
     * @param {} itemId 
     */
    findItem(itemId){
        let inv = this._items;
        for (let i = 0; i < inv.length; i++) {
            if (inv[i].itemId === itemId ) {
                return inv[i];
            }
        }
        return null;    
    }
}