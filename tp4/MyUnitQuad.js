import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quadUp = new MyQuad(this.scene);
        this.quadDown = new MyQuad(this.scene);
        this.quadLeft = new MyQuad(this.scene);
        this.quadRight = new MyQuad(this.scene);
        this.quadFront = new MyQuad(this.scene);
        this.quadBack = new MyQuad(this.scene);
    }

    display(){

        this.scene.pushMatrix();
        let translationMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        this.scene.multMatrix(translationMatrix);

        // Display Up Quad
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90*Math.PI/180, 1, 0, 0);
        this.quadUp.display();
        this.scene.popMatrix();

        // Display Down Quad
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.quadDown.display();
        this.scene.popMatrix();

        // Display Left Quad
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        this.quadLeft.display();
        this.scene.popMatrix();

        // Display Right Quad
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        this.quadRight.display();
        this.scene.popMatrix();

        // Display Front Quad
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quadFront.display();
        this.scene.popMatrix();

        // Display Back Quad
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.quadBack.display();
        this.scene.popMatrix();
    
    }
}