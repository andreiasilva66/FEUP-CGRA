import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyTriangle } from '../geometric/MyTriangle.js';
import { MyTrapezoid } from '../geometric/MyTrapezoid.js';

export class MyGrass extends CGFobject {
    constructor(scene, numBlades) {
        super(scene);
        this.numBlades = numBlades;
        this.bladesPos = [];
        this.bladesCurv = [];
        this.bladesAngle = 0;
        this.goingUp = true;
        this.triangle = new MyTriangle(this.scene);
        this.trapezoid = new MyTrapezoid(this.scene);
        this.initMaterials();
        this.initBlades();
    }

    initMaterials() {
        let grassText = new CGFtexture(this.scene, 'images/stem.jpg');
        this.grassMaterial = new CGFappearance(this.scene);
        this.grassMaterial.setAmbient(0.2, 0.5, 0.2, 1);
        this.grassMaterial.setDiffuse(0.2, 0.5, 0.2, 1);
        this.grassMaterial.setSpecular(0.1, 0.3, 0.1, 1);
        this.grassMaterial.setShininess(10);
        this.grassMaterial.setTexture(grassText);
        this.grassMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBlades() {
        this.bladesPos = Array.from({ length: this.numBlades }, () => [this.getRandomFloat(-25, 25), this.getRandomFloat(-25, 25)]);
        this.bladesCurv = Array.from({ length: 4 }, () => this.getRandomFloat(0, Math.PI / 6));
        this.bladesAngle = this.getRandomFloat(0, Math.PI*2);
    }

    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    displayBlade() {

        this.scene.pushMatrix();
        this.scene.rotate(this.bladesAngle, 0, 1, 0);


        let bladeHeight = 0;
        let z_offset = 0;

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(this.bladesCurv[0], 1, 0, 0);
        this.scene.scale(1, 1.5, 1);
        this.trapezoid.display();
        this.scene.popMatrix();

        bladeHeight += 2*1.5 * Math.cos(this.bladesCurv[0]); 
        z_offset += 2*1.5 * Math.sin(this.bladesCurv[0]);

        this.scene.pushMatrix();
        this.scene.translate(0, bladeHeight, z_offset);
        this.scene.rotate(this.bladesCurv[1], 1, 0, 0);
        this.scene.scale(0.67, 1, 0.67);
        this.trapezoid.display();
        this.scene.popMatrix();

        bladeHeight += 2*1 * Math.cos(this.bladesCurv[1]); 
        z_offset += 2*1 * Math.sin(this.bladesCurv[1]);

        this.scene.pushMatrix();
        this.scene.translate(0, bladeHeight, z_offset);
        this.scene.rotate(this.bladesCurv[2], 1, 0, 0);
        this.scene.scale(0.44, 0.8, 0.44);
        this.trapezoid.display();
        this.scene.popMatrix();
        
        bladeHeight += 2*0.8 * Math.cos(this.bladesCurv[2]); 
        z_offset += 2*0.8 * Math.sin(this.bladesCurv[2]);

        this.scene.pushMatrix();
        this.scene.translate(-0.46, bladeHeight, z_offset);
        this.scene.rotate(this.bladesCurv[3], 1, 0, 0);
        this.scene.scale(0.46, 1.4, 0.46);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    display() {
        for (let i = 0; i < this.numBlades; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.bladesPos[i][0] + 23, 0, this.bladesPos[i][1] + 10);
            this.scene.rotate(this.bladesAngle, 0, 1, 0);
            this.scene.scale(0.1, 0.2, 0.1);
            this.grassMaterial.apply();
            this.displayBlade();
            this.scene.popMatrix();
        }
    }

    update(t) {
        if(this.goingUp){
            this.bladesCurv[0] += 0.02;
            this.bladesCurv[1] += 0.02;
            this.bladesCurv[2] += 0.02;
            this.bladesCurv[3] += 0.02;
            this.bladesAngle += 0.02;
            if(this.bladesCurv[0] > Math.PI/3){
                this.goingUp = false;
            }
        }
        else{
            this.bladesCurv[0] -= 0.02;
            this.bladesCurv[1] -= 0.02;
            this.bladesCurv[2] -= 0.02;
            this.bladesCurv[3] -= 0.02;
            this.bladesAngle -= 0.02;
            if(this.bladesCurv[0] < -Math.PI/3){
                this.goingUp = true;
            }
        }
    }
}
