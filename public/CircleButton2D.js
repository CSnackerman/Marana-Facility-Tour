import { WIDTH, HEIGHT, R_MODE } from './config.js';
import { showVideoPlayer } from './videoplayer.js';

export class CircleButton2D {

    constructor () {

        // position
        this.x = 0;
        this.y = 0;

        // position of center
        this.center_x = 0;
        this.center_y = 0;

        // size
        this.sz = 135;
        
        // for panning
        this.tempx = 0;
        this.tempy = 0;

        this.start_offset_x = 0;
        this.start_offset_y = 0;

        // image
        this.spritesheet = new Image();
        this.spritesheet.src = './images/videoicon-anim.png';

        this.s_x = 0;
        this.s_y = 0;
        this.s_w = 130;
        this.s_h = 130;

        // text
        this.cssFont ='bold 9pt Roboto-Bold';

        this.textVal_1 = 'T1';

        this.text_1_x = 0;
        this.text_1_y = 0;
        this.text_1_w = 0;

        this.textVal_2 = 'T2';

        this.text_2_x = 0;
        this.text_2_y = 0;
        this.text_2_w = 0;

        // hover animation
        this.hoverImg = new Image();

        this.hover_x = 0;
        this.hover_y = 0;
        
        this.hoverSize = 0;
        this.scaleSpeed = 1;

        this.hoverCenter_x = 0;
        this.hoverCenter_y = 0;

        this.isHovered = false;
        this.hoverAnimFinished = false;
    }
    
    static anim_speed = 77; // ms
    static scale_up_speed = 11;
    static frame = 0;

// --- inits ---

    initHowBuilt(bg_w, bg_h) {

        // set text
        this.textVal_1 = 'HOW IT ';
        this.textVal_2 = 'WAS BUILT  ';        

        // desired position relative to bg (%)
        let percent_x = 0.45;
        let percent_y = 0.3;

        // convert to screen coords (px)
        this.x = percent_x * bg_w - bg_w / 2 + WIDTH / 2;
        this.y = bg_h * percent_y;

        // center coords
        this.center_x = this.x + this.sz / 2;
        this.center_y = this.y + this.sz / 2;

        // set hover image
        this.hoverImg.src = './images/hover-howitwasbuilt.png';

        // console.log (this)
    }

    initWhatDo(bg_w, bg_h) {

        // set text
        this.textVal_1 = 'WHAT WE';
        this.textVal_2 = 'DO HERE';        

        // desired position relative to bg (%)
        let percent_x = 0.63;
        let percent_y = 0.23;

        // convert to screen coords (px)
        this.x = percent_x * bg_w - bg_w / 2 + WIDTH / 2;
        this.y = bg_h * percent_y;

        // center coords
        this.center_x = this.x + this.sz / 2;
        this.center_y = this.y + this.sz / 2;

        // set hover image
        this.hoverImg.src = './images/hover-overview.png';

        // console.log (this)
    }

// -----

    static advanceFrame () {
        // 49 total frames on the spritesheet
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

    collidePointer(mx, my) {
        if (
            mx > this.x && 
            mx < this.x + this.sz &&
            my > this.y &&
            my < this.y + this.sz
        ) {
            this.isHovered = true;
            return true;
        }

        this.isHovered = false;
        return false;
    }

    onClick() {
        showVideoPlayer();
        this.isHovered = false;
    }

    onHover() {
        this.isHovered = true;
    }

    resetHover() {
        this.hoverSize = 1;
        this.hover_x = this.center_x;
        this.hovery_y = this.center_y;
        this.isHovered = false;
    }

    setPosition(new_x, new_y) {
        this.x = new_x;
        this.y = new_y;

        this.center_x = this.x + this.sz / 2;
        this.center_y = this.y + this.sz / 2;
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
        this.text_1_w = context.measureText (this.textVal_1).width;
        this.text_1_x = this.x + this.sz / 2 - this.text_1_w / 2;
        this.text_1_y = this.y + this.sz / 2 - 5;

        this.text_2_w = context.measureText (this.textVal_2).width;
        this.text_2_x = this.x + this.sz / 2 - this.text_2_w / 2;
        this.text_2_y = this.y + this.sz / 2 + 11;

        context.font = this.cssFont;
        context.fillStyle = 'white';

        context.fillText(this.textVal_1, this.text_1_x, this.text_1_y);
        context.fillText(this.textVal_2, this.text_2_x, this.text_2_y);

        // hover
        if (this.isHovered) {

            // scale up
            if (this.hoverSize < this.sz) {
                this.hoverSize += CircleButton2D.scale_up_speed;
            }

            // position  
            this.hover_x = this.center_x - this.hoverSize / 2;
            this.hover_y = this.center_y - this.hoverSize / 2;

            context.drawImage (
                this.hoverImg,
                this.hover_x,
                this.hover_y,
                this.hoverSize,
                this.hoverSize
            );
        }
        
    
    }
}