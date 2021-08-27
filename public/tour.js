import {THREE} from './ThreeModules.js'
import {OrbitControls} from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle } from './config.js';
import { HEIGHT, WIDTH } from './config.js';

// setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = renderer.domElement;
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.style.zIndex = 5;
canvas.style.position = 'fixed';

document.body.appendChild( canvas );

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// controls 
const controls = new OrbitControls(camera, canvas);
controls.rotateSpeed = -0.5;
controls.panSpeed = 0;
controls.target.set(0, 0, 0);
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

// geometry
const texLoader = new THREE.TextureLoader();
const sphere_1 = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene1v7.png'), 
    side: THREE.BackSide
} );

const scene_1_sphere = new THREE.Mesh( sphere_1, material );
scene.add( scene_1_sphere );

camera.position.z = 0.1;

// ----------------------------------------------------------------------


const runTour = function () {

    controls.update();
    
    renderer.render( scene, camera );

    if (tourToggle === 'home') {
        return
    }

    
    requestAnimationFrame( runTour );
};

window.addEventListener ('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize (window.innerWidth, window.innerHeight);
}, false);

export { runTour };