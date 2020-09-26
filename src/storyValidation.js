const testStory = (story) => {
    followPaths(story, 1);
};

const followPaths = (story, pageId) => {
    let locations = getLocations(story[pageId].text);    
    let noCond = 0;
    for (let i = 0; i < locations.length; i++) {
        if (!locations[i].condition) {
            noCond++;
        }
        if (!story[locations[i].id]) {
            console.error(pageId + ": Location " + locations[i].id + " does not exist!");
        } else {
            followPaths(story,locations[i].id);
        }
    } 
    if (locations.length != 0 && noCond === 0) {
        console.error(pageId + ": All options have condition!");
    }
    if (locations.length === 0 && !story[pageId].end ) {
        console.error(pageId + ": Story ends, but not marked as end");
    } else if (locations.length != 0 && story[pageId].end ) {
        console.error(pageId + ":Story is marked to end, but has options to follow");
    }    
}

StoryValidator = {
    testStory: testStory  
}