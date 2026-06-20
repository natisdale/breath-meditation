/**
Title: Breathe
Author: Nathan Tisdale
**/
let canvasWidth;
let canvasHeighh;
let visual;
let prompt = document.getElementById("prompt");
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let soundButton = document.getElementById("soundButton");
//colors
let brandNavy = "#112E81";
let brandPurple = "#4647AE";
let brandBlue = "#4382DF";
let brandSea = "#AACCD6";

function setup() {
  frameRate(40);

  canvasWidth = windowWidth < 250 ? 0.5 * windowWidth : 250;
  canvasHeight = canvasWidth;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent("visual");
  visual = new Torso();
}

function draw() {
  background(brandSea);
  prompt.innerText = visual.getCaption();
  visual.show();
}

function togglePlay() {
  visual.toggleActive();
  if (visual.isActive()) {
    playButton.innerText = "Pause";
  } else {
    playButton.innerText = "Play";
  }
}

function toggleSound() {
  visual.toggleSound();
}

function stop() {
  playButton.innerText = "Play";
  visual.reset();
  prompt.innerText = visual.getCaption();
}

// Resize the canvas when the browser's size changes.
function windowResized() {
  canvasWidth = windowWidth < 250 ? 0.5 * windowWidth : 250;
  canvasHeight = canvasWidth;
  resizeCanvas(canvasWidth, canvasHeight);
}
