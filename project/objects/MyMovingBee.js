import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyBee } from './MyBee.js';
import { MyPollen } from './MyPollen.js';

export class MyMovingBee extends CGFobject {
    constructor(scene, curviness) {
        super(scene);
        this.bee = new MyBee(this.scene);
        this.initY = 15;
        this.pos = [0, this.initY, 0];
        this.states = ['idle', 'flyingUp', 'flyingDown', 'goingUp', 'goingDown', 'goingHive'];
        this.state = 1;
        this.orientation = 0;
        this.velocity = 0;
        
    }

    display(){
        if(this.states[this.state] == 'flyingUp'){
            this.pos[1] += 0.05;
            if(this.pos[1] >= this.initY + 1){
                this.state = 2;
            }
        }
        else if(this.states[this.state] == 'flyingDown'){
            this.pos[1] -= 0.05;
            if(this.pos[1] <= this.initY - 1 ){
                this.state = 1;
            }
        }
        else if(this.states[this.state] == 'goingUp'){
            this.pos[1] += 0.05;
            if(this.pos[1] >= this.initY + 1){
                this.state = 1;
            }
        }
        else if(this.states[this.state] == 'goingDown'){
            this.pos[1] -= 0.05;
            if(this.touchFlower()){
                this.state = 0;
            }
            if(this.pos[1] <= 0.5){
                this.state = 0;
            }
        }
        else if(this.states[this.state] == 'goingHive'){
            this.moveToHive();
        }

        if(this.velocity != 0){
            this.pos[0] += this.velocity * Math.sin(this.orientation);
            this.pos[2] += this.velocity * Math.cos(this.orientation);
        }

        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.bee.display();
        this.scene.popMatrix();
    
    }

    touchFlower(){
        for(let flower of this.scene.garden.flowers){
            console.log(flower.pos[0] + " " + flower.pos[1] + " " + flower.pos[2]);
            if(flower.pos[0] >= this.pos[0] - 1 && flower.pos[0] <= this.pos[0] + 1){
                if(flower.pos[2] >= this.pos[2] - 1 && flower.pos[2] <= this.pos[2] + 1){
                    if(flower.pos[1] >= this.pos[1] - 0.5 && flower.pos[1] <= this.pos[1] + 0.5){
                        if(flower.hasPollen){
                            flower.hasPollen = false;
                            this.bee.hasPollen = true;
                        }
                        return true;
                    }
                }
            }
        } 
        return false;
    } 

    turn(v){
        this.orientation += v;
    }

    accelerate(v){
        if(this.velocity + v >= 0)
            this.velocity += v;
        else
            this.velocity = 0;
    }

    goDown(){
        if(this.states[this.state] != 'idle' && this.states[this.state] != 'goingUp'){
            this.state = 4;
        }
    }

    goUp(){
        if(this.states[this.state] != 'goingDown'){
            this.state = 3;
        }
    }

    goHive(){
        if(this.bee.hasPollen){
            this.state = 5;
        }
    }

    moveToHive(){
    const tolerance = 0.1; // Define a tolerance value for position comparisons

    // Change the orientation to face the hive
    if (Math.abs(this.pos[2] - this.scene.hivePos[2]) > tolerance) {
        this.orientation = this.pos[2] < this.scene.hivePos[2] ? 0 : Math.PI;
    } else if (Math.abs(this.pos[0] - this.scene.hivePos[0]) > tolerance) {
        this.orientation = this.pos[0] < this.scene.hivePos[0] ? Math.PI / 2 : -Math.PI / 2;
    } 

    // Move the bee to the hive
    if (Math.abs(this.pos[2] - this.scene.hivePos[2]) > tolerance) {
        this.pos[2] += this.pos[2] < this.scene.hivePos[2] ? 0.05 : -0.05;
    }else  if (Math.abs(this.pos[0] - this.scene.hivePos[0]) > tolerance) {
        this.pos[0] += this.pos[0] < this.scene.hivePos[0] ? 0.05 : -0.05;
    }else if (Math.abs(this.pos[1] - this.scene.hivePos[1]) > tolerance) {
        this.pos[1] += this.pos[1] < this.scene.hivePos[1] ? 0.05 : -0.05;
    } else {
        this.bee.hasPollen = false;
        this.state = 0;
        this.scene.hive.pollens.push(new MyPollen(this.scene));
    }
    }
}
