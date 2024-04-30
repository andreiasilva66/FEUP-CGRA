import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyPetal } from "./MyPetal.js";
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyLeaf } from "./MyLeaf.js";

export class MyFlower extends CGFobject {
    constructor(scene, extRadius, nPetals, petalColor, heartRadius, heartColor, stemRadius, stemSize, stemColor, leavesColor, minUnAngle, maxUnAngle) {
        super(scene);
        this.extRadius = extRadius;
        this.nPetals = nPetals;
        this.petalColor = petalColor;
        this.heartRadius = heartRadius;
        this.heartColor = heartColor;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.stemColor = stemColor;
        this.leavesColor = leavesColor;
        this.minUnAngle = minUnAngle;
        this.maxUnAngle = maxUnAngle;

        this.initObjects();
        this.initMaterials();
    }

    initObjects() {
        let curviness = Math.random() * Math.PI/2;
        this.petal = new MyPetal(this.scene, curviness);
        this.stem = new MyStem(this.scene);
        this.receptacle = new MyReceptacle(this.scene);
        this.unionAngles = Array.from({ length: this.nPetals }, () => Math.random() * (this.maxUnAngle - this.minUnAngle) + this.minUnAngle);
        this.stemIncl = Array.from({ length: this.stemSize }, () => Math.random() * Math.PI/9 - Math.PI/18);
        this.stemLength = Array.from({ length: this.stemSize }, () => Math.random() * 2 + 3);
        this.leaf = new MyLeaf(this.scene, this.stemColor, this.leavesColor);
    }

    initMaterials() {
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setSpecular(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setShininess(10);
    
        // Initialize heart material
        this.heartMaterial = new CGFappearance(this.scene);
        this.heartMaterial.setAmbient(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setDiffuse(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setSpecular(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setShininess(10);
    
        // Initialize stem material
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setSpecular(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setShininess(10);
    
        // Initialize leaves material
        this.leavesMaterial = new CGFappearance(this.scene);
        this.leavesMaterial.setAmbient(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setDiffuse(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setSpecular(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setShininess(10);
    }

    display() {
        // Display the petals
        let angle = Math.PI / this.nPetals;
        let petalSize = this.extRadius - this.heartRadius;
        for (let i = 0; i < this.nPetals; i++) { 
            this.scene.pushMatrix();
            
            this.scene.rotate(angle, 0, 0, 1);
            this.scene.translate(0, this.heartRadius + petalSize/2, 0);
            this.scene.scale(petalSize, petalSize, petalSize);
            this.scene.rotate(this.unionAngles[i], 0, 1, 0);
            this.petalMaterial.apply();
            this.petal.display();
            this.scene.popMatrix();
            angle += 2 * Math.PI / this.nPetals; 
        }
        
        // Display the heart (receptacle)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        this.heartMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();
    
        // Display the stem
        let stemHeight = this.heartRadius;
        let x_offset = 0;
        let z_offset = 0;
        for(let i=0; i<this.stemSize; i++){

            this.scene.pushMatrix();
            this.scene.translate(x_offset, -stemHeight, z_offset);
            this.scene.rotate(this.stemIncl[i], 0, 0, 1);
            this.scene.rotate(this.stemIncl[i], 1, 0, 0);
            this.scene.scale(this.stemRadius, this.stemLength[i], this.stemRadius);
            this.stemMaterial.apply();
            this.stem.display();
            this.scene.popMatrix();
            stemHeight += this.stemLength[i] * Math.cos(this.stemIncl[i]) * Math.cos(this.stemIncl[i]);
            x_offset += this.stemLength[i] * Math.sin(this.stemIncl[i]) * Math.cos(this.stemIncl[i]);
            z_offset -= this.stemLength[i] * Math.sin(this.stemIncl[i]);
            
            if(i != this.stemSize-1){
                this.scene.pushMatrix();
                this.scene.translate(x_offset, -stemHeight, z_offset);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.leaf.display();
                this.scene.popMatrix();
            }
            
        }


    }
}