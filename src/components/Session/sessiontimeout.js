import React, { useState } from "react";
// setTimeout(logoutUser, 5000);

// function logoutUser(){
// window.location ="/authentication/sign-in";
// }

var timer = document.getElementById("timer");
var duration = 10; // duration in seconds

setInterval(updateTimer, 1000);

function updateTimer() {
  duration--;
  if (duration < 0) {
    window.location = "authentication/sign-in";
  } else {
    timer.innerText = duration;
  }
}

window.addEventListener("mousemove", resetTimer);

function resetTimer() {
  duration = 10;
}
