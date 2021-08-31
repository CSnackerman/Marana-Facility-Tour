import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OrbitControls  } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle, toggleTour } from './config.js';

import { SceneManager } from './SceneManager.js';
import { Sphere } from './Sphere.js';
import { CircleButton3D } from './CircleButton3D.js';
import { ProgressButton3D } from './ProgressButton3D.js';

// setup
const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = renderer.domElement;
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.style.zIndex = 5;
canvas.style.position = 'fixed';

document.body.appendChild ( canvas );

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


/* Spheres */
const sphere1 = new Sphere ('one', 0);
// const sphere2 = new Sphere ('two', 0);
// const sphere3 = new Sphere ('three', 0);
// const sphere4 = new Sphere ('four', 0);
// const sphere5 = new Sphere ('five', 0);
// const sphere6 = new Sphere ('six', 0);
// const sphere7 = new Sphere ('seven', 0);
// const sphere8 = new Sphere ('eight', 0);


var swappingSphere = null;


/* Circle Buttons */

const button1 = new CircleButton3D (
    'one',          // name
    0.85, 0, 0.07,  // position
    0, -Math.PI/2, 0,  // rotation
    0.1                 // size
);


// const button2 = new CircleButton3D (
//     'two',
//     0,0,0,
//     0, 0, 0,
//     0.1
// );

// const button3 = new CircleButton3D (
//     'three',
//     0, 0.4, 0.3,
//     0, 0, 0,
//     0.1
// );

// const button4 = new CircleButton3D (
//     'four',
//     0.3, 0, 0.6,
//     0, 0, 0,
//     0.1
// );

// const button5 = new CircleButton3D (
//     'five',
//     0, -0.2, 0.7,
//     0, 0, 0,
//     0.1
// );

// const buttonJourney = new CircleButton3D (
//     'journey',
//     -0.7, 0, 0.7,
//     0, 0, 0,
//     0.1
// );

button1.animate();
// button2.animate();
// button3.animate();
// button4.animate();
// button5.animate();
// buttonJourney.animate();


const circleButtons = [ 
    button1,
    // button2,
    // button3,
    // button4,
    // button5,
    // buttonJourney
];

/* Progress Buttons */

const progressHome = new ProgressButton3D (
    'home',
    -0.85,0,0,
    0,Math.PI / 2,0,
    0.4,
    false
)

// const progressBack = new ProgressButton3D (
//     'prog_back',
//     10,10,10,
//     0,Math.PI / 2,0,
//     0.4,
//     false
// )

const progress1 = new ProgressButton3D (
    'prog_one',
    0.6, -0.3, 0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);

// const progress2 = new ProgressButton3D (
//     'prog_two',
//     10, 10, 10,
//     Math.PI /2, 0, -Math.PI / 2,
//     0.3,
//     true
// );



const progressButtons = [
    progressHome, 
    // progressBack,
    progress1,
    // progress2
]



/* collision detection */
let mouse = new THREE.Vector2();
let pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

let intersectables = [];

circleButtons.forEach ( (button) => {
    intersectables.push (button.mesh);
})

progressButtons.forEach ( (button) => {
    intersectables.push (button.mesh);
})

function handleIntersections () {
    
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects ( intersectables );

    if (intersects.length > 0) {

        if (button1.mesh.uuid === intersects [0].object.uuid) {
            button1.onHover();
        }


        else if (progressHome.mesh.uuid === intersects [0].object.uuid) {
            progressHome.onHover(pointer);
        }

        else if (progress1.mesh.uuid === intersects [0].object.uuid) {
            progress1.onHover(pointer);
        }
    }
    else {

        button1.noHover();

        progressHome.noHover();
        progress1.noHover();
    }
}


/* Scene Management */
const sceneManager = new SceneManager();
sceneManager.initScene (1, [sphere1, button1, progressHome, progress1]);


// ---------- Render Loop ----------------------------------------------------

const runTour = function () {
    
    controls.update();

    handleIntersections();
    
    renderer.render( sceneManager.currentScene, camera );

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


canvas.addEventListener ('click', (e) => {
    
    circleButtons.forEach ( (button) => {
        button.onClick();
    });

    progressButtons.forEach ( (button) => {
        button.onClick();
    });
});

document.addEventListener ('mousemove', (e) => {

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    
    pointer.x = e.clientX;
    pointer.y = e.clientY;

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