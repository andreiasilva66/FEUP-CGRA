import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 200, 200, 200, true);
        this.mateterial = new CGFappearance(scene);
        this.mateterial.setEmission(1,1,1,1);   
        this.mateterial.loadTexture(texture);
    }

    display() {
        this.mateterial.apply();
        if(this.scene.infPanorama) this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display();
    }
}