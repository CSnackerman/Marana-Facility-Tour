import {THREE} from './ThreeModules.js'
import {OrbitControls} from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle } from './config.js';
import { HEIGHT, WIDTH } from './config.js';

import { CircleButton3D } from './CircleButton3D.js';

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
camera.position.x = -0.1;

// controls 
const controls = new OrbitControls(camera, canvas);
controls.rotateSpeed = -0.5;
controls.panSpeed = 0;
controls.target.set(0, 0, 0);
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// geometry
const texLoader = new THREE.TextureLoader();
const sphere_1 = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene1v7.png'), 
    side: THREE.BackSide
} );

// spheres
const scene_1_sphere = new THREE.Mesh( sphere_1, material );

// buttons  
const button1 = new CircleButton3D (
    'one',          // name
    0.85, 0, 0.07,  // position
    0, -Math.PI/2, 0,  // rotation
    0.1                 // size
);
button1.animate();



// scene management
scene.add( scene_1_sphere );
button1.addToScene (scene);
// scene.add (button1.mesh);



// ----------------------------------------------------------------------

const runTour = function () {
    
    controls.update();

    renderer.render( scene, camera );


    if (tourToggle === 'home') {
        return
    }

    requestAnimationFrame( runTour );
};

// ----------- Listeners ------------------------------


window.addEventListener ('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize (window.innerWidth, window.innerHeight);
}, false);


document.addEventListener ('wheel', (e) => {
    let dampener = 10;
    let delta = e.deltaY / dampener;
    camera.fov += delta;

    if (camera.fov < 30) {
        camera.fov = 30;
    }
    
    if (camera.fov > 115) {
        camera.fov = 115;
    }

    camera.updateProjectionMatrix();
})




export { runTour };