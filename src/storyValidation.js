const testStory = (story) => {
    let checkedPages = [];
    return followPaths(story, 1, checkedPages);
};

const followPaths = (story, pageId, checkedPages) => {
    checkedPages.push(pageId);
    let locations = getLocations(story[pageId].text, story[pageId].options);
    let noCond = 0;
    let errors = '';
    for (let i = 0; i < locations.length; i++) {
        if (!locations[i].condition) {
            noCond++;
        }
        if (!story[locations[i].id]) {
            concatError(errors, pageId + ": Location " + locations[i].id + " does not exist!");
        } else if (checkedPages.indexOf(locations[i].id) < 0){
            errors += followPaths(story, locations[i].id, checkedPages);
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