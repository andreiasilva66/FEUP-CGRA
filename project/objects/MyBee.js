import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyHead } from "./MyHead.js";
import { MyLeg } from "./MyLeg.js"

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 20, 20);
        this.head = new MyHead(this.scene);
        this.leg = new MyLeg(this.scene);
        this.initMaterials();
    }

    initMaterials(){
        
        // Fur Material
        this.furMaterial = new CGFappearance(this.scene);
        this.furMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.furMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.furMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.furMaterial.setShininess(10.0);
        this.furMaterial.loadTexture('images/furText.jpg');
        this.furMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    
        // Abdomen Material
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.abdomenMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setShininess(10.0);
        this.abdomenMaterial.loadTexture('images/abdomenText.webp');
        this.abdomenMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        // Leg Material
        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(0, 0, 0, 1); 
        this.legMaterial.setDiffuse(0.2, 0.08, 0.01, 1); 
        this.legMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.legMaterial.setShininess(10.0);

        // Wing Material (Transparent)
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.5, 0.5, 0.5, 0.5); // Adjust the color and alpha as needed
        this.wingMaterial.setDiffuse(0.5, 0.5, 0.5, 0.5); // Adjust the color and alpha as needed
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.5);
        this.wingMaterial.setShininess(10.0);

        // Enable alpha blending
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);

    }

    display(){

        // Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.3);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.furMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        // Thorax
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, -0.9);
        this.scene.scale(0.3, 0.2, 0.4);
        this.furMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Abdomen
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.translate(0, -1.2, -1.1);
        this.scene.scale(0.5, 0.6, 0.3);
        this.abdomenMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Right Legs
        for (let i = 0; i < 3; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0.2, 0.5, -0.7 - i * 0.2); 
            this.scene.scale(1, 0.8, 1);
            this.legMaterial.apply();
            this.leg.display();
            this.scene.popMatrix();
        }

        // Left Legs
        for (let i = 0; i < 3; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0.2, 0.5, 0.7 + i * 0.2); 
            this.scene.scale(1, 0.8, 1);
            this.legMaterial.apply();
            this.leg.display();
            this.scene.popMatrix();
        }

        // Fisrt Right Wing
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.7, -0.8);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.01, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        // Second Right Wing
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.7, -1.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.01, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        // Fisrt Left Wing
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.7, -0.8);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.01, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        // Second Left Wing
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.7, -1.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.01, 0.1);
        this.sphere.display();
        this.scene.popMatrix();
    }

}