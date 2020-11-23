var div = document.createElement("div");
div.className = "aka-stories col-xs-12 pa-2"

var stories = [
    getYourStoryCircleHTML(),
    getFollowersCircleHTML(),
    getStoryCircleHTML('https://storage.googleapis.com/hmif-insights/portraits/17/18217025.jpg', 'didithilmy'),
    getStoryCircleHTML('https://storage.googleapis.com/hmif-insights/portraits/17/13517007.jpg', 'rid1hady'),
    getStoryCircleHTML('https://storage.googleapis.com/hmif-insights/portraits/17/13517091.jpg', 'adyaksa_w'),
    getStoryCircleHTML('https://storage.googleapis.com/hmif-insights/portraits/17/18217018.jpg', 'luthfihakim'),
    '<div>&nbsp;&nbsp;</div>'
]

div.innerHTML = stories.join('');

var appsElements = document.getElementsByClassName('apps');
appsElements[0].prepend(div);

appendScripts();

function appendScripts() {
    s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = [
        akaStoriesOnClick, 
        getNim,
        (akaYourStoryOnClick + '').replace('{{url}}', chrome.runtime.getURL('html/profile.html')),
        (akaFollowersOnClick + '').replace('{{url}}', chrome.runtime.getURL('html/followers.html'))
    ].join('\n');
    document.head.appendChild(s);

    confirmScript = document.createElement("script");
    confirmScript.type = "text/javascript";
    confirmScript.src = "/vendor/jquery-confirm-3.3.2/dist/jquery-confirm.min.js";
    document.head.appendChild(confirmScript);

    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL('script.js')
    document.head.appendChild(script);
}

function getStoryCircleHTML(imgUrl, username) {
    return (
        '<div class="story" onclick="javascript:akaStoriesOnClick(\'' + username + '\', \'' + imgUrl + '\')">' +
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

function getYourStoryCircleHTML() {
    return (
        '<div class="story" onclick="javascript:akaYourStoryOnClick()">' +
        '    <div class="circle fa fa-user-circle" style="font-size: 58px; color: #ccc; padding: 6px;"></div>' +
        '    <div><small style="color: #a0a0a0">Your Story</small></div>' +
        '</div>'
    );
}

function getFollowersCircleHTML() {
    return (
        '<div class="story" onclick="javascript:akaFollowersOnClick()">' +
        '    <div class="circle fa fa-plus-circle" style="font-size: 58px; color: #ccc; padding: 6px;"></div>' +
        '    <div><small style="color: #a0a0a0">Followers</small></div>' +
        '</div>'
    );
}

function getNim() {
    navbarBrandLink = document.getElementsByClassName("navbar-brand")[0];
    href = navbarBrandLink.href;
    queryString = href.split('?')[1];
    nim = queryString.split(':')[1];
    return nim;
}

function akaStoriesOnClick(username, imageUrl) {
    $.alert({
        title: username,
        content: '<img src="' + imageUrl + '" width="100%" />',
        backgroundDismiss: true,
        buttons: {
            close: {
                text: 'Tutup',
                keys: ['esc']
            }
        }
    })
}

function akaYourStoryOnClick() {
    $.alert({
        title: "Your Story",
        backgroundDismiss: true,
        buttons: {
            close: {
                text: 'Tutup',
                keys: ['esc']
            }
        },
        content: function () {
            var self = this;
            return $.ajax({
                url: '{{url}}',
                dataType: 'html',
                method: 'get'
            }).done(function (response) {
                self.setContent(response);
            }).fail(function(){
                self.setContent('Something went wrong.');
            });
        }
    })
}

function akaFollowersOnClick() {
    getUserData = function() {
        nim = getNim();
        return $.get(AKA_STORIES_API_BASE_URL + '/api/user/' + nim + '/');
    }

    getPage = function() {
        return $.ajax({
            url: '{{url}}',
            dataType: 'html',
            method: 'get'
        });
    }

    appendData = function(data, dom) {
        for(i = 0; i < data.followers.length; i++) {
            follower = data.followers[i];
            $(dom).find('#aka-stories-followers-table tbody').append('<tr><td>' + follower + '</td><td align="right"><i onclick="removeFollower(\'' + follower + '\')" class="glyphicon glyphicon-remove-circle akastories-ic-remove"></i></td></tr>')
        }

        for(i = 0; i < data.following.length; i++) {
            following = data.following[i];
            $(dom).find('#aka-stories-following-table tbody').append('<tr><td>' + following + '</td><td align="right"><i onclick="unfollow(\'' + following + '\')" class="glyphicon glyphicon-remove-circle akastories-ic-remove"></i></td></tr>')
        }
    }

    $.alert({
        title: "Followers & Following",
        backgroundDismiss: true,
        buttons: {
            close: {
                text: 'Tutup',
                keys: ['esc']
            }
        },
        content: function () {
            var self = this;

            return getUserData().done(function(userdata) {
                getPage().done(function (response) {
                    doc = new DOMParser().parseFromString(response, "text/html");
                    appendData(userdata, doc);
                    self.setContent(doc.documentElement.innerHTML);
                }).fail(function(){
                    self.setContent('Something went wrong.');
                });
            }).fail(function(){
                self.setContent('Something went wrong.');
            });
        }
    })
}