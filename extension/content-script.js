var div = document.createElement("div");
div.className = "aka-stories col-xs-12 pa-2"

var stories = [
    getYourStoryCircleHTML(),
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
        (akaYourStoryOnClick + '').replace('{{url}}', chrome.runtime.getURL('html/profile.html'))
    ].join('\n');
    document.head.appendChild(s);

    confirmScript = document.createElement("script");
    confirmScript.type = "text/javascript";
    confirmScript.src = "/vendor/jquery-confirm-3.3.2/dist/jquery-confirm.min.js";
    document.head.appendChild(confirmScript);
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