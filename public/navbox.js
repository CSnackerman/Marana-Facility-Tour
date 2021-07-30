import { showVideoPlayer } from "./videoplayer.js";
import { WIDTH, HEIGHT } from "./config.js";
import { R_MODE } from "./config.js";

// navbox container
const navbox_container = document.getElementById ('navbox_container');


// topper
const navbox_topper = document.getElementById('navbox_topper');

// button handles
const navbox_buttons = document.querySelectorAll('.navbox-button');

const overview_button = document.getElementById('overview_button');
const howitwasbuilt_button = document.getElementById('howitwasbuilt_button');
const chipping_button = document.getElementById('chipping_button');
const seeding_button = document.getElementById('seeding_button');
const germination_button = document.getElementById('germination_button');
const plantselection_button = document.getElementById('plantselection_button');
const pollination_button = document.getElementById('pollination_button');
const tour360_button = document.getElementById('tour360_button');

const logo_button = document.getElementById('logo_button');


// initialize
function initNavbox() {
    
    if (R_MODE === 'mobile') {

        let m_width = '115px';

        navbox_container.style.left = 0;

        navbox_topper.style.width = m_width;
        
        navbox_buttons.forEach ( (button) => {
            button.style.width = m_width;
            button.style.fontSize = '7pt';
            button.style.padding = '4px';
            // console.log(button);
        })

        logo_button.style.right = 0;
        logo_button.style.width = '40%';
        logo_button.style.height = '5%';
        logo_button.style.margin = 0;
        logo_button.style.marginRight = '-25px';
        console.log (logo_button);
    }
}

initNavbox();


// event listeners
overview_button.addEventListener('click', () => {
    console.log ("clicked 'OVERVIEW' button");
    showVideoPlayer();
});


howitwasbuilt_button.addEventListener('click', () => {
    console.log ("clicked 'HOW IT WAS BUILT' button");
    showVideoPlayer();
});


chipping_button.addEventListener('click', () => {
    console.log ("clicked 'CHIPPING' button");
    showVideoPlayer();
});


seeding_button.addEventListener('click', () => {
    console.log ("clicked 'SEEDING' button");
    showVideoPlayer();
});


germination_button.addEventListener('click', () => {
    console.log ("clicked 'GERMINATION' button");
    showVideoPlayer();
});


plantselection_button.addEventListener('click', () => {
    console.log ("clicked 'PLANT SELECTION' button");
    showVideoPlayer();
});


pollination_button.addEventListener('click', () => {
    console.log ("clicked 'POLLINATION' button");
    showVideoPlayer();
});


tour360_button.addEventListener('click', () => {
    console.log ("clicked '360 TOUR' button");
    showVideoPlayer();
});


logo_button.addEventListener ('click', () => {
    console.log ("clicked 'LOGO' button");
    window.open("https://www.bayer.com/en/");
});
