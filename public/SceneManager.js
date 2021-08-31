import * as THREE from 'https://cdn.skypack.dev/three@latest';

class SceneManager {

    constructor () {

        this.SCENE_1 = new THREE.Scene();
        this.SCENE_2 = new THREE.Scene();
        this.SCENE_3 = new THREE.Scene();
        this.SCENE_4 = new THREE.Scene();
        this.SCENE_5 = new THREE.Scene();
        this.SCENE_6 = new THREE.Scene();
        this.SCENE_7 = new THREE.Scene();

        this.currentScene = 1;

    }
}


export { SceneManager };