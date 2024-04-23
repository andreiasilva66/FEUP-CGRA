import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyReceptacle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
        this.initMaterials();
    }

    initMaterials(){
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(0.5, 0.5, 0.1, 1); // Dark green ambient color
        this.receptacleMaterial.setDiffuse(0.5, 0.5, 0.1, 1); // Dark green diffuse color
        this.receptacleMaterial.setSpecular(0.5, 0.5, 0.1, 1); // Dark green specular color
        this.receptacleMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.25);
        this.receptacleMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

}