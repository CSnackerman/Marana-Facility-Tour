import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OrbitControls  } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js'

import { tourToggle, toggleTour } from './config.js';

import { SceneManager } from './SceneManager.js';
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

// loaders
const texLoader = new THREE.TextureLoader();


/* scene spheres */
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

//scene 3
const scene3_sphere = new THREE.SphereGeometry(1, 32, 32);
const scene3_material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene3_v1.png'), 
    side: THREE.BackSide
} );
const scene3_mesh = new THREE.Mesh( scene3_sphere, scene3_material );

//scene 4
const scene4_sphere = new THREE.SphereGeometry(1, 32, 32);
const scene4_material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene4_v1.png'), 
    side: THREE.BackSide
} );
const scene4_mesh = new THREE.Mesh( scene4_sphere, scene4_material );

//scene 5
const scene5_sphere = new THREE.SphereGeometry(1, 32, 32);
const scene5_material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene5_v1.png'), 
    side: THREE.BackSide
} );
const scene5_mesh = new THREE.Mesh( scene5_sphere, scene5_material );

var swappingSphere = null;

function setSwapSphere(currentScene) {

    let sphere, mat;

    switch (currentScene) {

        case 1:
            sphere = new THREE.SphereGeometry (1, 32, 32);
            mat = new THREE.MeshBasicMaterial ( {
                map: texLoader.load ('images/scene2.png'),
                side: THREE.BackSide
            });
            break;
    }

    swappingSphere = new THREE.Mesh ( sphere, mat);
} 



// circle buttons
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

// progress buttons
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

        // else if (button2.mesh.uuid === intersects [0].object.uuid) {
        //     button2.onHover(pointer);
        // }

        // else if (button3.mesh.uuid === intersects [0].object.uuid) {
        //     button3.onHover(pointer);
        // }

        // else if (button4.mesh.uuid === intersects [0].object.uuid) {
        //     button4.onHover(pointer);
        // }

        // else if (button5.mesh.uuid === intersects [0].object.uuid) {
        //     button5.onHover(pointer);
        // }

        // else if (buttonJourney.mesh.uuid === intersects [0].object.uuid) {
        //     buttonJourney.onHover(pointer);
        // }

        else if (progressHome.mesh.uuid === intersects [0].object.uuid) {
            progressHome.onHover(pointer);
        }

        // else if (progressBack.mesh.uuid === intersects [0].object.uuid) {
        //     progressBack.onHover(pointer);
        // }

        else if (progress1.mesh.uuid === intersects [0].object.uuid) {
            progress1.onHover(pointer);
        }

        // else if (progress2.mesh.uuid === intersects [0].object.uuid) {
        //     progress2.onHover(pointer);
        // }
    }
    else {

        button1.noHover();
        // button2.noHover();
        // button3.noHover();
        // button4.noHover();
        // button5.noHover();
        // buttonJourney.noHover();

        progressHome.noHover();
        // progressBack.noHover();
        progress1.noHover();
        // progress2.noHover();

    }
}


/* Scene Management */

scene.add ( scene1_mesh );

button1.addToScene (scene);
button1.show();

progressHome.addToScene (scene);
progressHome.show();
progress1.addToScene (scene);
progress1.show();

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