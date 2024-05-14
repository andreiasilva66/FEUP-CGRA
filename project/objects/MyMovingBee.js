import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyBee } from './MyBee.js';

export class MyMovingBee extends CGFobject {
    constructor(scene, curviness) {
        super(scene);
        this.bee = new MyBee(this.scene);
        this.pos = [0, 3, 0];
        this.goingUp = true;
        this.orientation = 0;
        this.velocity = 0;
    }

    display(){
        if(this.goingUp){
            this.pos[1] += 0.05;
            if(this.pos[1] >= 4){
                this.goingUp = false;
            }
        }
        else{
            this.pos[1] -= 0.05;
            if(this.pos[1] <= 2){
                this.goingUp = true;
            }
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

    turn(v){
        this.orientation += v;
    }

    accelerate(v){
        if(this.velocity + v >= 0)
            this.velocity += v;
        else
            this.velocity = 0;
    }
}