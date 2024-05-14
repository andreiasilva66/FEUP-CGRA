import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];
        this.initFlowers();
    }

    initFlowers(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                let extRadius = Math.random() * 4 + 3;
                let nPetals = Math.floor(Math.random() * 7 + 8);
                let petalColor = [Math.random(), Math.random(), Math.random(), 1];
                let heartRadius = Math.random() *1.1 + 0.7;
                let heartColor = [Math.random(), Math.random(), Math.random(), 1];
                let stemRadius = Math.random() * 0.1 + 0.15;
                let stemSize = Math.floor(Math.random() * 2 + 2);
                let stemColor = [Math.random()* (0.4 - 0.1) + 0.1, Math.random() * (0.7 - 0.3) + 0.4, Math.random() * (0.3 - 0.1) + 0.1, 1];
                let leavesColor = [Math.random(), Math.random(), Math.random(), 1];
                let minUnAngle = Math.random() * Math.PI/6;
                let maxUnAngle = Math.random() * Math.PI/6 + Math.PI/6;
                this.flowers.push(new MyFlower(this.scene, extRadius, nPetals, petalColor, heartRadius, heartColor, stemRadius, stemSize, stemColor, leavesColor, minUnAngle, maxUnAngle));
            }
        }
    }

    display(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.scene.pushMatrix();
                this.scene.translate(i*10, 0, j*10);
                this.flowers[i * this.cols + j].display();
                this.scene.popMatrix();
            }
        }
    }
}