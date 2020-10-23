const testStory = (story) => {
    return followPaths(story, 1);
};

const followPaths = (story, pageId) => {
    let locations = getLocations(story[pageId].text);    
    let noCond = 0;
    let errors = '';
    for (let i = 0; i < locations.length; i++) {
        if (!locations[i].condition) {
            noCond++;
        }
        if (!story[locations[i].id]) {
            concatError(errors, pageId + ": Location " + locations[i].id + " does not exist!");
        } else {
            errors += followPaths(story,locations[i].id);
        }
    } 
    if (locations.length != 0 && noCond === 0) {
        errors = concatError(errors, pageId + ": All options have condition!");
    }
    if (locations.length === 0 && !story[pageId].end ) {
        errors = concatError(errors, pageId + ": Story ends, but not marked as end");
    } else if (locations.length != 0 && story[pageId].end ) {
        errors = concatError(errors,pageId + ":Story is marked to end, but has options to follow");
    }
    return errors;
}

const concatError = (errors, error) => {
    console.error(error);
    return errors.concat(error + '\n');
}

StoryValidator = {
    testStory: testStory  
}