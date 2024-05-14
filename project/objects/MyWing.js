import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 20, 20);
        this.wingsUp = true;
        this.wingsAngle = 0;
        this.initMaterials();
    }

    initMaterials(){

        // Wing Material (Transparent)
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.1, 0.1, 0.1, 0.1); 
        this.wingMaterial.setDiffuse(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.5);
        this.wingMaterial.setShininess(0.0);
        this.wingMaterial.setEmission(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.loadTexture('images/wingText.webp');
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Enable alpha blending
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);

    }

    display(){

        if(this.wingsUp){
            this.wingsAngle += 0.05;
            if(this.wingsAngle >= Math.PI/4){
                this.wingsUp = false;
            }
        }          
            else{
                this.wingsAngle -= 0.05;
                if(this.wingsAngle <= 0){
                    this.wingsUp = true;
                }
            }

        this.scene.pushMatrix();
        this.scene.rotate(this.wingsAngle, 0, 0, 1);
        this.scene.translate(0.4, 0, 0);
        
        this.scene.scale(0.4, 0.01, 0.2);
        this.wingMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

}