const QUESTS = {};

/**
 * Returns 2 actions, one gives a quest, the second one gives a reward
 *
 * @param id
 * @param questItem item json
 * @param startLabel Receive a quest
 * @param startText Questgiver gave you a quest!
 * @param finishLabel Finish the quest
 * @param finishText You finished the quest and received a reward!
 * @param reward item json
 * @returns array of story parts
 */
QUESTS.create = (id, questItem, startLabel, startText, finishLabel, finishText, reward) => {
    return  [
        {
            prerequisite: id + ':-1',
            label: startLabel,
            text: startText,
            gain: [{itemId: id + "_QUEST", count: 1, type: 'status'}]
        },
        {
            prerequisite: id,
            condition: questItem,
            label: finishLabel,
            text: finishText,
            gain: reward
        }
    ];
}