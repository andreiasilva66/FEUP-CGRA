import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
    }

    display(){
        // Top
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.05, 0.25, 0.05);
        this.scene.translate(0, -0.8, 0);
        this.sphere.display();
        this.scene.popMatrix();

        // Bottom
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.scale(0.05, 0.25, 0.05);
        this.scene.translate(7.5, -1.8, 0);
        //this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.sphere.display();
        this.scene.popMatrix();

        // Fist Finger
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.scale(0.02, 0.1, 0.02);
        this.scene.translate(-20, -6.5, -17);
        this.sphere.display();
        this.scene.popMatrix();

        // Second Finger
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 1, 0, 1);
        this.scene.scale(0.02, 0.1, 0.02);
        this.scene.translate(-14, -7.5, 14);
        this.sphere.display();
        this.scene.popMatrix();
    }

}