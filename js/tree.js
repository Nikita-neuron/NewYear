import {OrbitControls} from '../js/lib/OrbitControls.js';
// import * as THREE from '../build/three.module.js';
import {GLTFLoader} from '../js/lib/GLTFLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({alpha: true});

const canvas = document.querySelector('.canvas-tree');

renderer.setClearColor(0x000000, 0); // color
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
// document.body.appendChild( renderer.domElement );

renderer.domElement.setAttribute("id", "NewYearTree3DObj");
canvas.insertBefore(renderer.domElement, canvas.firstChild);

const aLight = new THREE.AmbientLight(0x404040, 3);
scene.add(aLight);

const pLight = new THREE.PointLight(0xFFFFFF, 4);
pLight.position.set(0, 2, 5);
scene.add(pLight);

camera.position.z = 8;

camera.lookAt(scene.position);

// const helper = new THREE.PointLightHelper(pLight);
// scene.add(helper);

// const controls = new OrbitControls(camera, renderer.domElement );
// controls.target.set(0, 0, 0);

let loader = new GLTFLoader();
let obj = null;

loader.load('../3d/scene.gltf', function(gltf){
  obj = gltf;
  obj.scene.scale.set(0.2, 0.2, 0.2);

  obj.scene.rotation.x = 0.45;

  scene.add(obj.scene);
});

function animate() {
  requestAnimationFrame(animate);

  if(obj) {
    obj.scene.rotation.y += 0.004;
  }

  // controls.update();
  renderer.render(scene, camera);
}
animate();