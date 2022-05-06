import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

import {showVideoPlayer} from './videoplayer.js';

import {toRad} from './Utility.js';

class CircleButton3D {

    constructor (name, x, y, z, rotx, roty, rotz, sz) {

        CircleButton3D.initStatics();

        this.name = 'button_' + name;

        this.type = 'circle_button';

        this.material = new THREE.MeshBasicMaterial ({ 
            map: CircleButton3D.texture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        
        this.geometry = new THREE.PlaneGeometry (sz, sz);
        this.mesh = new THREE.Mesh (this.geometry, this.material);
        this.mesh.name = this.name;

        // position and rotate
        this.mesh.position.set (x, y, z);
        this.mesh.rotation.set (rotx, roty, rotz);

        // hover
        this.hoverElement = document.getElementById ('progress_hover');


        // set the name-based attributes
        switch (name) {

            case 'one': 
                this.textTexture = CircleButton3D.textTextures.one;
                this.hoverTexture = CircleButton3D.hoverTextures.one;
                this.vidsrc = "https://www.youtube.com/embed/LRs-BW0Sn5o";
                break;

            case 'two': 
                this.textTexture = CircleButton3D.textTextures.two;
                this.hoverTexture = CircleButton3D.hoverTextures.two;
                this.vidsrc = "https://www.youtube.com/embed/VeAkCf9SK8Y";
                break;

            case 'three': 
                this.textTexture = CircleButton3D.textTextures.three;
                this.hoverTexture = CircleButton3D.hoverTextures.three;
                this.vidsrc = "https://www.youtube.com/embed/BtlJ1y6eemQ";
                break;

            case 'four': 
                this.textTexture = CircleButton3D.textTextures.four;
                this.hoverTexture = CircleButton3D.hoverTextures.four;
                this.vidsrc  ="https://www.youtube.com/embed/oX26gNIagJ0";
                break;

            case 'five': 
                this.textTexture = CircleButton3D.textTextures.five;
                this.hoverTexture = CircleButton3D.hoverTextures.five;
                this.vidsrc = "https://www.youtube.com/embed/ovznZNkM5YU";
                break;

            case 'journey': 
                this.textTexture = CircleButton3D.textTextures.journey;
                this.hoverTexture = CircleButton3D.hoverTextures.journey;
                this.vidsrc = "https://www.youtube.com/embed/x5BSnIYGOGk";
                break;

            default:
                console.error ('invalid name for CircleButton3D ->', name);
        }
        this.textMaterial = new THREE.MeshBasicMaterial ({ 
            map: this.textTexture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.textSize = sz * 0.9;
        this.textGeometry = new THREE.PlaneGeometry (this.textSize, this.textSize);
        this.textMesh = new THREE.Mesh (this.textGeometry, this.textMaterial);
        this.textMesh.name = this.name + '_text';

        // position and rotate text
        this.textMesh.position.set (x - 0.01, y, z);
        this.textMesh.rotation.set (rotx, roty, rotz);

        // hover stuff
        this.enabled = true;
        this.hoverInterval = null;
        this.isHovered = false;
        this.hoverMaterial = new THREE.MeshBasicMaterial ({ 
            map: this.hoverTexture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.hoverGeometry = new THREE.PlaneGeometry (1, 1);
        this.hoverMesh = new THREE.Mesh (this.hoverGeometry, this.hoverMaterial);
        this.hoverMesh.name = this.name + '_hover';

        // position and rotate hover plane
        this.hoverMesh.position.set (x - 0.02, y, z);
        this.hoverMesh.rotation.set (rotx, roty, rotz);
        this.hoverScale = 0;
        this.baseScaleRate = 0.01;
        this.scaleRate = this.baseScaleRate;
        this.baseHoverScale = 0.11;
        this.maxHoverScale = 0.11;

        

        // animation frame
        
        // this.animationInterval = undefined;
        
        // console.log (this);
    }

    static allInited = false;

    static textureLoader = new THREE.TextureLoader();

    static texture = CircleButton3D.textureLoader.load ('./images/videoicon-anim-scaled.png');

    static textTextures = {
        one: CircleButton3D.textureLoader.load ('images/text-chipping.png'),
        two: CircleButton3D.textureLoader.load ('images/text-seeding.png'),
        three: CircleButton3D.textureLoader.load ('images/text-germination.png'),
        four: CircleButton3D.textureLoader.load ('images/text-plantselection.png'),
        five: CircleButton3D.textureLoader.load ('images/text-pollination.png'),
        journey: CircleButton3D.textureLoader.load ('images/text-360conveyortour.png')
    };

    static hoverTextures = {
        one: CircleButton3D.textureLoader.load ('images/hover-chipping.png'),
        two: CircleButton3D.textureLoader.load ('images/hover-seeding.png'),
        three: CircleButton3D.textureLoader.load ('images/hover-germination.png'),
        four: CircleButton3D.textureLoader.load ('images/hover-plantselection.png'),
        five: CircleButton3D.textureLoader.load ('images/hover-pollination.png'),
        journey: CircleButton3D.textureLoader.load ('images/hover-360conveyortour.png')
    }

    // animation stuff
    static animation_interval = undefined;
    static animation_delay = 77; // ms
    static growRate = 17; // ms
    static frame = 0;

    static initStatics() {
        if (!CircleButton3D.allInited) {

            CircleButton3D.texture.wrapS = THREE.RepeatWrapping;
            CircleButton3D.texture.wrapT = THREE.RepeatWrapping;

            CircleButton3D.texture.repeat.set (1 / 7, 1 / 7);

            CircleButton3D.allInited = true;

            CircleButton3D.frameAdvancer();
        }
    }

    static frameAdvancer() {

        CircleButton3D.animation_interval = setInterval ( () => {
            CircleButton3D.frame = (CircleButton3D.frame + 1) % 49;
        }, CircleButton3D.animation_delay);
    }

    addToScene(scene) {
        scene.add (this.textMesh);
        scene.add (this.hoverMesh);
        scene.add (this.mesh);
    }
    
    animate () {

        this.animationInterval = setInterval ( () => {

            if (!this.isHovered) {

                // advance frame
                
                // calculate row and column of texture atlas
                let row = Math.floor (CircleButton3D.frame / 7);
                let col = CircleButton3D.frame % 7;

                // set the offset
                this.mesh.material.map.offset.set (73.1428571429 * col, 1024 - 73.1428571429 * row);
            }
        }, CircleButton3D.animation_delay / 2 );
    }

    deanimate() {
        if (this.animationInterval === null) {
            return;
        }
        clearInterval (this.animationInterval);
    }

    onHover() {

        if ( !this.enabled || this.isHovered ) {
            return;
        }

        console.log ('hovering', this.name);

        this.hoverMesh.visible = true;

        this.hoverInterval = setInterval ( () => {

        if (this.hoverScale < this.maxHoverScale) {
            this.hoverScale += this.scaleRate;
            let s = this.hoverScale;
            this.hoverMesh.scale.set(s,s,s);
        }

        }, CircleButton3D.growRate)

        this.isHovered = true;

    }

    noHover() {
        this.isHovered = false;
        this.hoverMesh.scale.set (0.01, 0.01, 0.01);
        this.hoverScale = 0;
        this.hoverMesh.visible = false;
        
        if (this.hoverInterval === null) {
            return;
        }

        clearInterval (this.hoverInterval);
        this.hoverInterval = null;
    }

    onClick () {
        if (this.isHovered && this.enabled) {
            showVideoPlayer (this.vidsrc)
            console.log ('clicked', this.name)
        }
    }

    hide() {
        this.enabled = false;
        this.mesh.visible = false;
        this.textMesh.visible = false;
        this.hoverMesh.visible = false;

        console.log (this.name, 'hidden');
    }

    show() {
        this.enabled = true;
        this.mesh.visible = true;
        this.textMesh.visible = true;
        this.hoverMesh.visible = true;

        console.log (this.name, 'shown');
    }

    
    // configurations
    configForScene (sceneNum) {

        if (this.name === 'button_one') {
            this.configButton_1 (sceneNum);
            return;
        }

        if (this.name === 'button_two') {
            this.configButton_2 (sceneNum);
            return;
        }

        if (this.name === 'button_three') {
            this.configButton_3 (sceneNum);
            return;
        }

        if (this.name === 'button_four') {
            this.configButton_4 (sceneNum);
            return;
        }

        if (this.name === 'button_five') {
            this.configButton_5 (sceneNum);
            return;
        }

        if (this.name === 'button_journey') {
            this.configButton_Journey (sceneNum);
            return;
        }

    }

    configButton_1 (sceneNum) {

        if (sceneNum === 1) {

            this.mesh.position.set (0.85, 0, 0.07);
            this.textMesh.position.set (0.83, 0, 0.07);
            this.hoverMesh.position.set (0.81, 0, 0.07);

            this.mesh.rotation.set (0, -Math.PI/2, 0);
            this.textMesh.rotation.set (0, -Math.PI/2, 0);
            this.hoverMesh.rotation.set (0, -Math.PI/2, 0);

            this.mesh.scale.set (1, 1, 1);
            this.textMesh.scale.set (1, 1, 1);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            return;
        }

        if (sceneNum === 2) {

            this.mesh.position.set (0.636, 0, 0.696);
            this.textMesh.position.set (0.623, 0, 0.684);
            this.hoverMesh.position.set (0.609, 0, 0.671);

            let rotx = toRad (180.00);
            let roty = toRad (-39.71);
            let rotz = toRad (180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (2, 2, 2);
            this.textMesh.scale.set (2, 2, 2);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.20;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        

        if (sceneNum === 3) {

            this.mesh.position.set (-0.930, 0.011, 0.225);
            this.textMesh.position.set (-0.924, 0.011, 0.223);
            this.hoverMesh.position.set (-0.912, 0.011, 0.218);

            let rotx = toRad (180.00);
            let roty = toRad (83.92);
            let rotz = toRad (-180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (1,1,1);
            this.textMesh.scale.set (1,1,1);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }
    }

    configButton_2 (sceneNum) {

        if (sceneNum === 4) {

            this.mesh.position.set (0.477,0.011,-0.788);
            this.textMesh.position.set (0.444,0.011,-0.742);
            this.hoverMesh.position.set (0.416,0.011,-0.703);

            let rotx = toRad (0.00);
            let roty = toRad (-75.40);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (2,2,2);
            this.textMesh.scale.set (2,2,2);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 5) {

            this.mesh.position.set (0.778,0.011,-0.047);
            this.textMesh.position.set (0.711,0.011,-0.038);
            this.hoverMesh.position.set (0.695,0.011,-0.049);

            let rotx = toRad (0.00);
            let roty = toRad (-89.60);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (2,2,2);
            this.textMesh.scale.set (2,2,2);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 6) {

            this.mesh.position.set (0.503,0.011,0.584);
            this.textMesh.position.set (0.497,0.011,0.577);
            this.hoverMesh.position.set (0.483,0.011,0.571);

            let rotx = toRad (-180.00);
            let roty = toRad (-88.31);
            let rotz = toRad (-180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (2,2,2);
            this.textMesh.scale.set (2,2,2);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }
    }

    configButton_3 (sceneNum) {

        if (sceneNum === 4) {
            this.mesh.position.set (-0.247,0.011,-0.880);
            this.textMesh.position.set (-0.233,0.011,-0.823);
            this.hoverMesh.position.set (-0.200,0.011,-0.770);

            let rotx = toRad (0.00);
            let roty = toRad (71.87);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (1.700,1.700,1.700);
            this.textMesh.scale.set (2,2,2);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 5) {
            this.mesh.position.set (-0.452,0.011,-0.809);
            this.textMesh.position.set (-0.449,0.011,-0.806);
            this.hoverMesh.position.set (-0.447,0.011,-0.797);

            let rotx = toRad (0.00);
            let roty = toRad (64.53);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 1.5;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 6) {

            this.mesh.position.set (-0.831,0.011,-0.165);
            this.textMesh.position.set (-0.827,0.011,-0.164);
            this.hoverMesh.position.set (-0.812,0.011,-0.148);

            let rotx = toRad (-180.00);
            let roty = toRad (79.45);
            let rotz = toRad (180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 2;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 7) {

            this.mesh.position.set (-0.376,0.052,0.850);
            this.textMesh.position.set (-0.375,0.052,0.849);
            this.hoverMesh.position.set (-0.374,0.052,0.848);

            let rotx = toRad (-180.00);
            let roty = toRad (38.00);
            let rotz = toRad (180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 1;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }
    }

    configButton_4 (sceneNum) {

        if (sceneNum === 6) {
            this.mesh.position.set (0.164,0.052,-0.960);
            this.textMesh.position.set (0.164,0.051,-0.957);
            this.hoverMesh.position.set (0.163,0.051,-0.945);

            let rotx = toRad (0.00);
            let roty = toRad (-8.44);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 0.9;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 7) {
            this.mesh.position.set (0.382,0.052,-0.795);
            this.textMesh.position.set (0.380,0.051,-0.791);
            this.hoverMesh.position.set (0.379,0.051,-0.781);

            let rotx = toRad (0.00);
            let roty = toRad (-8.44);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 2;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 8) {
            this.mesh.position.set (0.489,0.052,-0.084);
            this.textMesh.position.set (0.484,0.051,-0.084);
            this.hoverMesh.position.set (0.482,0.051,-0.084);

            let rotx = toRad (0.00);
            let roty = toRad (-90);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 1.7;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }
    }

    configButton_5 (sceneNum) {

        if (sceneNum === 3) {

            this.mesh.position.set (0.969, 0.011, -0.096);
            this.textMesh.position.set (0.960, 0.011, -0.095);
            this.hoverMesh.position.set (0.947, 0.011, -0.094);

            let rotx = toRad (-180.00);
            let roty = toRad (-81.41);
            let rotz = toRad (-180.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 0.900;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;
            return;
        }

        if (sceneNum === 4) {

            this.mesh.position.set (0.782,0.011,0.113);
            this.textMesh.position.set (0.769,0.011,0.112);
            this.hoverMesh.position.set (0.766,0.011,0.105);

            let rotx = toRad (0.00);
            let roty = toRad (-75.40);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 2;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;
            return;
        }

        if (sceneNum === 5) {

            this.mesh.position.set (0.321,0.011,0.791);
            this.textMesh.position.set (0.317,0.011,0.777);
            this.hoverMesh.position.set (0.313,0.011,0.786);

            let rotx = toRad (180.00);
            let roty = toRad (-70.54);
            let rotz = toRad (180.20);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 1.7;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = this.baseHoverScale * 2;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;
            return;
        }
    }

    configButton_Journey (sceneNum) {
        if (sceneNum === 6) {
            this.mesh.position.set (0.061,0.136,-0.960);
            this.textMesh.position.set (0.061,0.135,-0.957);
            this.hoverMesh.position.set (0.059,0.131,-0.946);

            let rotx = toRad (0.00);
            let roty = toRad (-8.44);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 0.9;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 7) {
            this.mesh.position.set (0.061,0.136,-0.960);
            this.textMesh.position.set (0.061,0.135,-0.957);
            this.hoverMesh.position.set (0.059,0.131,-0.946);

            let rotx = toRad (0.00);
            let roty = toRad (-8.44);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 1.1;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }

        if (sceneNum === 8) {
            this.mesh.position.set (0.061,0.136,-0.95);
            this.textMesh.position.set (0.061,0.135,-0.947);
            this.hoverMesh.position.set (0.059,0.131,-0.944);

            let rotx = toRad (0.00);
            let roty = toRad (-8.44);
            let rotz = toRad (0.00);

            this.mesh.rotation.set (rotx, roty, rotz);
            this.textMesh.rotation.set (rotx, roty, rotz);
            this.hoverMesh.rotation.set (rotx, roty, rotz);

            let scale = 3;
            this.mesh.scale.set (scale, scale, scale);
            this.textMesh.scale.set (scale, scale, scale);
            this.hoverMesh.scale.set (0.1, 0.1, 0.1);

            this.maxHoverScale = 0.1 * scale;
            this.scaleRate = this.baseScaleRate * this.maxHoverScale / this.baseHoverScale;

            return;
        }
    }
    
}


export { CircleButton3D };