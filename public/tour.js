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
const sphere2 = new Sphere ('two', 0);
const sphere3 = new Sphere ('three', 0);
const sphere4 = new Sphere ('four', 0);
const sphere5 = new Sphere ('five', 0);
// const sphere6 = new Sphere ('six', 0);
// const sphere7 = new Sphere ('seven', 0);
// const sphere8 = new Sphere ('eight', 0);


const swappingSphere = null;


/* Circle Buttons */

const button1 = new CircleButton3D (
    'one',          // name
    0.85, 0, 0.07,  // position
    0, -Math.PI/2, 0,  // rotation
    0.1                 // size
);


const button2 = new CircleButton3D (
    'two',
    0,0,0,
    0, 0, 0,
    0.1
);

const button3 = new CircleButton3D (
    'three',
    0, 0.4, 0.3,
    0, 0, 0,
    0.1
);

// const button4 = new CircleButton3D (
//     'four',
//     0.3, 0, 0.6,
//     0, 0, 0,
//     0.1
// );

const button5 = new CircleButton3D (
    'five',
    0, -0.2, 0.7,
    0, 0, 0,
    0.1
);

// const buttonJourney = new CircleButton3D (
//     'journey',
//     -0.7, 0, 0.7,
//     0, 0, 0,
//     0.1
// );


const circleButtons = [ 

    button1,
    button2,
    button3,
    // button4,
    button5
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

const progressBack = new ProgressButton3D (
    'prog_back',
    0.2,0.2,0.2,
    0,Math.PI / 4,0,
    0.4,
    false
)

const progress1 = new ProgressButton3D (
    'prog_one',
    0.6, -0.3, 0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);

const progress2 = new ProgressButton3D (
    'prog_two',
    0,0,0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);

const progress3 = new ProgressButton3D (
    'prog_three',
    0,0,0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);

const progress4 = new ProgressButton3D (
    'prog_four',
    0,0,0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);

const progress5 = new ProgressButton3D (
    'prog_five',
    0,0,0,
    Math.PI /2, 0, -Math.PI / 2,
    0.3,
    true
);



const progressButtons = [

    progressHome, 
    progressBack,
    progress1,
    progress2,
    progress3,
    progress4,
    // progress5
]



/* collision detection */
let mouse = new THREE.Vector2();
let pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
var clickHeld = false;

const objects1 = [button1, progressHome, progress1];
const objects2 = [button1, progress2, progressBack];
const objects3 = [button1, button5, progress3, progressBack];
const objects4 = [button2, button3, button5, progress4, progressBack];
const objects5 = [button2, button3, button5, progress5, progressBack];
const objects6 = [];
const objects7 = [];
const objects8 = [];

const intersectables1 = [button1.mesh, progressHome.mesh, progress1.mesh];
const intersectables2 = [button1.mesh, progress2.mesh, progressBack.mesh];
const intersectables3 = [button1.mesh, button5.mesh, progress3.mesh, progressBack.mesh];
const intersectables4 = [button2.mesh, button3.mesh, button5.mesh, progress4.mesh, progressBack.mesh];
const intersectables5 = [button2.mesh, button3.mesh, button5.mesh, progress5.mesh, progressBack.mesh];
const intersectables6 = [];
const intersectables7 = [];
const intersectables8 = [];

function handleIntersections () {
    
    let sceneNum = sceneManager.sceneNumber;
    
    let intersectables;
    if (sceneNum === 1) { intersectables = intersectables1; }
    else if (sceneNum === 2) { intersectables = intersectables2; }
    else if (sceneNum === 3) { intersectables = intersectables3; }
    else if (sceneNum === 4) { intersectables = intersectables4; }
    else if (sceneNum === 5) { intersectables = intersectables5; }
    else if (sceneNum === 6) { intersectables = intersectables6; }
    else if (sceneNum === 7) { intersectables = intersectables7; }
    else if (sceneNum === 8) { intersectables = intersectables8; }

    let objects;
    if (sceneNum === 1) { objects = objects1; }
    else if (sceneNum === 2) { objects = objects2; }
    else if (sceneNum === 3) { objects = objects3; }
    else if (sceneNum === 4) { objects = objects4; }
    else if (sceneNum === 5) { objects = objects5; }
    else if (sceneNum === 6) { objects = objects6; }
    else if (sceneNum === 7) { objects = objects7; }
    else if (sceneNum === 8) { objects = objects8; }


    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects ( intersectables );

    // is intersection
    if (intersects.length > 0) {EvalError
        
        canvas.style.cursor = 'pointer';

        objects.forEach ( (obj) => {

            if ( obj.mesh.uuid === intersects [0].object.uuid ) {

                if (obj.type === 'circle_button') {
                    obj.onHover();
                }
                else {
                    obj.onHover(pointer);
                }   
            }
        });

    }

    // no intersection
    else {

        canvas.style.cursor = 'default';
                
        progressButtons.forEach ( (obj) => {
            obj.noHover();
        });

        circleButtons.forEach ( (obj) => {
            obj.noHover();
        });
    }
}


/* Scene Management */
const sceneManager = new SceneManager();
sceneManager.initScene ( 1, [sphere1, button1, progressHome, progress1] );
sceneManager.initScene ( 2, [sphere2, button1, progressBack, progress2] );
sceneManager.initScene ( 3, [sphere3, button1, button5, progress3, progressBack] );
sceneManager.initScene ( 4, [sphere4, button2, button3, button5, progress4, progressBack] );
// sceneManager.initScene ( 5, [sphere5, button2, button3, button5, progress5, progressBack] );

// set intial scene
sceneManager.setScene (1);


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
});

canvas.addEventListener ('mousedown', (e) => {
    clickHeld = true;

    circleButtons.forEach ( (button) => {
        button.onClick();
    });

    progressButtons.forEach ( (button) => {
        button.onClick();
    });
})

canvas.addEventListener ('mouseup', (e) => {
    clickHeld = false;
})


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




export { runTour, sceneManager };