import { THREE } from "./ThreeModules.js";

class CircleButton3D {

    constructor (x, y, z, rotx, roty, rotz, sz) {

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

        // hover stuff
        this.isHovered = false;

        console.log (this);

    }

    static allInited = false;
    static textureLoader = new THREE.TextureLoader();
    static texture = CircleButton3D.textureLoader.load ('./images/videoicon-anim-scaled.png');

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