import * as THREE from 'https://cdn.skypack.dev/three@latest';

class ProgressButton3D {

    constructor (name, x, y, z, rotx, roty, rotz, sz) {

        this.name = name;

        this.material = new THREE.MeshBasicMaterial ({ 
            map: ProgressButton3D.texture, 
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
        this.hoverSVGElement = document.getElementById ('progress_hover');

        // set the hover image based on name
        this.hoverImageElement = document.getElementById ('progress_hover_image');
        

    }

    static textureLoader = new THREE.TextureLoader();

    static texture = ProgressButton3D.textureLoader.load ('./images/directional-arrow.png');


    addToScene(scene) {
        scene.add (this.mesh);
    }

    setHoverImageSource() {
        switch (this.name) {

            case 'home': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_one': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            default:
                console.error ('invalid name for ProgressButton3D ->', this.name);
        }
    }

    onHover(mousepos) {

        let x = Math.floor (mousepos.x);
        let y = Math.floor (mousepos.y);

        // svg
        this.hoverSVGElement.style.display = 'block';
        this.hoverSVGElement.style.left = x - 75;
        this.hoverSVGElement.style.top = y + 25;

        // image
        this.setHoverImageSource();
        this.hoverImageElement.style.display = 'block'
        this.hoverImageElement.style.left = String(x - 70) + 'px';
        this.hoverImageElement.style.top = String(y + 42) + 'px';
    }

    noHover() {
        this.hoverSVGElement.style.display = 'none';
        this.hoverImageElement.style.display ='none';
    }

    onClick() {
        
    }


}


export {ProgressButton3D};