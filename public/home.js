import { WIDTH, HEIGHT } from "./config.js";
import { R_MODE } from "./config.js";

import { CircleButton2D } from "./CircleButton2D.js";

import { showVideoPlayer } from "./videoplayer.js";
import { StartButton } from "./StartButton.js";

// boilerplate
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// background image
var birds_eye = document.getElementById('birds_eye');
var bg_width = 1920;
var bg_height = HEIGHT;
var bg_x = -(bg_width - WIDTH) / 2;
var bg_y = 0;
var temp_bg_x = 0;

// stretch bg if necessary
if (WIDTH > 1920) {
  bg_width = WIDTH;
}

// Start Button
var startButton = new StartButton();
startButton.init(bg_width, bg_height);
startButton.setInitialBackgroundOffset(bg_x);


// Circle Buttons
var howBuiltButton = new CircleButton2D();
    howBuiltButton.initHowBuilt(bg_width, bg_height);
    howBuiltButton.setInitialBackgroundOffset (bg_x);

var whatDoButton = new CircleButton2D();
    whatDoButton.initWhatDo(bg_width, bg_height);
    whatDoButton.setInitialBackgroundOffset (bg_x);


// control variables
var panning = false;
var pointer_start_x = 0;
var pointer_x = 0;
const dampener = 1



// touch event listeners
canvas.addEventListener('touchstart', (e) => {

  panning = true;
  pointer_start_x = e.touches[0].clientX;

  // background
  temp_bg_x = bg_x;

  // buttons
  startButton.saveTemp();
  howBuiltButton.saveTemp();
  whatDoButton.saveTemp();

});

canvas.addEventListener('touchmove', (e) => {

  if (panning === true) {
    pointer_x = e.touches[0].clientX;

    // bg
    bg_x = temp_bg_x - (pointer_start_x - pointer_x) * dampener;


    // buttons
    startButton.setPosition (
      startButton.tempx - (pointer_start_x - pointer_x) * dampener,
      startButton.y
    );

    howBuiltButton.setPosition (
      howBuiltButton.tempx - (pointer_start_x - pointer_x) * dampener,
      howBuiltButton.y
    );

    whatDoButton.setPosition (
      whatDoButton.tempx - (pointer_start_x - pointer_x) * dampener,
      whatDoButton.y
    );

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
  
  panning = true;
  pointer_start_x = e.offsetX;
  
  //bg
  temp_bg_x = bg_x

  // buttons
  startButton.saveTemp();
  howBuiltButton.saveTemp();
  whatDoButton.saveTemp();
});

canvas.addEventListener('mousemove', (e) => {

  if (panning === true) {
    pointer_x = e.offsetX;

    //bg
    bg_x = temp_bg_x - (pointer_start_x - pointer_x) * dampener;

    // buttons
    startButton.setPosition (
      startButton.tempx - (pointer_start_x - pointer_x) * dampener,
      startButton.y
    );

    howBuiltButton.setPosition (
      howBuiltButton.tempx - (pointer_start_x - pointer_x) * dampener,
      howBuiltButton.y
    );

    whatDoButton.setPosition (
      whatDoButton.tempx - (pointer_start_x - pointer_x) * dampener,
      whatDoButton.y
    );
  }
});

canvas.addEventListener('mouseup', (e) => {

  if (panning === true) {
    pointer_x = 0;
    panning = false;
  }
});


// prevent over-scrolling
function clamp() {

  if (bg_x > 0) {

    bg_x = 0;

    startButton.setPosition (
      startButton.start_offset_x,
      startButton.y
    );

    whatDoButton.setPosition (
      whatDoButton.start_offset_x, 
      whatDoButton.y
    );

    howBuiltButton.setPosition (
      howBuiltButton.start_offset_x,
      howBuiltButton.y
    );
  }

  if (bg_x + bg_width < WIDTH) {

    bg_x = -(bg_width - WIDTH);

    startButton.setPosition (
      startButton.start_offset_x - (bg_width - WIDTH),
      startButton.y
    );

    whatDoButton.setPosition (
      whatDoButton.start_offset_x - (bg_width - WIDTH), 
      whatDoButton.y
    );

    howBuiltButton.setPosition (
      howBuiltButton.start_offset_x - (bg_width - WIDTH), 
      howBuiltButton.y
    );
  }

}


// render loop function
function home() {

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  clamp();

  ctx.drawImage(birds_eye, bg_x, bg_y, bg_width, bg_height);

  howBuiltButton.draw(ctx);
  whatDoButton.draw(ctx);
  startButton.draw(ctx)

  requestAnimationFrame(home);
}


// run

let interval = CircleButton2D.anim_speed;
setInterval( () => {

  CircleButton2D.advanceFrame();
  howBuiltButton.animate();
  whatDoButton.animate();

}, interval);


home();
