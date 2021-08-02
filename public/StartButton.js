import { WIDTH, HEIGHT, R_MODE } from './config.js';

export class StartButton {

    constructor () {

        this.x = 0;
        this.y = 0;
        this.w = 250;
        this.h = 200;

        this.tempx = 0;
        this.tempy = 0;

        this.start_offset_x = 0;
        this.start_offset_y = 0;

        this.image = new Image();
        this.image.src = './images/directional-arrow-rotated.png';
        
        this.isHovered = false;
    }

// -----

    init(bg_w, bg_h) {
        
        // desired position relative to bg (%)
        let percent_x = 0.61;
        let percent_y = 0.5;

        // convert to screen coords (px)
        this.x = percent_x * bg_w - bg_w / 2 + WIDTH / 2;
        this.y = bg_h * percent_y;
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
            this.image,  
            this.x, 
            this.y, 
            this.w,
            this.h
        );
    }
}