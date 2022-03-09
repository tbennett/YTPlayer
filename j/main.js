/** @format */

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var done = false;
var myTimer = '';




// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "SLdZEgDUojc",
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });

    player.addEventListener("onStateChange", (e) => {
        console.log(e.target);
    });

}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for 15 seconds and then stop.

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 15000);
        done = true;

        myTimer = setInterval(getTime, 1000);

        function getTime() {
            let time = Math.floor(event.target.getCurrentTime());
            console.log(time);

            if(time >= 6) {
                stopVideo();
                doStuff();
            }
        }
 
    } else {
        clearInterval(myTimer);
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

function stopVideo() {
    player.stopVideo();
}

// https://developers.google.com/youtube/iframe_api_reference

function doStuff() {
    document.body.style.backgroundColor = "red";
}