const parser = {
    /**
     * Converts text query to a query object with id and count
     *  NAME -> {id: "NAME"}
     *  NAME:5 -> {id: "NAME", count: 5} count -1 means 'must not have'
     */
    parseQuery : (condition) => {
        let splitted = condition.replace(/{(.*)}/,"$1").split(":");
        return {
            id: splitted[0], 
            count: splitted[1],
        };
    },
    
    /**
 * Parses target location in <> to an object with label, id and condition
 */
    parseLocation: (text) => {
        let splitted = text.replace(/\[(.*)\]/,"$1").split("|");

        return {
            label: splitted[0],
            id : splitted[1],
            condition : splitted[2],
        };
    },

    getExpandableText: (text) => text.match(/\[([^\]]*)\]/g)
}