import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF.js";
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
        this.stemLength = Array.from({ length: this.stemSize }, () => Math.random() * 3 + 2);
        this.leaf = new MyLeaf(this.scene, this.stemColor, this.leavesColor);
    }

    initMaterials() {
        // Select random texture for petal
        let petalText = Math.floor(Math.random() * 3);
        switch(petalText){
            case 0:
                this.petalTexture = new CGFtexture(this.scene, 'images/petalText1.jpg');
                break;
            case 1:
                this.petalTexture = new CGFtexture(this.scene, 'images/petalText2.avif');
                break;
            case 2:
                this.petalTexture = new CGFtexture(this.scene, 'images/petalText3.jpg');
                break;
        }
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setSpecular(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);
        this.petalMaterial.setShininess(10);
        this.petalMaterial.setTexture(this.petalTexture);
        this.petalMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    
        // Initialize heart material
        this.heartTexture = new CGFtexture(this.scene, 'images/receptacle3.jpg');
        this.heartMaterial = new CGFappearance(this.scene);
        this.heartMaterial.setAmbient(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setDiffuse(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setSpecular(this.heartColor[0], this.heartColor[1], this.heartColor[2], this.heartColor[3]);
        this.heartMaterial.setShininess(10);
        this.heartMaterial.setTexture(this.heartTexture);
        this.heartMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        // Initialize stem material
        this.stemTexture = new CGFtexture(this.scene, 'images/receptacle.jpg');
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setSpecular(this.stemColor[0], this.stemColor[1], this.stemColor[2], this.stemColor[3]);
        this.stemMaterial.setShininess(10);
        this.stemMaterial.setTexture(this.stemTexture);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        // Initialize leaves material
        this.leavesMaterial = new CGFappearance(this.scene);
        this.leavesMaterial.setAmbient(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setDiffuse(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setSpecular(this.leavesColor[0], this.leavesColor[1], this.leavesColor[2], this.leavesColor[3]);
        this.leavesMaterial.setShininess(10);
    }

    display() {
    
        var stemTotalLength = 0;
        for(let i=0; i<this.stemSize; i++){
            stemTotalLength += this.stemLength[i];
        }

        // Display the stem
        let stemHeight = 0;
        let x_offset = 0;
        let z_offset = 0;
        for(let i=0; i<this.stemSize; i++){

            this.scene.pushMatrix();
            this.scene.translate(x_offset, -stemHeight+stemTotalLength, z_offset);
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
                this.scene.translate(x_offset, -stemHeight + stemTotalLength, z_offset);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.scene.scale(2, 2, 2);
                this.leaf.display();
                this.scene.popMatrix();
            }
            
        }

        // Display the petals
        let angle = Math.PI / this.nPetals;
        let petalSize = this.extRadius - this.heartRadius;
        for (let i = 0; i < this.nPetals; i++) { 
            this.scene.pushMatrix();
            this.scene.translate(0, stemTotalLength + this.heartRadius, 0);
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
        this.scene.translate(0, stemTotalLength + this.heartRadius, 0);
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        this.heartMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        

    }
}