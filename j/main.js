// 1. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var myTimer = false;

// 2. This function creates an <iframe> (and YouTube player)
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

// 3. setup the video control buttons
const myplay = document.getElementById("myplay");
const mypause = document.getElementById("mypause");
const slo = document.getElementById("slo");
const normal = document.getElementById("normal");
const fast = document.getElementById("fast");

//add event listners for controls
myplay.addEventListener("click", (e) => {
    player.playVideo();
});

mypause.addEventListener("click", (e) => {
    player.pauseVideo();
});

slo.addEventListener("click", (e) => {
    player.setPlaybackRate(0.25);
});

normal.addEventListener("click", (e) => {
    player.setPlaybackRate(1);
});

fast.addEventListener("click", (e) => {
    player.setPlaybackRate(2);
});

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log("playerReady");
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            console.log("starting timer");
            myTimer = setInterval(getTime, 1000, event);
            break;
        case !YT.PlayerState.PLAYING:
            if (!myTimer) {
                console.log("no timer");
            }
            break;
        default:
            clearInterval(myTimer);
            console.log("stopping timer");
    }
}

// 6. get the currentTime of the video and trigger the
// manageCues function if we are watching the inital video.
function getTime(event) {
    let vidInfo = event.target.getVideoData();
    time = Math.floor(event.target.getCurrentTime());

    // make it so the manageCues only runs for a specific video
    if (vidInfo.video_id == "YIjWwZwlHQg") {
        manageCues(time);
    } else {
        console.log("cue NOT managed");
    }
}

// This function acts as the playlist for the inital video
function manageCues(time) {
    console.log(time);

    switch (time) {
        case 3:
            doStuff();
            break;
        case 10:
            doMoreStuff();
            break;
        case 21:
            changeLayout();
            showInfo();
            player.pauseVideo();
            setTimeout("player.playVideo();", 10000);
            break;
        case 27:
            player.loadVideoById({
                videoId: "6pWtLHZiews",
                startSeconds: 40,
                endSeconds: 120,
            });
            clearInterval(myTimer);

            //undo previous styling caused by inital video
            unDoStuff();
    }
}

/**
 * Below are all of the functions called by the
 * manageCues function
 *
 */

function doStuff() {
    console.log("doStuff");
    document.body.style.backgroundColor = "red";
}

function doMoreStuff() {
    document.body.style.backgroundColor = "green";
    console.log("moreStuffDone");
}

function changeLayout() {
    let iframe = player.getIframe();
    iframe.classList.add("layout2");
    player.getIframe().style.border = "10px solid red";
    console.log("layout changed");
}

function showInfo() {
    const info = document.getElementById("info");
    const iframe = document.createElement("IFRAME");
    iframe.classList.add("myframe");
    iframe.src = "rest.html";
    info.appendChild(iframe);
}

//If the video is switched from initial video, calling this function will undo DOM changed made for the first video.
function unDoStuff() {
    document.body.style.backgroundColor = "white";

    //clear iFrame
    const infoFrame = document.querySelector(".myframe");
    infoFrame.src = "";
    // clear the article
    document.querySelector("#info").innerHTML = "";

    //re-style the page
    let iframe = player.getIframe();
    iframe.classList.remove("layout2");
    player.getIframe().style.border = "none";
    console.log("UNDONE!!!!!!!");
}

function stopVideo() {
    console.log("video stopped");
    player.stopVideo();
}
