/** @format */

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var myTimer = false;


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "YIjWwZwlHQg",
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log('playerReady');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for 15 seconds and then stop.

function onPlayerStateChange(event) {
    
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('starting timer');
        myTimer = setInterval(getTime, 1000, event);

    } else if (event.data !== YT.PlayerState.PLAYING) {
        if (!myTimer) {
            console.log('no timer?');
        }
        else {
            clearInterval(myTimer);
            console.log('stopping timer');

        }
    }
}

function getTime(event) {
    time = Math.floor(event.target.getCurrentTime());
    manageCues(time);
}

function stopVideo() {
    console.log('stopVideo');
    player.stopVideo();
}

function manageCues(time) {
    console.log(time);

    if(time == 6) {
        doStuff();
        player.pauseVideo();
        setTimeout('player.playVideo();', 5000);
    }

    if(time == 10) {
        doMoreStuff();
    }

    if(time == 20) {
        changeLayout();
        showInfo();
    }
}


/**
 * Below are all of the functions called by the 
 * manageCues function
 * 
 */

function doStuff() {
    console.log('doStuff');
    document.body.style.backgroundColor = "red";
}


function doMoreStuff() {
    document.body.style.backgroundColor = "green";
    console.log('moreStuffDone');
}

function changeLayout() {
    let iframe = player.getIframe();
    iframe.classList.add('layout2');
    player.getIframe().style.border = '10px solid red';
    console.log('layout changed');
}

function showInfo() {
    const info = document.getElementById('info');
    const iframe = document.createElement('IFRAME');
    iframe.classList.add('myframe');
    iframe.src = "https://en.wikipedia.org/wiki/Steak";
    info.appendChild(iframe);
}
