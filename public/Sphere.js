import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

class Sphere {

    constructor (name, rotz) {

        this.name = 'sphere_' + name;
        this.geometry = new THREE.SphereGeometry (1, 32, 32);
        
        this.textureSrc = undefined;
        if (name === 'one') { this.textureSrc = 'images/scene1v7.png'; }
        else if (name === 'two') { this.textureSrc = 'images/scene2.png'; }
        else if (name === 'three') { this.textureSrc = 'images/scene3_v1.png'; }
        else if (name === 'four') { this.textureSrc = 'images/scene4_v1.png'; }
        else if (name === 'five') { this.textureSrc = 'images/scene5_v1.png'; }
        else if (name === 'six') { this.textureSrc = 'images/scene6_v1.png'; }
        else if (name === 'seven') { this.textureSrc = 'images/scene7v1.png'; }
        else if (name === 'eight') { this.textureSrc = 'images/scene8_v1.png'; }
        else {
            console.error ('invalid Sphere name');
        }

        this.material = new THREE.MeshBasicMaterial ({ 
            map: Sphere.textureLoader.load ( this.textureSrc ), 
            side: THREE.BackSide
        });

        this.mesh = new THREE.Mesh ( this.geometry, this.material );
        this.mesh.name = this.name;

        this.mesh.position.set (0, 0, 0);
        this.mesh.rotation.set (0, 0, rotz);
    }

    static textureLoader = new THREE.TextureLoader();

    addToScene(scene) {
        scene.add (this.mesh);
    }

}


export { Sphere };