import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyCylinder } from "../geometric/MyCylinder.js";

export class MyStem extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 20, 20);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}