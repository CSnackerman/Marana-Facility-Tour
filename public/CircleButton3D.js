// import { THREE } from "./ThreeModules.js";
import * as THREE from 'https://cdn.skypack.dev/three@latest';

class CircleButton3D {

    constructor (name, x, y, z, rotx, roty, rotz, sz) {

        CircleButton3D.initStaticTexture();

        this.material = new THREE.MeshBasicMaterial ({ 
            map: CircleButton3D.texture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        
        this.geometry = new THREE.PlaneGeometry (sz, sz);
        this.mesh = new THREE.Mesh (this.geometry, this.material);

        // position and rotate
        this.mesh.position.set (x, y, z);
        this.mesh.rotation.set (rotx, roty, rotz);

        // hover
        this.hoverElement = document.getElementById ('progress_hover');


        // set the textures based on name
        switch (name) {

            case 'one': 
                this.textTexture = CircleButton3D.textTextures.one;
                this.hoverTexture = CircleButton3D.hoverTextures.one;
                break;

            case 'two': 
                this.textTexture = CircleButton3D.textTextures.two;
                this.hoverTexture = CircleButton3D.hoverTextures.two;
                break;

            case 'three': 
                this.textTexture = CircleButton3D.textTextures.three;
                this.hoverTexture = CircleButton3D.hoverTextures.three;
                break;

            case 'four': 
                this.textTexture = CircleButton3D.textTextures.four;
                this.hoverTexture = CircleButton3D.hoverTextures.four;
                break;

            case 'five': 
                this.textTexture = CircleButton3D.textTextures.five;
                this.hoverTexture = CircleButton3D.hoverTextures.five;
                break;

            case 'journey': 
                this.textTexture = CircleButton3D.textTextures.journey;
                this.hoverTexture = CircleButton3D.hoverTextures.journey;
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
        this.textMesh = new THREE.Mesh (this.textGeometry, this.textMaterial);;

        // position and rotate text
        this.textMesh.position.set (x - 0.01, y, z);
        this.textMesh.rotation.set (rotx, roty, rotz);


        
        // hover stuff
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

        // position and rotate hover plane
        this.hoverMesh.position.set (x - 0.02, y, z);
        this.hoverMesh.rotation.set (rotx, roty, rotz);
        this.hoverScale = 0;

        console.log (this);

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
    static frame = 0;
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

        setInterval ( () => {

            if (!this.isHovered) {

                // advance frame
                CircleButton3D.frame = (CircleButton3D.frame + 1) % 49;
                
                // calculate row and column of texture atlas
                let row = Math.floor (CircleButton3D.frame / 7);
                let col = CircleButton3D.frame % 7;

                // set the offset
                this.mesh.material.map.offset.set (73.1428571429 * col, 1024 - 73.1428571429 * row);
            }
        }, CircleButton3D.animation_delay);
    }

    onHover() {

        if (this.isHovered) {
            return;
        }

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
    
}


export { CircleButton3D };