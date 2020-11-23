AKA_STORIES_API_BASE_URL = "http://localhost:8000"

function getStoryCircleHTML(imgUrl, storyImg, username) {
    if (!(imgUrl.indexOf('http://') === 0 || imgUrl.indexOf('https://') === 0)) {
        imgUrl = AKA_STORIES_API_BASE_URL + imgUrl;
    }

    if (!(storyImg.indexOf('http://') === 0 || storyImg.indexOf('https://') === 0)) {
        storyImg = AKA_STORIES_API_BASE_URL + storyImg;
    }

    return (
        '<div class="story" onclick="javascript:akaStoriesOnClick(\'' + username + '\', \'' + storyImg + '\')">' +
        '   <div class="circle">' +
        '       <div class="img" style="background-image: url(' + imgUrl + ');"></div>' +
        '       <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;" xml:space="preserve">' +
        '           <circle cx="35" cy="35" r="33" />' +
        '       </svg>' +
        '   </div>' +
        '   <small>' + username + '</small>' +
        '</div>'
    );
}

function akaStoriesLoadStories() {
    $.get(AKA_STORIES_API_BASE_URL + '/api/story/' + getNim() + '/').done(function(response) {
        var stories = [];
        for (var i = 0; i < response.stories.length; i++) {
            var story = response.stories[i];
            stories.push(getStoryCircleHTML(story.profile_image, story.story_image, story.username));
        }
        stories.push('<div>&nbsp;&nbsp;</div>');

        $("#aka-stories-container").html(stories.join(''));
    });
}

$(document).ready(function() {
    akaStoriesLoadStories();
})