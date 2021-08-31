import * as THREE from 'https://cdn.skypack.dev/three@latest';

import { toggleTour } from './config.js';

import {sceneManager} from './tour.js';

import {toRad} from './Utility.js';



class ProgressButton3D {

    constructor (name, x, y, z, rotx, roty, rotz, sz, forward) {

        this.name = name;

        this.forward = forward;

        this.type = 'progress_button';

        this.material = new THREE.MeshBasicMaterial ({ 
            map: ProgressButton3D.texture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        
        this.geometry = new THREE.PlaneGeometry (sz, sz);
        this.mesh = new THREE.Mesh (this.geometry, this.material);
        this.mesh.name = this.name;

        // position and rotate
        this.x = x;
        this.y = y;
        this.z = z;
        this.mesh.position.set (x,y,z);
        this.mesh.rotation.set (rotx, roty, rotz);

        // hover stuff
        this.enabled = true;
        this.isHovered = false;
        this.hoverSVGElement = document.getElementById ('progress_hover');
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

            case 'prog_back':
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_one': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_two': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_three': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_four': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;
            
            case 'prog_five': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_six': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            case 'prog_seven': 
                this.hoverImageElement.src = './images/start_button_hover.jpg';
                break;

            default:
                console.error ('invalid name for ProgressButton3D ->', this.name);
        }
    }

    onHover(mousepos) {

        if ( !this.enabled ) {
            return;
        }

        console.log (this.name, 'hover');

        let x = Math.floor (mousepos.x);
        let y = Math.floor (mousepos.y);

        this.isHovered = true;

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
        this.isHovered = false;
        this.hoverSVGElement.style.display = 'none';
        this.hoverImageElement.style.display ='none';
    }

    onClick() {

        

        if (this.isHovered && this.enabled) {

            console.log ('clicked', this.name);

            // homeguard
            if (this.name === 'home') {
                console.log ('go home');
                return;
            }

            if (this.forward) {
                let nextSceneNumber = sceneManager.getSceneNumber() + 1;
                console.log ('go forward')
                sceneManager.setScene (nextSceneNumber)
            }
            else {
                let prevSceneNumber = sceneManager.getSceneNumber() - 1;
                console.log ('go back')
                sceneManager.setScene (prevSceneNumber)
            }
        }
    }

    hide() {
        this.enabled = false;
        this.isHovered = false;
        this.mesh.visible = false;

        // teleport away
        // this.mesh.position.set (10, 10, 10);
        
        console.log (this.name, 'hidden');
    }

    show() {
        this.mesh.position.set (this.x, this.y, this.z);
        this.enabled = true;
        this.mesh.visible = true;
        console.log (this.name, 'shown');
    }

    // configurations
    configForScene (sceneNum) {


        console.log ('configuring', this.name, 'for scene', sceneNum);


        if (this.name === 'home') {
            this.configHome();
        }


        if (this.name === 'prog_one') {
            this.configProgress_1 ();
        }

        else if (this.name === 'prog_two') {
            this.configProgress_2();
        }

        else if (this.name === 'prog_three') {
            this.configProgress_3();
        }

        else if (this.name === 'prog_four') {
            this.configProgress_3();
        }


        else if (this.name === 'prog_back') {
            this.configBack(sceneNum);
        }
    }

    configHome() {
        this.mesh.position.set (-0.85,0,0);
        this.mesh.rotation.set (0,Math.PI / 2,0);
    }

    configProgress_1() {
        this.mesh.position.set (0.6, -0.3, 0);
        this.mesh.rotation.set (Math.PI /2, 0, -Math.PI / 2);
    }

    configProgress_2() {
        this.x = 0.813;
        this.y = -0.222;
        this.z = -0.072;

        let rotx = toRad (93.16 )
        let roty = toRad (13.77 )
        let rotz = toRad (-91.50)
        this.mesh.rotation.set (rotx, roty, rotz);
    }

    configProgress_3() {
        this.x = 0.813;
        this.y = -0.222;
        this.z = -0.072;

        let rotx = toRad (93.16 )
        let roty = toRad (13.77 )
        let rotz = toRad (-91.50)
        this.mesh.rotation.set (rotx, roty, rotz);
    }

    configBack(sceneNum) {

        if (sceneNum === 2) {
            this.x = -0.832;
            this.y = -0.352;
            this.z = 0.033;

            let rotx = toRad (94.57)
            let roty = toRad (-43.50)
            let rotz = toRad (89.29)
            this.mesh.rotation.set (rotx, roty, rotz);

            this.mesh.scale.set (1.000, 0.623, 1.000);

        }
    }


}


export {ProgressButton3D};