import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyPollen } from './MyPollen.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];
        this.pollen = [];
        this.initObjects();
    }

    initObjects(){
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
                let pos = [i*10+5, 0, j*10+5];
                this.flowers.push(new MyFlower(this.scene, extRadius, nPetals, petalColor, heartRadius, heartColor, stemRadius, stemSize, stemColor, leavesColor, minUnAngle, maxUnAngle, pos));
            
                this.pollen.push(new MyPollen(this.scene));
            }
        }
    }

    display(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.scene.pushMatrix();
                this.scene.translate(i*10+5, 0, j*10+5);
                this.flowers[i * this.cols + j].display();
                this.scene.popMatrix();

                if(this.flowers[i * this.cols + j].hasPollen){
                    this.scene.pushMatrix();
                    this.scene.translate(i*10+5, this.flowers[i * this.cols + j].pos[1]+0.2, j*10+5);
                    this.pollen[i * this.cols + j].display();
                    this.scene.popMatrix();
                }
            }
        }
    }
}