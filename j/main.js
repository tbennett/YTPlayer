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

//video control buttons
const myplay = document.getElementById('myplay');
const mypause = document.getElementById('mypause');
const slo = document.getElementById('slo');

//add event listners for controls
myplay.addEventListener('click', (e) => {
    player.playVideo();
});

mypause.addEventListener('click', (e) => {
    player.pauseVideo();
});

slo.addEventListener('click', (e) => {
    player.setPlaybackRate(.25);
});

normal.addEventListener('click', (e) => {
    player.setPlaybackRate(1);
});

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

    if(time == 3) {
        doStuff();
    }

    if(time == 10) {
        doMoreStuff();
    }

    if(time == 21) {
        changeLayout();
        showInfo();
        player.pauseVideo();
        setTimeout('player.playVideo();', 5000);
    }

    // swapping out a video on the fly!
    // be mindful that once the new video is swapped out,
    // it will be affected by the timings of the manageCues function.
    // to avoid, I'm seeking past the last cue of 26 seconds.
    if(time == 26) {
        player.loadVideoById({
            'videoId': '_QtUGdaCb1c',
            'startSeconds': 30,
            'endSeconds': 60
        });
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
    iframe.src = "https://www.montalvospirits.com/how-long-should-you-let-steaks-warm-up-before-cooking/";
    info.appendChild(iframe);
}
