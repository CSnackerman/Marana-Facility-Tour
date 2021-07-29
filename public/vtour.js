import { WIDTH, HEIGHT } from "./config.js";

const canvas = document.getElementById ('c');
const ctx = canvas.getContext('2d');

const birds_eye = new Image ();
birds_eye.src = './images/marana_birds_eye.png';

function home() {

  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.drawImage (birds_eye, -50, -50, WIDTH + 50, HEIGHT + 50);

  requestAnimationFrame(home);
}

home();
