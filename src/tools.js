const tools = {}
tools.randomNumbers = (count, max) => {
    let list = [];
    for (let i = 0; i < count; i++) {
        let newNumber = tools.randomNumber(max);
        newNumber = tools.incrementWhileExist(newNumber, list, max);
        list.push(newNumber);
    }
    return list;
}

tools.randomElements = (count, elements) => {
    let randomIndeces = tools.randomNumbers(count, elements.length);
    return randomIndeces.map(i => elements[i]);
}

/**
 * Increment value until you find one that is not in the list. When max number is reached, start over
 * @param value starting value
 * @param list list of values
 * @param max max number
 */
tools.incrementWhileExist = (value, list, max) => {
    if (list.length == 0 || max == 0 || list.length >= max) {
        return value;
    }

    while (list.indexOf(value) >= 0) {
        value++;
        if (value >= max) {
            value = 0;
        }
    }
    return value;
}

tools.randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}