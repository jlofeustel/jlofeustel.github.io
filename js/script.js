/*
 * run this script when the page is loaded 
*/

var scene;      //scene is the stage we put things in 
var camera;     //camera defines how we look at the scene 
var renderer;   //render the scence for the camera
var controls;   //help rotate the scene with mouse 
var airShell;   //airshell instance

init();
animate();

/*
 * setup the basic scene 
 * to see this visualized, go to https://threejs.org/examples/?q=camera#webgl_camera 
 */

function init() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0);
  document.body.appendChild(renderer.domElement);
  
  //field of view, aspect ratio,  near and far clipping plane.
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000); 
  camera.position.set(-10, 10, -45); 
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = false;
  controls.enablePan = false;

  window.addEventListener('resize', onWindowResize, false);
   
  airShell = new AirShell();

  buildScene();
}

function buildScene() {
  scene = new THREE.Scene();
 
  //add light to the scene
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-1, 1.5, -0.5);
  scene.add(directionalLight);
  
  var ambientLight = new THREE.AmbientLight( 0x333333 ); // soft white light  
  scene.add( ambientLight );

  // get the parameters from control panel 
  p = getControlParams();
  // update the shell acoordingly
  airShell.updateParams(p);

  //DRAW THE SPINE
  airShell.renderSpiral(scene, false); 
  //DRAW THE C ELLIPSES 
  airShell.renderC(scene, false);
  //DRAW IN TUBE 
  airShell.buildTube(scene, true); 
}

function getControlParams() {
  document.getElementById("A_value").innerHTML = document.getElementById("A").value;
  document.getElementById("turns_value").innerHTML = document.getElementById("turns").value;
  document.getElementById("deltaTheta_value").innerHTML = document.getElementById("deltaTheta").value;
  document.getElementById("D_value").innerHTML = document.getElementById("D").value;
  document.getElementById("steps_value").innerHTML = document.getElementById("steps").value;
  document.getElementById("cSteps_value").innerHTML = document.getElementById("cSteps").value;
  document.getElementById("alpha_value").innerHTML = document.getElementById("alpha").value;
  document.getElementById("beta_value").innerHTML = document.getElementById("beta").value;
  document.getElementById("phi_value").innerHTML = document.getElementById("phi").value;
  document.getElementById("mu_value").innerHTML = document.getElementById("mu").value;
  document.getElementById("omega_value").innerHTML = document.getElementById("omega").value;
  document.getElementById("a_value").innerHTML = document.getElementById("a").value;
  document.getElementById("b_value").innerHTML = document.getElementById("b").value;
  document.getElementById("a2_value").innerHTML = document.getElementById("a2").value;
  document.getElementById("b2_value").innerHTML = document.getElementById("b2").value;
  
  document.getElementById("L_value").innerHTML = document.getElementById("L").value;
  document.getElementById("P_value").innerHTML = document.getElementById("P").value;
  document.getElementById("W1_value").innerHTML = document.getElementById("W1").value;
  document.getElementById("W2_value").innerHTML = document.getElementById("W2").value;
  document.getElementById("N_value").innerHTML = document.getElementById("N").value;

  return {
    A: parseFloat(document.getElementById("A").value),
    turns: parseFloat(document.getElementById("turns").value),
    deltaTheta: parseFloat(document.getElementById("deltaTheta").value),
    D: parseFloat(document.getElementById("D").value),
    steps: parseFloat(document.getElementById("steps").value),
    cSteps: parseFloat(document.getElementById("cSteps").value),
    alpha: parseFloat(document.getElementById("alpha").value),
    beta: parseFloat(document.getElementById("beta").value),
    phi: parseFloat(document.getElementById("phi").value),
    mu: parseFloat(document.getElementById("mu").value),
    omega: parseFloat(document.getElementById("omega").value),
    a: parseFloat(document.getElementById("a").value),
    b: parseFloat(document.getElementById("b").value),
    a2: parseFloat(document.getElementById("a2").value),
    b2: parseFloat(document.getElementById("b2").value),
    
    L: parseFloat(document.getElementById("L").value),
    P: parseFloat(document.getElementById("P").value),
    W1: parseFloat(document.getElementById("W1").value),
    W2: parseFloat(document.getElementById("W2").value),
    N: parseFloat(document.getElementById("N").value),
    //ellipse_a: parseFloat(document.getElementById("ellipse_a").value),
  };
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  controls.update();
  renderer.render(scene, camera);
}
