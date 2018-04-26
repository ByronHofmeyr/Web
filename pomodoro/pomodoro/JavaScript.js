var debug = false;
var breakLength = 5;
var sessionLength = 25;
var mins;
var seconds = 60;
var pause = false;
var timerRunning = false;
var sessionActive = true;

var audio = new Audio('http://soundbible.com/mp3/Metal_Gong-Dianakc-109711828.mp3');

function gong() {
    audio.load();
    audio.play();
}

function countdown(minutes) {
    //var seconds = 60;
    mins = minutes;
    function tick() {
        if (!pause) {   // currently counting down
            var counter = document.getElementById("countDown");
            var current_minutes = mins - 1;
            seconds--;
            counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                setTimeout(tick, 1000);
            } else {
                if (mins > 1) {
                    seconds = 60;
                    timerRunning = true;
                    countdown(mins - 1);
                } else {
                    var clockName = document.getElementById("session");
                    var clockColor = document.getElementById("clock");
                    if (sessionActive) {
                        gong();
                        sessionActive = false;
                        clockName.innerHTML = "BREAK";
                        clockColor.style.backgroundColor = "#64e544";
                        seconds = 60;
                        if (debug) { console.log("breakLength = ", breakLength); }
                        timerRunning = true;
                        countdown(breakLength);
                    } else {
                        gong();
                        sessionActive = true;
                        clockName.innerHTML = "SESSION";
                        clockColor.style.backgroundColor = "#ddd41c";
                        seconds = 60;
                        if (debug) { console.log("breakLength = ", breakLength); }
                        timerRunning = true;
                        countdown(sessionLength);
                    }
                }
            }
        }
    }
    tick();
}

$(document).ready(function () {

    clock.addEventListener('click', function () {
        if (debug) { console.log("click function"); }
        if (pause) {
            if (debug) { console.log("Currently paused counter = ", mins); }
            pause = false;
            timerRunning = true;
            countdown(mins);
        } else {
            if (!timerRunning) {
                if (debug) { console.log("Start timer sessionLength = ", sessionLength); }
                timerRunning = true;
                countdown(sessionLength);
            } else {
                if (debug) { console.log("Pause timer"); }
                pause = true;
            }
        }
    });

    $("#reset").on('click', function () {
        if (debug) { console.log("timerRunning = ", timerRunning); }
        var clockName = document.getElementById("session");
        var clockColor = document.getElementById("clock");
        pause = true;
        var counter = document.getElementById("countDown");
        counter.innerHTML = "";
        mins = sessionLength;
        clockName.innerHTML = "SESSION";
        clockColor.style.backgroundColor = "#ddd41c";
        seconds = 60;
        timerRunning = false;
        sessionActive = true;
    })

    $("#neg-break-length").on('click', function () {
        if (debug) { console.log("neg-break-length click function"); }
        if (breakLength > 1) {
            breakLength--;
        }
        var session = document.getElementById("break-length-value");
        session.innerHTML = breakLength;
    })

    $("#plus-break-length").on('click', function () {
        if (debug) { console.log("plus-break-length click function"); }
        if (breakLength < 99) {
            breakLength++;
        }
        var session = document.getElementById("break-length-value");
        session.innerHTML = breakLength;
    })

    $("#neg-session-length").on('click', function () {
        if (debug) { console.log("neg-session-length click function"); }
        if (sessionLength > 1) {
            sessionLength--;
        }
        var session = document.getElementById("session-length-value");
        session.innerHTML = sessionLength;
    })

    $("#plus-session-length").on('click', function () {
        if (debug) { console.log("plus-session-length click function"); }
        if (sessionLength < 99) {
            sessionLength++;
        }
        var session = document.getElementById("session-length-value");
        session.innerHTML = sessionLength;
    })
});
