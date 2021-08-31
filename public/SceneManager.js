import * as THREE from 'https://cdn.skypack.dev/three@latest';

class SceneManager {

    constructor () {

        /* Scenes */ 

        this.SCENE_1 = new THREE.Scene(); 
        this.SCENE_2 = new THREE.Scene();
        this.SCENE_3 = new THREE.Scene();
        this.SCENE_4 = new THREE.Scene();
        this.SCENE_5 = new THREE.Scene();
        this.SCENE_6 = new THREE.Scene();
        this.SCENE_7 = new THREE.Scene();
        this.SCENE_8 = new THREE.Scene();
        
        this.SCENE_1.name = 'SCENE_1';
        this.SCENE_2.name = 'SCENE_2';
        this.SCENE_3.name = 'SCENE_3';
        this.SCENE_4.name = 'SCENE_4';
        this.SCENE_5.name = 'SCENE_5';
        this.SCENE_6.name = 'SCENE_6';
        this.SCENE_7.name = 'SCENE_7';
        this.SCENE_8.name = 'SCENE_8';

        this.sceneNumber = undefined;
        this.currentScene = undefined;

        this.currentSceneObjects = undefined;
        this.sceneObjects1 = [];
        this.sceneObjects2 = [];
        this.sceneObjects3 = [];
        this.sceneObjects4 = [];
        this.sceneObjects5 = [];
        this.sceneObjects6 = [];
        this.sceneObjects7 = [];
        this.sceneObjects8 = [];
    }

    initScene(sceneNum, objects) {

        let scene;

        switch (sceneNum) {
            case 1: scene = this.SCENE_1; break;
            case 2: scene = this.SCENE_2; break;
            case 3: scene = this.SCENE_3; break;
            case 4: scene = this.SCENE_4; break;
            case 5: scene = this.SCENE_5; break;
            case 6: scene = this.SCENE_6; break;
            case 7: scene = this.SCENE_7; break;
            case 8: scene = this.SCENE_8; break;

            default:
                console.error ('invalid argument \'sceneNum\' in initScene');
        }

        objects.forEach( (obj) => {

            // obj.addToScene (scene);

            if (obj.type === 'circle_button' || obj.type === 'progress_button') {
                obj.hide();
            }

            if (sceneNum === 1) { this.sceneObjects1.push (obj); }
            if (sceneNum === 2) { this.sceneObjects2.push (obj); }
            if (sceneNum === 3) { this.sceneObjects3.push (obj); }
            if (sceneNum === 4) { this.sceneObjects4.push (obj); }
            if (sceneNum === 5) { this.sceneObjects5.push (obj); }
            if (sceneNum === 6) { this.sceneObjects6.push (obj); }
            if (sceneNum === 7) { this.sceneObjects7.push (obj); }
            if (sceneNum === 8) { this.sceneObjects8.push (obj); }
        });
    }

    

    setScene (sceneNum) {

        if (this.sceneNumber === undefined ) {
            this.currentSceneObjects = this.sceneObjects1;
        }
        else {
            // deanimate previous scene
            this.currentSceneObjects.forEach ( (obj) => {
            if (obj.type === 'circle_button' ) {
                obj.deanimate();
            }
            
            if (obj.type === 'circle_button' || obj.type === 'progress_button') {
                obj.hide()
            }
        });
        }
        

        // update scene
        this.sceneNumber = sceneNum;

        if ( this.sceneNumber === 1 ) {
            this.currentScene = this.SCENE_1;
            this.currentSceneObjects = this.sceneObjects1;
        }

        if ( this.sceneNumber === 2 ) {
            this.currentScene = this.SCENE_2;
            this.currentSceneObjects = this.sceneObjects2;
        }

        console.log ('SCENE SWITCH')
        console.log ('sceneNumber', this.sceneNumber);
        console.log ('sceneobjects', this.currentSceneObjects)

        // animate new scene
        this.currentSceneObjects.forEach ( (obj) => {

            obj.addToScene (this.currentScene);

            if (obj.type === 'circle_button' || obj.type === 'progress_button') {
                obj.configForScene (this.sceneNumber);
                obj.show();
            }

            if (obj.type === 'circle_button' ) {
                obj.animate();
            }
        });

        
        
        console.log ('currentScene', this.currentScene);
    }

    getSceneNumber () {
        return this.sceneNumber;
    }
    // setSwapSphere() {

    //     let sphere, mat;
    
    //     switch (currentScene) {
    
    //         case 1:
    //             sphere = new THREE.SphereGeometry (1, 32, 32);
    //             mat = new THREE.MeshBasicMaterial ( {
    //                 map: texLoader.load ('images/scene2.png'),
    //                 side: THREE.BackSide
    //             });
    //             break;
    //     }
    
    //     swappingSphere = new THREE.Mesh ( sphere, mat);
    // } 
}


export { SceneManager };