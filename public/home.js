import { WIDTH, HEIGHT } from "./config.js";
import { R_MODE } from "./config.js";

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// background image
const birds_eye = new Image();
birds_eye.src = './images/marana_birds_eye.png';
var bg_width = 1920;
var bg_x = -(bg_width - WIDTH) / 2;
var bg_start_x = 0;

// stretch bg if necessary
if (WIDTH > 1920) {
  bg_width = WIDTH;
}


// control variables
var panning = false;
var pointer_start_x = 0;
var pointer_x = 0;
const dampener = 0.7



// touch event listeners
canvas.addEventListener('touchstart', (e) => {

  panning = true;
  pointer_start_x = e.touches[0].clientX;
  bg_start_x = bg_x;
});

canvas.addEventListener('touchmove', (e) => {

  if (panning === true) {
    pointer_x = e.touches[0].clientX;
    bg_x = bg_start_x - (pointer_start_x - pointer_x) * dampener;
  }
});

canvas.addEventListener('touchend', (e) => {

  if (panning === true) {
    pointer_x = 0;
    panning = false;
  }
});



// mouse event listeners
canvas.addEventListener('mousedown', (e) => {

  pointer_start_x = e.offsetX;
  bg_start_x = bg_x
  panning = true;
});

canvas.addEventListener('mousemove', (e) => {

  if (panning === true) {
    pointer_x = e.offsetX;
    bg_x = bg_start_x - (pointer_start_x - pointer_x) * dampener;
  }
});

canvas.addEventListener('mouseup', (e) => {

  if (panning === true) {
    pointer_x = 0;
    panning = false;
  }
});


function clampBackground() {

  if (bg_x > 0) {
    bg_x = 0;
  }

  if (bg_x + bg_width < WIDTH) {
    bg_x = -(bg_width - WIDTH);
  }

}


// render loop
function home() {

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  clampBackground();

  ctx.drawImage(birds_eye, bg_x, 0, bg_width, HEIGHT);

  requestAnimationFrame(home);
}

home();
