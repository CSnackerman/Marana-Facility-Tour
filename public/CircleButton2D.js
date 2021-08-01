import { WIDTH, HEIGHT, R_MODE } from './config.js';
import { showVideoPlayer } from './videoplayer.js';

export class CircleButton2D {

    constructor () {

        this.x = 0;
        this.y = 0;
        this.sz = 125;

        this.tempx = 0;
        this.tempy = 0;

        this.start_offset_x = 0;
        this.start_offset_y = 0;

        this.spritesheet = new Image();
        this.spritesheet.src = './images/videoicon-anim.png';

        this.cssFont ='bold 8pt Roboto-Bold';
        this.textVal1 = 'T1';
        this.textVal2 = 'T2';
        
        this.text1_x = 0;
        this.text1_y = 0;
        this.text1_w = 0;

        this.text2_x = 0;
        this.text2_y = 0;
        this.text2_w = 0;

        this.s_x = 0;
        this.s_y = 0;
        this.s_w = 130;
        this.s_h = 130;
        
        this.isHovered = false;
    }
    
    static anim_speed = 77; // ms
    static frame = 0;

// --- inits ---

    initHowBuilt() {

        this.textVal1 = 'HOW IT';
        this.textVal2 = 'WAS BUILT';

        if (R_MODE === 'desktop' || R_MODE === 'tablet' || R_MODE === 'mobile') {
            this.x = WIDTH / 2 - this.sz / 2;
            this.y = HEIGHT / 2 - this.sz / 2;
        }   

        console.log (this)
    }

    initWhatDo() {

        this.textVal1 = 'WHAT WE';
        this.textVal2 = 'DO HERE';

        if (R_MODE === 'desktop' || R_MODE === 'tablet'     || R_MODE === 'mobile') {
            this.x = WIDTH * 0.71 - this.sz / 2;
            this.y = HEIGHT * 0.25 - this.sz / 2;
        }

        console.log (this)
    }

// -----

    static advanceFrame () {
        CircleButton2D.frame = (CircleButton2D.frame + 1) % 49;
    }

    animate() {

        if (this.isHovered === false) {

            let row = Math.floor (CircleButton2D.frame / 7);
            let col = CircleButton2D.frame % 7

            this.s_x = col * 130;
            this.s_y = row * 130;
        }
        
        // console.log (this);
    }

    setPosition(new_x, new_y) {
        this.x = new_x;
        this.y = new_y;
    }

    saveTemp() {
        this.tempx = this.x;
        this.tempy = this.y;
    }

    // for clamping
    setInitialBackgroundOffset(bgx) {
        this.start_offset_x = this.x - bgx;
    }

    draw (context) {

        // circle
        context.drawImage (
            this.spritesheet, 
            this.s_x,
            this.s_y, 
            this.s_w, 
            this.s_h, 
            this.x, 
            this.y, 
            this.sz,
            this.sz
        );
        
        // text
        this.text1_w = context.measureText (this.textVal1).width;
        this.text1_x = this.x + this.sz / 2 - this.text1_w / 2;
        this.text1_y = this.y + this.sz / 2 - 5;

        this.text2_w = context.measureText (this.textVal2).width;
        this.text2_x = this.x + this.sz / 2 - this.text2_w / 2;
        this.text2_y = this.y + this.sz / 2 + 11;

        context.font = this.cssFont;
        context.fillStyle = 'white';

        context.fillText(this.textVal1, this.text1_x, this.text1_y);
        context.fillText(this.textVal2, this.text2_x, this.text2_y);
    }
}