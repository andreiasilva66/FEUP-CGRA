import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyPollen } from "./MyPollen.js";
import { MySphere } from "./MySphere.js";

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 20, 20, 1);
        this.pollens = [];
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

        this.doorMaterial = new CGFappearance(this.scene);
        this.doorMaterial.setAmbient(0, 0, 0, 1);
        this.doorMaterial.setDiffuse(0.2, 0.08, 0.01, 1);
        this.doorMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.doorMaterial.setShininess(10.0);
        this.doorMaterial.loadTexture("images/pollenText.jpg");
        this.doorMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.4, 0.8);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, 0);
        this.scene.scale(1, 0.4, 1);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, 0);
        this.scene.scale(1.2, 0.4, 1.2);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.scale(1.4, 0.4, 1.4);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.6, 0);
        this.scene.scale(1.2, 0.4, 1.2);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.scale(1, 0.4, 1);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2.4, 0);
        this.scene.scale(0.8, 0.4, 0.8);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.25, 1.2, 0);
        this.scene.rotate(Math.PI / 1, 1, 0, 0);
        this.scene.scale(0.2, 0.4, 0.4);
        this.doorMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Pollens
        for (let pollen of this.pollens) {
            this.scene.pushMatrix();
            this.scene.translate(1.8, 0.1, 0);
            pollen.display();
            this.scene.popMatrix();
        }

    }

}