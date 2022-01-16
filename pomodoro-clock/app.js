const start = document.getElementById("start_stop");
const reset = document.getElementById("reset");
const brkIncrease = document.getElementById("break-increment");
const brkDecrease = document.getElementById("break-decrement");
const pause = document.getElementById("break-length");
const wrkIncrease = document.getElementById("session-increment");
const wrkDecrease = document.getElementById("session-decrement");
const session = document.getElementById("session-length");
const countDown = document.getElementById("time-left");
const timerLabel = document.getElementById("timer-label");
const audio = document.getElementById("beep");
const progress = document.getElementById("progress");

let wrkSession = 25;
let brkSession = 5; 
let sec = 25 * 60; 
let typeOfSession = 'Session';
let counting = false;
let startSession;
let percentage;

timer = () => {
    if (counting) {
        clearInterval(startSession);
        counting = false;
    } else {
        counting = true;
        startSession = setInterval(() => {
            if (sec === 0) {
                typeOfSession = (typeOfSession === 'Session') ? 'Break' : 'Session';
                sec = (typeOfSession === 'Session') ? (wrkSession * 60) : (brkSession * 60);
                audio.play();
                timerLabel.innerHTML = typeOfSession;
                displayTime(sec)    
            } else {
                sec = sec - 1;
                displayTime(sec);
                timerLabel.innerHTML = typeOfSession;
                if (typeOfSession === "Session") {
                    percentage = Math.round((sec / (wrkSession * 60) * 100));
                    progress.style = `width: ${percentage}%`;
                } else {
                    percentage = Math.round((sec / (brkSession * 60)) * 100);
                    progress.style = `width: ${percentage}%`;
                }
            }
        }, 1000);
    }
}

resetEvent = () => {
    wrkSession = 25;
    brkSession = 5; 
    sec = 25 * 60; 
    typeOfSession = 'Session';
    counting = false;
    clearInterval(startSession);
    countDown.innerHTML = displayTime(sec);
    session.innerHTML = wrkSession;
    pause.innerHTML = brkSession;
    timerLabel.innerHTML = typeOfSession;
    audio.pause();
    audio.currentTime = 0;
}

displayTime = (count) => {
    let min = Math.floor(count / 60);
    let remainSec = count % 60;   
    min = min < 10 ? ('0' + min) : min;
    remainSec = remainSec < 10 ? ('0' + remainSec) : remainSec;
    return countDown.innerHTML = min + ':' + remainSec;
}   


start.addEventListener("click", () => {
    timer();
    
})

reset.addEventListener("click", () => {
    resetEvent()
})


brkIncrease.addEventListener("click", () => {
    if (brkSession < 60) {
        if (!counting && typeOfSession === "Break") {
            brkSession = brkSession + 1;
            sec = brkSession * 60;
            pause.innerHTML = brkSession;
        } else {
            brkSession = brkSession + 1;
            pause.innerHTML = brkSession;
        }
    }
})

brkDecrease.addEventListener("click", () => {
    if (brkSession > 1) {
        if (!counting && typeOfSession === "Break") {
            brkSession = brkSession - 1;
            sec = brkSession * 60;
            pause.innerHTML = brkSession;
        } else {
            brkSession = brkSession - 1;
            pause.innerHTML = brkSession;
        }
    }
})

wrkIncrease.addEventListener("click", () => {
    if (wrkSession < 60) {
        if (!counting && typeOfSession === "Session") {
            wrkSession = wrkSession + 1;
            sec = wrkSession * 60;
            session.innerHTML = wrkSession;
            displayTime(sec);
        } else {
            wrkSession = wrkSession + 1;
            session.innerHTML = wrkSession;
        }
    }
})

wrkDecrease.addEventListener("click", () => {
    if (wrkSession > 1) {
        if (!counting && typeOfSession === "Session") {
            wrkSession = wrkSession - 1;
            sec = wrkSession * 60;
            session.innerHTML = wrkSession;
            displayTime(sec);
        } else {
            wrkSession = wrkSession - 1;
            session.innerHTML = wrkSession;
        }
    }
})
