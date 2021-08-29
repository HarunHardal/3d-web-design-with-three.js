import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader";

let camera, scene, renderer, loader;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.x = 1;
camera.position.z = 1;
camera.position.y = 1;
camera.rotation.x = 0;
camera.rotation.y = 0;
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: false,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//const controls = new OrbitControls(camera, renderer.domElement);
// const grid = new THREE.GridHelper();
// scene.add(grid);

// lights
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const metarial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  const star = new THREE.Mesh(geometry, metarial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

function scrollAnimation() {
  camera.rotation.x = 0.0 + window.scrollY / 20050.0;
  camera.rotation.y = 0.0 + window.scrollY / 1050.0;
  //camera.position.y = .5 + window.scrollY / 450.0;
}
document.addEventListener("scroll", scrollAnimation);

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load(
  "./textures/Material__25__background_JPG_002_emissive.jpg"
);
texture.encoding = THREE.sRGBEncoding;
texture.flipY = false;

let object;

loader = new GLTFLoader();
loader.load("scene.gltf", function (gltf) {
  object = gltf.scene;
  object.scale.set(1, 1, 1);
  object.position.set(0, 0, 0);
  gltf.scene.traverse(function (object) {
    if (object.isMesh) object.material.map = texture;
  });

  console.log(gltf.scene.children);
  scene.add(object);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();



// Scroll Animation

var scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

let elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
  Array.prototype.forEach.call(elementsToShow, function (element) {
    if (isElementInViewport(element)) {
      element.classList.add("is-visible");
    } else {
      element.classList.remove("is-visible");
    }
  });
  scroll(loop);
}

loop();

let elementShowRight = document.querySelectorAll(".show-on-right");

function loop2() {
  Array.prototype.forEach.call(elementShowRight, function (e) {
    if (isElementInViewport(e)) {
      e.classList.add("is-right");
    } else {
      e.classList.remove("is-right");
    }
  });
  scroll(loop2);
}
loop2();

 const elementToVisible = document.querySelectorAll('.not-visible')
 function visible(){
   Array.prototype.forEach.call(elementToVisible,function(e){
     if (isElementInViewport(e)){
       e.classList.add('visible')
     }else{
       e.classList.remove('visible')
     }
   })
   scroll(visible)
 }
 visible();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}



//Scrolling Text
  let imageBox2 = document.querySelector('.image-box2');
  let line1 = document.querySelector('.line1');
  let line2 = document.querySelector('.line2');
  let line3 = document.querySelector('.line3')
window.onscroll = ()=>{
  let pos = window.scrollY - 1500;
  line1.style.left = `${pos / 5}px`
  line2.style.right = `${pos / 5}px`
  line3.style.left = `${pos / 5}px`
  imageBox2.style.width = `${pos / 15}%`
}


// Menu
 const menu = document.querySelector('.nav-area');
 const menuIcon = document.querySelector('.menu-icon');
 menuIcon.addEventListener('click',toggleMenu)
 function toggleMenu(){
   //menu.classList.toggle('open')
    if(menu.classList.contains('open')){
      menu.classList.remove('open')
    }else{
      menu.classList.add('open')
    }
   console.log('SADSD')
  }
  

// Window Resize
window.onresize = function(){
  location.reload();
}