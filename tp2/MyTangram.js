import {CGFobject} from '../lib/CGF.js';
import { MyDiamond  } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParalellogram } from './MyParalellogram.js';
import { MyTriangleBig } from './MyTriangleBig.js'; 
import { MyTriangleSmall } from './MyTriangleSmall.js';

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangleBlue = new MyTriangleBig(this.scene);
        this.triangleOrange = new MyTriangleBig(this.scene);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleRed = new MyTriangleSmall(this.scene);
        this.trianglePurple = new MyTriangleSmall(this.scene);
        this.paralellogram = new MyParalellogram(this.scene);
    }

    display(){

        this.scene.pushMatrix();
        let translationMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        this.scene.multMatrix(translationMatrix);

        // Display Diamond
        this.scene.translate(2, 1, 0);
        this.scene.setDiffuse(0, 1, 0, 0);
        this.diamond.display();
        this.scene.popMatrix();

        // Display Blue Triangle
        this.scene.pushMatrix();
        this.scene.rotate(45*Math.PI/180, 0, 0, 1);
        this.scene.setDiffuse(0, 0, 1, 0);
        this.triangleBlue.display();
        this.scene.popMatrix();

        // Display Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -2, 0);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        this.scene.setDiffuse(255/255, 128/255, 0/255, 0);
        this.triangleOrange.display();
        this.scene.popMatrix();

        // Display Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
        this.scene.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0);
        this.trianglePink.display();
        this.scene.popMatrix();

        // Display Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(0.7, -2.12, 0);
        this.scene.rotate(45*Math.PI/180, 0, 0, 1);
        this.scene.setDiffuse(255/255, 0/255, 0/255, 0);
        this.triangleRed.display();
        this.scene.popMatrix();

        // Display Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        this.scene.setDiffuse(76/255, 0/255, 153/255, 0);
        this.trianglePurple.display();
        this.scene.popMatrix();

        // Display Paralellogram
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -4, 0);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.scene.setDiffuse(255/255, 255/255, 0/255, 0);
        this.paralellogram.display();
        this.scene.popMatrix();
    }
}