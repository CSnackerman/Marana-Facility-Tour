import * as THREE from 'https://cdn.skypack.dev/three@latest';

import {showVideoPlayer} from './videoplayer.js';

class CircleButton3D {

    constructor (name, x, y, z, rotx, roty, rotz, sz) {

        CircleButton3D.initStaticTexture();

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

        

        // animation frame
        this.frame = 0;
        this.animationInterval = undefined;
        
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
    static animation_delay = 77; // ms
    static growRate = 17; // ms

    static initStaticTexture() {
        if (!CircleButton3D.allInited) {

            CircleButton3D.texture.wrapS = THREE.RepeatWrapping;
            CircleButton3D.texture.wrapT = THREE.RepeatWrapping;

            CircleButton3D.texture.repeat.set (1 / 7, 1 / 7);

            CircleButton3D.allInited = true;
        }
    }

    addToScene(scene) {
        scene.add (this.mesh);
        scene.add (this.textMesh);
        scene.add (this.hoverMesh);
    }
    
    animate () {

        this.animationInterval = setInterval ( () => {

            if (!this.isHovered) {

                // advance frame
                this.frame = (this.frame + 1) % 49;
                
                // calculate row and column of texture atlas
                let row = Math.floor (this.frame / 7);
                let col = this.frame % 7;

                // set the offset
                this.mesh.material.map.offset.set (73.1428571429 * col, 1024 - 73.1428571429 * row);
            }
        }, CircleButton3D.animation_delay);
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

        if (this.hoverScale < 0.1) {
            this.hoverScale += 0.01;
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
    
}


export { CircleButton3D };