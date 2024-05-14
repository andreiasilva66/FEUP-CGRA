import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
        this.initMaterials();
    }

    initMaterials(){
        // Eye Material
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.loadTexture('images/eyeText.jpg');
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Antenna Material
        this.antennaMaterial = new CGFappearance(this.scene);
        this.antennaMaterial.setAmbient(0, 0, 0, 1);
        this.antennaMaterial.setDiffuse(0.2, 0.08, 0.01, 1);
        this.antennaMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.antennaMaterial.setShininess(10.0);
        
    }

    display(){
        // Head
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.45, 0.25);    
        
        this.sphere.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI*0.3, 0, 1, 0); 
        this.scene.scale(0.15, 0.25, 0.1);
        this.scene.translate(0.5, 0.3, 3);  
        this.eyeMaterial.apply();  
        this.sphere.display();
        this.scene.popMatrix();

        // Left Eye
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI*0.3, 0, 1, 0); 
        this.scene.scale(0.15, 0.25, 0.1);
        this.scene.translate(-0.5, 0.3, 3);
        this.eyeMaterial.apply();   
        this.sphere.display();
        this.scene.popMatrix();

        // Right Bottom Antenna 
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 
        this.scene.translate(0.1, 0.4, -0.2); 
        this.scene.scale(0.02, 0.08, 0.02);   
        this.antennaMaterial.apply(); 
        this.sphere.display();
        this.scene.popMatrix();

        // Right Top Antenna
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 1, 0, 0); 
        this.scene.scale(0.02, 0.08, 0.02);
        this.scene.translate(5, 1.5, 24); 
        this.antennaMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Left Bottom Antenna
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 
        this.scene.translate(-0.1, 0.4, -0.2); 
        this.scene.scale(0.02, 0.08, 0.02);  
        this.antennaMaterial.apply();  
        this.sphere.display();
        this.scene.popMatrix();

        // Left Top Antenna
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 1, 0, 0); 
        this.scene.scale(0.02, 0.08, 0.02);
        this.scene.translate(-5, 1.5, 24); 
        this.antennaMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

}