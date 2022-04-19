import React, { useState } from "react";
// setTimeout(logoutUser, 5000);

// function logoutUser(){
// window.location ="/authentication/sign-in";
// }

var timer = document.getElementById("timer");
var duration = 2; // duration in minutes

setInterval(updateTimer, 1000);

function updateTimer() {
  duration--;
  if (duration < 1) {
    window.location = "authentication/sign-in";
  } else {
    timer.innerText = duration;
  }
}

window.addEventListener("mousemove", resetTimer);

function resetTimer() {
  duration = 2;
}
