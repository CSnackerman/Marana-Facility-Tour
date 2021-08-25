/* -------------- CONFIGURATION -------------- */

// for the video player CORS issues
document.cookie = "SameSite=None;Secure"

// responsive cutoffs
const MOBILE_WIDTH = 420;
const TABLET_WIDTH = 1024;
const DESKTOP_WIDTH = 1920;

// responsive modes
var R_MODE = 'desktop';

// window config
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// video player config
const PLAYER_BG_OPACITY = 0.75;

var PLAYER_WIDTH_RAW = 320;
var PLAYER_HEIGHT_RAW = 180;
var PLAYER_WIDTH = '320px';
var PLAYER_HEIGHT = '180px';

var PLAYER_TOP_RAW = 0;
var PLAYER_LEFT_RAW = 0;
var PLAYER_TOP = 0;
var PLAYER_LEFT = 0;


// toggler
var tourToggle = 'home'

function toggleTour() {
    
    if (tourToggle === 'home') 
        tourToggle = 'tour';
    else 
        tourToggle = 'home';
}


/* --------------- FUNCTIONS ------------------------- */

function setMode() {
    if (WIDTH <= MOBILE_WIDTH) {
        R_MODE = 'mobile';
    }

    if (WIDTH > MOBILE_WIDTH && WIDTH <= TABLET_WIDTH) {
        R_MODE = 'tablet';
    }

    if (WIDTH > TABLET_WIDTH) {
        R_MODE = 'desktop';
    }
}

// function that sets an appropriate video player size
function setPlayerSize() {

    if (R_MODE === 'mobile' || R_MODE == 'tablet') {
        PLAYER_WIDTH_RAW = WIDTH;
        PLAYER_HEIGHT_RAW = Math.floor (9 * PLAYER_WIDTH_RAW / 16);
    }
    else {
        PLAYER_WIDTH_RAW = Math.floor (WIDTH * 0.65);
        PLAYER_HEIGHT_RAW = Math.floor (9 * PLAYER_WIDTH_RAW / 16);
    }

    // convert to css pixels
    PLAYER_WIDTH = String (PLAYER_WIDTH_RAW) + "px";
    PLAYER_HEIGHT = String (PLAYER_HEIGHT_RAW) + "px";
}

function setPlayerPosition() {

    if (R_MODE === 'desktop') {
        PLAYER_LEFT_RAW = Math.floor (WIDTH / 2 - PLAYER_WIDTH_RAW / 2);
    }
    else {
        PLAYER_LEFT_RAW = 0;
    }

    // center vertically always
    PLAYER_TOP_RAW = Math.floor (HEIGHT / 2 - PLAYER_HEIGHT_RAW / 2);

    // convert to css pixels
    PLAYER_TOP = String (PLAYER_TOP_RAW) + "px";
    PLAYER_LEFT = String (PLAYER_LEFT_RAW) + "px";
}

// resize event
window.addEventListener ('resize', () => {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    setMode();
    setPlayerSize();
    setPlayerPosition();

    console.log ("\n--- RESIZED ---");
    logConfig();
});


function logConfig() {

    console.log ("Window Size: " + WIDTH + " x " + HEIGHT);
    console.log ("Responsive Mode: " + R_MODE);
    console.log ("Player Size: " + PLAYER_WIDTH + " x " + PLAYER_HEIGHT);
}

/* ------------- INITIALIZATION ------------------------- */

setMode();
setPlayerSize();
setPlayerPosition();

// log intial values
console.log ("Window Size: " + WIDTH + " x " + HEIGHT);
console.log ("Responsive Mode: " + R_MODE);
console.log ("Player Size: " + PLAYER_WIDTH + " x " + PLAYER_HEIGHT);


/* ------------------------------------------------------ */

export {WIDTH, HEIGHT};

export { PLAYER_BG_OPACITY }
export { PLAYER_WIDTH, PLAYER_HEIGHT }
export { PLAYER_TOP, PLAYER_LEFT }
export { R_MODE }

export { tourToggle, toggleTour }