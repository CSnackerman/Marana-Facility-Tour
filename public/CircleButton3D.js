import { THREE } from "./ThreeModules.js";

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


        // set the textures based on name
        switch (name) {
            case 'one': 
                this.textTexure = CircleButton3D.textTextures.one;
                break;

            case 'two': 
                this.textTexure = CircleButton3D.textTextures.two;
                break;

            case 'three': 
                this.textTexure = CircleButton3D.textTextures.three;
                break;

            case 'four': 
                this.textTexure = CircleButton3D.textTextures.four;
                break;

            case 'five': 
                this.textTexure = CircleButton3D.textTextures.five;
                break;

            case 'journey': 
                this.textTexure = CircleButton3D.textTextures.journey;
                break;

            default:
                console.error ('invalid name for CircleButton3D ->', name);

        }
        this.textMaterial = new THREE.MeshBasicMaterial ({ 
            map: this.textTexure, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.textSize = sz * 0.65;
        this.textGeometry = new THREE.PlaneGeometry (this.textSize, this.textSize);
        this.textMesh = new THREE.Mesh (this.textGeometry, this.textMaterial);;

        // position and rotate text
        this.textMesh.position.set (x - 0.01, y, z);
        this.textMesh.rotation.set (rotx, roty, rotz);

        // hover stuff
        this.isHovered = false;

        console.log (this);

    }

    static allInited = false;
    static textureLoader = new THREE.TextureLoader();
    static texture = CircleButton3D.textureLoader.load ('./images/videoicon-anim-scaled.png');

    static textTextures = {
        one: CircleButton3D.textureLoader.load ('images/one.png'),
        two: CircleButton3D.textureLoader.load ('images/two.png'),
        three: CircleButton3D.textureLoader.load ('images/three.png'),
        four: CircleButton3D.textureLoader.load ('images/four.png'),
        five: CircleButton3D.textureLoader.load ('images/five.png'),
        journey: CircleButton3D.textureLoader.load ('images/journey.png'),
    };

    static animation_delay = 77; // ms
    static frame = 0;

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
    }
    
    animate () {

        setInterval (() => {

            if (!this.isHovered) {

                // advance frame
                CircleButton3D.frame = (CircleButton3D.frame + 1) % 49;
                
                // calculate row and column of texture atlas
                let row = Math.floor (CircleButton3D.frame / 7);
                let col = CircleButton3D.frame % 7;

                // set the offset (works weird)
                this.mesh.material.map.offset.set (73.1428571429 * col, 1024 - 73.1428571429 * row);

                // console.log (row, col)
                // console.log (this.mesh.material.map.offset)

            }

            
        }, CircleButton3D.animation_delay);

        
    }
    
}


export { CircleButton3D };