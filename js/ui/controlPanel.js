/*
 * This creates the control panel
 */

//add control panel 
var controlDiv = document.createElement("div"); 
controlDiv.setAttribute("id",'controlPanel')
document.body.appendChild(controlDiv); 

var title = document.createElement("div")               
var t = document.createTextNode("AirShell"); 
title.appendChild(t); 
title.className = "title";
controlDiv.appendChild(title);

var intro = document.createElement("div")               
t = document.createTextNode("Change the parameters to see the shells grow into different shapes."); 
intro.className = "text";
intro.appendChild(t); 
controlDiv.appendChild(intro);

var link = document.createElement('a');
var linkText = document.createTextNode("github");
link.className = "text";
link.appendChild(linkText);
link.title = "see source code";
link.href = "https://github.com/cheeriocheng/cheeriocheng.github.io";
controlDiv.appendChild(link);

//Move the slider to change the air shell
var cFormDiv = document.createElement("div");
controlDiv.appendChild(cFormDiv);
var exportDiv = document.createElement("div");
controlDiv.appendChild(exportDiv);

// create form & add it to control div
var cForm = document.createElement('form');
cFormDiv.appendChild(cForm);

//add sliders

addFormParam(cForm, "turns", 6.4, 0.4, 10.0, 0.2); //6.4
addFormParam(cForm, "A", 3.25, 0.1, 5.0, 0.05); //3.25
addFormParam(cForm, "alpha", 83.0, 70.0, 90.0, 0.25); //83
addFormParam(cForm, "beta", 25.0,1.0, 90.0, 1.0); //25
addFormParam(cForm, "D", 1.0, -1.0, 1.0, 1.0); //winding direction, 1 for CW and -1 for CCW

addFormParam(cForm, "a", 1.5, 0.1, 5.0, 0.05); //1.5
addFormParam(cForm, "b", 2.6, 0.1, 5.0, 0.05); //2.6
addFormParam(cForm, "a2", 0.75, 0.1, 5.0, 0.05); //0.75
addFormParam(cForm, "b2", 0.75, 0.1, 5.0, 0.05); //0.75

addFormParam(cForm, "mu", 10.0, 0.0, 90.0, 1.0); //10
addFormParam(cForm, "omega", 30.0, 0.0, 90.0, 1.0); //30
addFormParam(cForm, "phi", 70.0, -90.0, 90.0, 1.0); //70

addFormParam(cForm, "steps", 45.0, 10.0, 200.0, 10.0); //100
addFormParam(cForm, "cSteps", 24.0, 1.0, 50.0, 1.0); //24
addFormParam(cForm, "deltaTheta", 18.0, 10.0, 25.0, 1.0); //18
//addFormParam(cForm, "ellipse_a", 1, 1.5, 2.9, 0.1,"e1","e2");

addFormParam(cForm, "L", 0.0, 0.0, 10.0, 0.25);
addFormParam(cForm, "P", 5.0, 0.0, 5.0, 0.5);
addFormParam(cForm, "W1", 5.0, -5.0, 5.0, .25);
addFormParam(cForm, "W2", 0.39, -10.0, 10.0, .25);
addFormParam(cForm, "N", 10.0, -10.0, 10.0, 1.0);

// to takeover its submit event.
cForm.addEventListener("submit", function (event) {
  event.preventDefault();
  buildScene(); // in shell.js
});

//add export button 
var button = document.createElement("button");
button.innerHTML = "export .obj";
exportDiv.appendChild(button);
button.addEventListener ("click", function() {
  exportToObj();
});

function addFormParam(frm, d, vl, mn, mx, stp) {

  var sliderText = document.createElement("div");
  var st = document.createTextNode(d); 
  sliderText.className = "sliderText";
  sliderText.appendChild(st);
  frm.appendChild(sliderText);

  var slider = document.createElement("input");
  slider.setAttribute( "id", d );
  slider.setAttribute("class","slider")
  slider.setAttribute( "type",'range' );
  slider.setAttribute( "min", mn );
  slider.setAttribute( "max", mx );
  slider.setAttribute( "value", vl );
  slider.setAttribute( "step", stp );
  sliderText.appendChild(slider);

  //var sliderValue = document.createTextNode(document.getElementById(d).value);
  //sliderValue.className = "sliderText";
  var sliderValue = document.createElement("span");
  sliderValue.setAttribute("id", d+"_value");
  sliderValue.textContent = document.getElementById(d).value;
  sliderText.appendChild(sliderValue);

  frm.appendChild( document.createElement("br") );

  slider.addEventListener("change", function(){
    console.log("Parameter", d,"changed to", document.getElementById(d).value);
    buildScene();
   
  });
}

function exportToObj() {
  var exporter = new THREE.OBJExporter();
  var result = exporter.parse( scene );
  exportToFile("seashell_A-"+this.A.value+"_Turns-"+this.turns.value+"_D-"+this.D.value+"_Steps-"+this.steps.value+"_cSteps-"+this.cSteps.value+"_Beta-"
               +this.beta.value+"_Phi-"+this.phi.value+"_Mu-"+this.mu.value+"_Omega-"+this.omega.value+"_Alpha-"+this.alpha.value+"_deltaTheta-"+this.deltaTheta.value+"_a-"+this.a.value+"_b-"+this.b.value+".obj", result);
}

//from reza ali 
function exportToFile( filename, data ) {
  var pom = document.createElement( 'a' );
  pom.href = URL.createObjectURL( new Blob( [ data ], { type : 'text/plain'} ) );
  pom.download = filename;
  document.body.appendChild( pom );

  if( document.createEvent ) {
    var event = document.createEvent( 'MouseEvents' );
    event.initEvent( 'click', true, true );
    pom.dispatchEvent( event );
  }
  else {
    pom.click();
  }
}
