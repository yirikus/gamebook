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