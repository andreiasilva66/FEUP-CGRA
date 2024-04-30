import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyReceptacle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 20, 20);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.5);
        this.sphere.display();
        this.scene.popMatrix();
    }

}
