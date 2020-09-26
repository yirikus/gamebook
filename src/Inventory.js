class Inventory {
    constructor(itemArray) {
        this._items = itemArray || itemArray;        
      }

      getItems() { return this._items }

    /**
     * Adds copy of given item to inventory
     * @param {*} itemToAdd 
     */
    addItem(itemToAdd){
        let inv = this.getItems();
        let found = this.findItem(itemToAdd.itemId);
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
     * Returns true if player has given item in given count or more
     * @param {*} query query to check for an item and count
     */
    hasItem(query) {
        let item = parser.parseQuery(query);
        let found = this.findItem(item.id) 
        return (found && (!item.count || (item.count > 0 && found.count >= item.count))) 
            || (!found && item.count < 0);
    }

    /**
     * Get item from inventory by itemId
     * @param {} itemId 
     */
    findItem(itemId){
        let inv = this.getItems();
        for (let i = 0; i < inv.length; i++) {
            if (inv[i].itemId === itemId ) {
                return inv[i];
            }
        }
        return null;    
    }
}