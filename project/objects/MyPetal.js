import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from '../geometric/MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);
        this.initMaterials();
    }

    initMaterials(){
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(0.5, 0.1, 0.1, 1); // Dark green ambient color
        this.petalMaterial.setDiffuse(0.5, 0.1, 0.1, 1); // Dark green diffuse color
        this.petalMaterial.setSpecular(0.5, 0.1, 0.1, 1); // Dark green specular color
        this.petalMaterial.setShininess(10.0);
    }
    display(){
        // First triangle
        this.scene.pushMatrix();
        this.petalMaterial.apply();
        this.scene.scale(0.4, 0.4, 0.4);
        this.triangle.display();
        this.scene.popMatrix();

        // Second triangle
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.translate(2, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.petalMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}