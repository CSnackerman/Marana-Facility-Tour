import {THREE} from './ThreeModules.js'
import {OrbitControls} from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle, toggleTour } from './config.js';
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

// mouse
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

function handleIntersections () {
    
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects ( intersectables );

    if (intersects.length > 0) {

        if (button1.mesh.uuid === intersects [0].object.uuid) {
            button1.onHover();
        }
    }
    else {
        button1.noHover();
    }
}

// camera
const camera = new THREE.PerspectiveCamera (
    75, window.innerWidth / window.innerHeight, 0.1, 1000 
);
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
let intersectables = [];
const button1 = new CircleButton3D (
    'one',          // name
    0.85, 0, 0.07,  // position
    0, -Math.PI/2, 0,  // rotation
    0.1                 // size
);
button1.animate();

intersectables.push (button1.mesh);



// scene management
scene.add( scene_1_sphere );
button1.addToScene (scene);
// scene.add (button1.mesh);



// ----------------------------------------------------------------------

const runTour = function () {
    
    controls.update();

    handleIntersections();

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


canvas.addEventListener ('mousemove', (e) => {

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
})

document.addEventListener ('wheel', (e) => {

    // guard
    if ( tourToggle === 'home' ) {
        return;
    }

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