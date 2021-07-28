import { PLAYER_BG_OPACITY }            from './config.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT }  from './config.js';
import { PLAYER_TOP, PLAYER_LEFT }      from './config.js';

// get video player container
const video_container = document.getElementById('video_container');

// create component
const video_player = document.createElement('div');

// append to container
video_container.appendChild(video_player);

// style container
video_container.style.backgroundColor = 'white';
video_container.style.opacity = PLAYER_BG_OPACITY;

// style player
video_player.style.position = 'fixed';

video_player.style.top = PLAYER_TOP;
video_player.style.left = PLAYER_LEFT;

video_player.style.width = PLAYER_WIDTH;
video_player.style.height = PLAYER_HEIGHT;

video_player.style.backgroundColor = 'black';



// click off listener
video_container.addEventListener('click', () => {
    // animation
    let keyframe_1 = { opacity: PLAYER_BG_OPACITY };
    let keyframe_2 = { opacity: 0 };
    let ms = 333;


    let fade_out = video_container.animate([keyframe_1, keyframe_2], ms);

    setTimeout(() => {
        video_container.style.display = 'none';
    }, ms)
});


// function that overlays the video player + container
function showVideoPlayer() {

    video_container.style.display = 'block';
    video_container.style.position = 'fixed';
    video_container.style.left = 0;
    video_container.style.top = 0;
    video_container.style.width = '100%';
    video_container.style.height = '100%';

    // animation
    let keyframe_1 = { opacity: 0 };
    let keyframe_2 = { opacity: PLAYER_BG_OPACITY };
    let ms = 333;

    video_container.animate([keyframe_1, keyframe_2], ms);

    video_player.style.opacity = 1;

    console.log (video_player);
}

// exports
export { showVideoPlayer };