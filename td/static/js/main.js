//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader.js'

const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 10, 10000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = '2';

//Instantiate a loader for the .gltf file
var loader = new GLTFLoader();
//const textureLoader = new THREE.TextureLoader();
//const texture = textureLoader.load("models/door6/краска2.jpg");

var material = new THREE.MeshPhongMaterial({ color: 0xFF6913 });

//Load the file
loader.load(
`static/models/${objToRender}/scene.gltf`,
function (object) {
//If the file is loaded, add it to the scene
object = object.scene;
let obj = object

obj.scene.traverse((node)=>{
console.log("no")

// const glassMaterial = new THREE.MeshStandardMaterial({
//   opacity: 0.0,
// });

// glassMaterial.envMapIntensity = 1.0;
// glassMaterial.refractionRatio = 0.98;

if (!node.isMesh) {
  console.log("err")
};
// let clonedMaterial = node.material.clone();
// node.material = clonedMaterial;

// let secondMaterial = new THREE.MeshPhongMaterial({
//   map: texture,
//   opacity: 0.7,
//   side:THREE
//   //color: 0x00FF00,
// })

// let tempMaterial = node.material.copy()
// tempMaterial.visible = False
// if (node.name === "1"){
//   node.material = tempMaterial
// }
// if (node.name === "1.1"){
//   console.log("success")
//   curMaterial.opacity = 1;
// }
})
scene.add(object);
},
function (xhr) {
//While it is loading, log the progress
console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
function (error) {
//If there is an error, log it
console.error(error);
}



);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "2" ? 3000 : 100;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "2" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "2") {
controls = new OrbitControls(camera, renderer.domElement);
}



//Render the scene
function animate() {
requestAnimationFrame(animate);
//Here we could add some code to update the scene, adding some automatic movement

//Make the eye move
if (object && objToRender === "eye") {
//I've played with the constants here until it looked good 
object.rotation.y = -3 + mouseX / window.innerWidth * 3;
object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
}
renderer.render(scene, camera);
}



//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
mouseX = e.clientX;
mouseY = e.clientY;
}

//Start the 3D rendering
animate();