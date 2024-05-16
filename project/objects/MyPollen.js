import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPollen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 20, 20, 0.3, false, 0.9, 0.5);
        this.incli = Math.random() * Math.PI - Math.PI/2;
        this.initMaterials();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material.setShininess(10.0);
        this.material.loadTexture("images/pollenText.jpg");
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        // Apply a different scale factor to elongate the lower hemisphere
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.rotate(this.incli, 0, 0, 1);
        this.scene.scale(1, 1.8, 1); // Scale factor for the lower hemisphere
        
        this.sphere.display();
        this.scene.popMatrix();
    }

}