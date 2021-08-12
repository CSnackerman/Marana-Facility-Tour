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
        this.hover_w = 140;
        this.hover_h = 145;

        this.hoverBorderRadius = 10;
        this.hoverBorderX = 0;
        this.hoverBorderY = 0;
        this.hoverBorderOffsetX = 0;
        this.hoverBorderOffsetY = 15;
        this.hoverBorderW = this.hover_w + this.hoverBorderOffsetX * 2 - this.hoverBorderRadius;
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

    onClick() {
        console.log("clicked start button");
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

    resetHover() {
        this.isHovered = false;
    }

    onHover(e) {

        this.isHovered = true;

        let mx = e.clientX;
        let my = e.clientY;

        this.hover_x = mx - this.hoverMouseOffsetX;
        this.hover_y = my - this.hoverMouseOffsetY;

        this.hoverBorderX = mx - this.hoverMouseOffsetX + this.hoverBorderOffsetX / 2 + this.hoverBorderRadius / 2;
        this.hoverBorderY = my - this.hoverMouseOffsetY - this.hoverBorderOffsetY - 3;

        // clamp within screen
        if (this.hoverBorderX + this.hoverBorderW + this.hoverBorderRadius - 1 > WIDTH) {
            this.hover_x = WIDTH - this.hover_w - this.hoverBorderRadius / 2;
            this.hoverBorderX = WIDTH - this.hoverBorderW - this.hoverBorderRadius - 1;
        }

        if (this.hoverBorderY + this.hoverBorderH + this.hoverBorderRadius * 2  > HEIGHT) {
            this.hover_y = HEIGHT - this.hover_h - this.hoverBorderRadius * 2 + 3;
            this.hoverBorderY = HEIGHT - this.hoverBorderH - this.hoverBorderRadius * 2;
        }
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

            // hover style
            context.fillStyle = "#0d2b4a99";
            context.strokeStyle = "#3ea3ce";
            context.lineWidth = "1.9";
            
            // build Path2D string data
            let bRadius = String (this.hoverBorderRadius);
            let bX = String (this.hoverBorderX);
            let bY = String (this.hoverBorderY);
            let bW = String (this.hoverBorderW);
            let bH = String (this.hoverBorderH);
            let pathString = 
                "M" + bX + "," + bY + 
                " h" + bW + 
                " a" + bRadius + "," + bRadius + " 0 0 1 " + bRadius + "," + bRadius + 
                " v" + bH + 
                " a" + bRadius + "," + bRadius + " 0 0 1 -" + bRadius + "," + bRadius + 
                " h-" + bW + 
                " a" + bRadius + "," + bRadius + " 0 0 1 -" + bRadius + ",-" + bRadius + 
                " v-" + bH + 
                " a" + bRadius + "," + bRadius + " 0 0 1 " + bRadius + ",-" + bRadius + " z";

            let roundedRect = new Path2D (pathString);           
            
            // draw
            context.stroke(roundedRect);
            context.fill(roundedRect);
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