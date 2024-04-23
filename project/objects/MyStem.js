import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyCylinder } from "../geometric/MyCylinder.js";

export class MyStem extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 20, 20);
        this.initMaterials();
    }

    initMaterials(){
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0.1, 0.5, 0.1, 1); // Dark green ambient color
        this.stemMaterial.setDiffuse(0.1, 0.5, 0.1, 1); // Dark green diffuse color
        this.stemMaterial.setSpecular(0.1, 0.5, 0.1, 1); // Dark green specular color
        this.stemMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.1, 3, 0.1);
        this.scene.rotate(Math.PI/2, 1, 0, 0); 
        this.stemMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}