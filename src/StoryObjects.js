const BUFF_TYPES = [
    'damageReduction',
    'damageMultiplier'
];

const Buff = (buffType, value, duration) => {
    if (BUFF_TYPES.indexOf(buffType) < 0) {
        throw "Unknown buff " + buffType;
    }

    if (!value) {
        throw "Missing buff vulue of " + buffType;
    }

    if (!duration || duration <= 0) {
        throw "Missing buff duration of " + buffType;
    }

    return {
        buffType,
        value,
        duration }
}

const Ability = (id, label, description, damage, cooldown, buff) => {
    if (!id || !description) {
        throw 'Ability must have id and description: [' + [id,label,description].join() + ']'
    }
    return {
        id,
        label,
        description,
        damage,
        cooldown,
        buff
    };
}