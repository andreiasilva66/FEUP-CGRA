import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyTriangle } from '../geometric/MyTriangle.js';
import { MyCylinder } from '../geometric/MyCylinder.js';

export class MyLeaf extends CGFobject {
    constructor(scene, stemColor, leavesColor) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);
        this.cylinder = new MyCylinder(this.scene, 20, 20);
        this.stemColor = stemColor;
        this.leavesColor = leavesColor;
        this.initMaterials();
    }

    initMaterials() {
        // Initialize stem material
        this.stemTexture = new CGFtexture(this.scene, 'images/stem.jpg');
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setSpecular(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setShininess(10);
        this.stemMaterial.setTexture(this.stemTexture);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        // Initialize leaves material
        this.leafTexture = new CGFtexture(this.scene, 'images/leafText.jpg');
        this.leavesMaterial = new CGFappearance(this.scene);
        this.leavesMaterial.setAmbient(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setDiffuse(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setSpecular(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setShininess(10);
        this.leavesMaterial.setTexture(this.leafTexture);
        this.leavesMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        // Leaf Stem
        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, 0);
        this.scene.scale(0.03, 1.3, 0.03);
        this.scene.translate(0, 0.38, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.stemMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        // First triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-1, 0, 0);
        this.leavesMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Second triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.leavesMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}