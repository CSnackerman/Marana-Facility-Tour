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

        this.hoverImage = new Image();
        this.hoverImage.src = './images/start_button_hover.jpg';
        this.hover_x = 0;
        this.hover_y = 0;
        this.hover_w = 150;
        this.hover_h = 155;

        this.hoverBorderX = 0;
        this.hoverBorderY = 0;
        this.hoverBorderOffsetX = 10;
        this.hoverBorderOffsetY = 40;
        this.hoverBorderW = this.hover_w + this.hoverBorderOffsetX;
        this.hoverBorderH = this.hover_h + this.hoverBorderOffsetY;
        this.hoverMouseOffsetX = this.hover_w / 2
        this.hoverMouseOffsetY = -65
        
        this.isHovered = false;
    }

// -----

    init (bg_w, bg_h) {
        
        // desired position relative to bg (%)
        let percent_x = 0.61;
        let percent_y = 0.5;

        // convert to screen coords (px)
        this.x = percent_x * bg_w - bg_w / 2 + WIDTH / 2;
        this.y = bg_h * percent_y;
    }

    setPosition (new_x, new_y) {
        this.x = new_x;
        this.y = new_y;
    }

    saveTemp () {
        this.tempx = this.x;
        this.tempy = this.y;
    }

    // for clamping
    setInitialBackgroundOffset (bgx) {
        this.start_offset_x = this.x - bgx;
    }

    collidePointer(mx, my) {
        if (
            mx > this.x && 
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        ) {
            this.isHovered = true;
            return true;
        }

        this.isHovered = false;
        return false;
    }

    onHover(e) {

        this.isHovered = true;

        let mx = e.clientX;
        let my = e.clientY;

        this.hover_x = mx - this.hoverMouseOffsetX;
        this.hover_y = my - this.hoverMouseOffsetY;

        this.hoverBorderX = mx - this.hoverBorderOffsetX / 2 - this.hoverMouseOffsetX;
        this.hoverBorderY = my - this.hoverBorderOffsetY / 2 - this.hoverMouseOffsetY;
    }

    draw (context) {

        context.drawImage (
            this.image,  
            this.x, 
            this.y, 
            this.w,
            this.h
        );

        if (this.isHovered) {

            
            // fill bg
            context.fillStyle = "#0d2b4a77";

            context.fillRect (
                this.hoverBorderX,
                this.hoverBorderY,
                this.hoverBorderW,
                this.hoverBorderH
            )

            // stroke bg border
            context.strokeStyle = "#00FFFF";
            context.lineWidth = "0.5";
            context.beginPath();
            context.rect(
                this.hoverBorderX,
                this.hoverBorderY,
                this.hoverBorderW,
                this.hoverBorderH
            );
            context.stroke();

            context.drawImage (
                this.hoverImage,
                this.hover_x,
                this.hover_y,
                this.hover_w,
                this.hover_h
            )
        }
    }
}