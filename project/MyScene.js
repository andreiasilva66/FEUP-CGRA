import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
// import { MyPetal } from "./objects/MyPetal.js";
// import { MyReceptacle } from "./objects/MyReceptacle.js";
// import { MyStem } from "./objects/MyStem.js";
// import { MyCylinder } from "./geometric/MyCylinder.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyLeaf } from "./objects/MyLeaf.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 20, 20);
    // this.petal = new MyPetal(this, Math.PI/6);
    // this.receptacle = new MyReceptacle(this);
    // this.stem = new MyStem(this);
    //this.cylinder = new MyCylinder(this, 20, 20);
    this.flower = new MyFlower(this, 3, 8, [0.5, 0.1, 0.1, 1], 1, [0.5, 0.5, 0.1, 1], 0.1, 3, [0.1, 0.5, 0.1, 1], [0.1, 0.7, 0.1, 0.8], -Math.PI/3, Math.PI/3);
    //this.leaf = new MyLeaf(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.loadTexture("images/earth.jpg");
    this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }
  
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(5, 5, 5, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateAppliedSphereTexture() {
    this.sphere.setTexture(this.textures[this.selectedTexture]);
}

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    
    // this.pushMatrix();
    // this.sphereMaterial.apply();
    // this.sphere.display();
    // this.popMatrix();

    // this.setDefaultAppearance();
    // this.pushMatrix();
    // this.petal.display();
    // this.popMatrix();

    this.setDefaultAppearance();
    this.pushMatrix();
    this.flower.display();
    //this.sphere.display();
    this.popMatrix();
    // ---- END Primitive drawing section
  }
}