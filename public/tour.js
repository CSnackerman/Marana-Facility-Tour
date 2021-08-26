import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { tourToggle } from './config.js';
import { HEIGHT, WIDTH } from './config.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );

const canvas = renderer.domElement;
canvas.style.zIndex = 5;
canvas.style.position = 'fixed';
console.log (canvas.style.width, canvas.style.height);

document.body.appendChild( canvas );

const texLoader = new THREE.TextureLoader();
const sphere_1 = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial( { 
    map: texLoader.load ('images/scene1v7.png'), 
    side: THREE.BackSide
} );
const cube = new THREE.Mesh( sphere_1, material );
scene.add( cube );

camera.position.z = 5;

// ----------------------------------------------------------------------


const runTour = function () {
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
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