import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from '../geometric/MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, curviness) {
        super(scene);
        this.curviness = curviness;
        this.triangle = new MyTriangle(this.scene);
    }

    display(){
        // First triangle
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(this.curviness, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        // Second triangle
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}