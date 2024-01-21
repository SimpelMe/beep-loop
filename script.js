let secondsToCount = document.getElementById("loop").value;
let isMuted = true;
let timerLoopCountdown; // interval timer
let lastSetSeconds = secondsToCount; // already set seconds to test difference to current seconds
let audioInitialized // should be set only once to true

// if seconds are set in url query use them
const currentURL = new URL(window.location.href);
if (currentURL.search != "") {
  var secondsToSet = currentURL.search;
  secondsToSet = secondsToSet.substring(1);
  secondsToCount = secondsToSet;
  document.getElementById("loop").value = secondsToSet;
}

// called by every change of the "Loop-Duration" input
function setLoop() {
  // stop loop timer if already running
  try {
    clearInterval(timerLoopCountdown);
  } catch (e) {
    console.log("can't stop the counter");
  }
  // re-read loop timer
  secondsToCount = document.getElementById("loop").value;
  timerLoop();
  // set url query to seconds
  setUrlToLoopTime();
}

function timerLoop() {
  // Set the date we're counting down to
  var countDownDateNow = new Date().getTime();
  var countDownDate = countDownDateNow + (secondsToCount * 1000);
  // Update the count down every 1 second (but check every 100 ms to not miss any second)
  timerLoopCountdown = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations in seconds
    var seconds = Math.ceil(distance / 1000);
    // If the count down is over
    if (distance <= 0) {
      // stop the count
      clearInterval(timerLoopCountdown);
      // start the count fresh from starting seconds
      timerLoop();
      seconds = secondsToCount;
      beep();
    }
    if (lastSetSeconds != seconds) {
      // Output the count down result
      document.getElementById("time-remaining").innerHTML = seconds;
      lastSetSeconds = seconds;
    }
  }, 5);
};

function beep() {
  if (isMuted) {
    // no audio needed
    return
  }
  if (audioInitialized === undefined) {
    audioInitialized = true;
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  };
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  var frequency = document.getElementById("frequency").value;
  var volume = document.getElementById("volume").value / 100;
  var duration = document.getElementById("duration").value;
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;
  oscillator.start();
  setTimeout(
    function() {
      oscillator.stop();
    },
    // duration of beep
    duration
  );
};

const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  if (isMuted) {
    muteButton.innerHTML = '<svg id="speaker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>Currently muted.<br>Click this to unmute.';
  } else {
    muteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>Currently unmuted.<br>Click this to mute.';
    beep();
  }
});

function setUrlToLoopTime() {
  const newURL = new URL(window.location.href);
  const query = document.getElementById("loop").value;
  newURL.search = query;
  window.history.replaceState({
    path: newURL.href
  }, "", newURL.href);
}

timerLoop();
