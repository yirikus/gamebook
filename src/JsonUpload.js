Uploader = {
    upload: () => {
        let storyToUpload = $('#storyToUpload').val();
        try {
            let storyJson = JSON5.parse(storyToUpload);
            STORIES.push(storyJson);
            let errors = StoryValidator.testStory(storyJson);
            if (errors) {
                alert(errors);
            }
            renderStories(STORIES);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }
}