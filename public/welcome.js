import { WIDTH, HEIGHT, R_MODE } from "./config.js";

// DOM
const welcome_bg = document.getElementById('welcome_bg');
const welcome_image = document.getElementById ('welcome_image');
const begin_button = document.getElementById('begin_button');

// properties
var welcome_img_aspect = 1092 / 510;
var welcome_img_width = 0;
var welcome_img_height = 0;
var welcome_img_top = 0;
var welcome_img_left = 0;
var welcome_img_bottom = 0;

var begin_btn_aspect = 232 / 62;
var begin_btn_width =  0; 
var begin_btn_height = 0; 
var begin_btn_top = 0;
var begin_btn_left = 0;



function initWelcomer() {

    welcome_image.style.opacity = 1;
    begin_button.style.opacity = 1;

    if (R_MODE === 'mobile' || R_MODE === 'tablet') {

        // welcome image
        welcome_img_width = WIDTH - 25;
        welcome_img_height = Math.floor (welcome_img_width / welcome_img_aspect);

        welcome_img_top = Math.floor(HEIGHT * .44 - welcome_img_height / 2);
        welcome_img_left = Math.floor (WIDTH / 2 - welcome_img_width / 2);
        welcome_img_bottom = welcome_img_top + welcome_img_height;

        // begin button
        begin_btn_width = WIDTH * 0.33;
        begin_btn_height = Math.floor (begin_btn_width / begin_btn_aspect);
        begin_btn_top = welcome_img_bottom + 1;
        begin_btn_left = Math.floor (WIDTH / 2 - begin_btn_width / 2);

    }

    if (R_MODE === 'desktop') {

        // welcome image
        welcome_img_width = WIDTH * 0.5;
        welcome_img_height = Math.floor (welcome_img_width / welcome_img_aspect);

        welcome_img_top = Math.floor(HEIGHT * .44 - welcome_img_height / 2);
        welcome_img_left = Math.floor (WIDTH / 2 - welcome_img_width / 2);
        welcome_img_bottom = welcome_img_top + welcome_img_height;

        // begin button
        begin_btn_width = WIDTH * 0.11;
        begin_btn_height = Math.floor (begin_btn_width / begin_btn_aspect);
        begin_btn_top = welcome_img_bottom + 1;
        begin_btn_left = Math.floor (WIDTH / 2 - begin_btn_width / 2);
    }

    welcome_image.style.width = String (welcome_img_width) + 'px';
    welcome_image.style.height = String (welcome_img_height) + 'px';
    welcome_image.style.top =  String (welcome_img_top) + 'px';
    welcome_image.style.left = String (welcome_img_left) + 'px';

    begin_button.style.width = String (begin_btn_width) + 'px';
    begin_button.style.height = String (begin_btn_height) + 'px';
    begin_button.style.top = String (begin_btn_top) + 'px';
    begin_button.style.left = String (begin_btn_left) + 'px';
}


initWelcomer();



function deleteWelcomer() {
    welcome_bg.remove();
    welcome_image.remove();
    begin_button.remove();
}

begin_button.addEventListener('click', () => {
    deleteWelcomer();
});