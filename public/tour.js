import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OrbitControls  } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle, toggleTour } from './config.js';


import { CircleButton3D } from './CircleButton3D.js';
import { ProgressButton3D } from './ProgressButton3D.js';

// setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = renderer.domElement;
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.style.zIndex = 5;
canvas.style.position = 'fixed';

document.body.appendChild ( canvas );

// mouse
let mouse = new THREE.Vector2();
let pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

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
        progress1.noHover();
        progressHome.noHover();
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

// scene spheres
const texLoader = new THREE.TextureLoader();

//scene 1
const scene1_sphere = new THREE.SphereGeometry(1, 32, 32);
const scene1_material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene1v7.png'), 
    side: THREE.BackSide
} );
const scene1_mesh = new THREE.Mesh( scene1_sphere, scene1_material );

//scene 2
const scene2_sphere = new THREE.SphereGeometry(1, 32, 32);
const scene2_material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene2.png'), 
    side: THREE.BackSide
} );
const scene2_mesh = new THREE.Mesh( scene2_sphere, scene2_material );


// circle buttons
const button1 = new CircleButton3D (
    'one',          // name
    0.85, 0, 0.07,  // position
    0, -Math.PI/2, 0,  // rotation
    0.1                 // size
);
button1.animate();

const button2 = new CircleButton3D (
    'two',
    0, 0, 0.1,
    0, 0, 0,
    0.2
);
button2.animate();

var circleButtons = [ 
    button1,
    button2
];

// progress buttons
const progressHome = new ProgressButton3D (
    'home',
    -0.85,0,0,
    0,Math.PI / 2,0,
    0.4
)

const progress1 = new ProgressButton3D(
    'prog_one',
    0.6, -0.3, 0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3
);

var progressButtons = [ 
    progressHome, 
    progress1
]


// scene management
scene.add( scene1_mesh );
button1.addToScene (scene);

progressHome.addToScene (scene);
progress1.addToScene (scene);


// collision detection
let intersectables = [];
intersectables.push (button1.mesh);
intersectables.push (progressHome.mesh);
intersectables.push (progress1.mesh);



// ---------- Render Loop ----------------------------------------------------

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


canvas.addEventListener ('click', (e) => {
    circleButtons.forEach ( (button) => {
        button.onClick();
    })
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