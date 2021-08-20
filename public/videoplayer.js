import { PLAYER_BG_OPACITY }            from './config.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT }  from './config.js';
import { PLAYER_TOP, PLAYER_LEFT }      from './config.js';

// get video player container
const video_container = document.getElementById('video_container');

// create component
const video_player = document.getElementById('video_player');


// style container
video_container.style.backgroundColor = 'black';
video_container.style.opacity = PLAYER_BG_OPACITY;
video_container.style.border = 'none';

// style player
video_player.style.position = 'fixed';

video_player.style.zIndex = 1000;

video_player.style.top = PLAYER_TOP;
video_player.style.left = PLAYER_LEFT;

video_player.style.width = PLAYER_WIDTH;
video_player.style.height = PLAYER_HEIGHT;

video_player.style.backgroundColor = 'transparent';

video_player.style.display = 'none';



// click off listener
video_container.addEventListener('click', () => {
    // animation
    let keyframe_1 = { opacity: PLAYER_BG_OPACITY };
    let keyframe_2 = { opacity: 0 };
    let ms = 333;

    let fade_out = video_container.animate([keyframe_1, keyframe_2], ms);
    video_player.animate ([keyframe_1, {opacity:1}], ms)

    video_player.style.display = 'none';

    setTimeout(() => {
        video_container.style.display = 'none';
    }, ms)
});

window.addEventListener('resize', (e) => {
    
    video_player.style.top = PLAYER_TOP;
    video_player.style.left = PLAYER_LEFT;

    video_player.style.width = PLAYER_WIDTH;
    video_player.style.height = PLAYER_HEIGHT;
});


// function that overlays the video player + container
function showVideoPlayer(videosrc) {

    video_player.src = videosrc;

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

    setTimeout(() => {
        video_player.style.display = 'block';
    }, ms)


    // console.log (video_player);
}

// exports
export { showVideoPlayer };