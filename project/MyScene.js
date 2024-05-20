import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MySphere } from "./objects/MySphere.js";
import { MyGarden } from "./objects/MyGarden.js";
//import { MyMovingBee } from "./objects/MyMovingBee.js";
import { MyBee } from "./objects/MyBee.js";
import { MyHive } from "./objects/MyHive.js";
import { MyGrass } from "./objects/MyGrass.js";

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
    
    this.infPanorama = true;
    this.setUpdatePeriod(80);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 20, 20, 20);
    this.garden = new MyGarden(this, 3, 3);
    this.rockSet = new MyRockSet(this,20,10,10);
    this.panorama = new MyPanorama(this, "images/panorama.jpg");
    //this.movingBee = new MyMovingBee(this);
    this.hive = new MyHive(this);
    this.bee = new MyBee(this);
    this.grass = new MyGrass(this, 300);

    this.hivePos = [-5, 1.5, 0];
  
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.loadTexture("images/earth.jpg");
    this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');

    // this.rockMaterial = new CGFappearance(this);
    // this.rockMaterial.loadTexture("images/rock_texture.png");
    // this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.panoramaMaterial = new CGFappearance(this);
    this.panoramaMaterial.loadTexture("images/panorama.jpg");
    this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.rockSetMaterial = new CGFappearance(this);
    this.rockSetMaterial.loadTexture("images/rock_texture.png");
    this.rockSetMaterial.setTextureWrap('REPEAT', 'REPEAT');
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
    this.setDefaultAppearance();
    if (this.displayAxis) this.axis.display();


    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, 0, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();


    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    this.setDefaultAppearance();
    this.pushMatrix();
    this.translate(this.hivePos[0]-0.7, this.hivePos[1]-0.5, this.hivePos[2]);
    this.hive.display();
    this.popMatrix();

    this.pushMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    //this.movingBee.display();
    this.popMatrix();

    this.pushMatrix();
    this.garden.display();
    this.popMatrix();
     
    this.pushMatrix();
    this.translate(this.hivePos[0], this.hivePos[1]-1, this.hivePos[2]);
    this.scale(.2, .1, .2);
    this.rockSetMaterial.apply();
    this.rockSet.display();
    this.popMatrix();

    this.pushMatrix();
    this.grass.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }

  update(t) {
    this.checkKeys();
    this.bee.update(t);
    this.grass.update(t);
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      this.bee.accelerate(this.speedFactor/10);
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyS"))        {
      text+=" S ";
      this.bee.accelerate(-this.speedFactor/10);
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      this.bee.turn(this.speedFactor/10);
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      this.bee.turn(-this.speedFactor/10);
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyR")){
      text+=" R ";
      this.bee.pos = [0, 3, 0];
      this.bee.goingUp = true;
      this.bee.orientation = 0;
      this.bee.velocity[0] = 0;
      this.bee.velocity[2] = 0;
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyF")){
      text+=" F ";
      this.bee.goDown();
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyP")){
      text+=" P ";
      this.bee.goUp();
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyO")){
      text+=" O ";
      this.bee.goHive();
      keysPressed=true;
    }

    if (keysPressed)
      console.log(text);
  }

}
