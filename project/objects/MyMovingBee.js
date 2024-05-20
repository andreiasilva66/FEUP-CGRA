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
        this.t = undefined;
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
            var flower = this.getNearestFlower();
            console.log("nearest flower coords: " + flower.pos[0] + " " + flower.pos[1] + " " + flower.pos[2]);
            this.moveTo(flower.pos);
            console.log("bee coords after move: " + this.pos[0] + " " + this.pos[1] + " " + this.pos[2]);
            // console.log("going down");
            // this.pos[1] -= 0.05;
            // if(this.touchFlower()){
            //     this.state = 0;
            // }
            // if(this.pos[1] <= 0.5){
            //     this.state = 0;
            // }
            
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
        
        if (Math.abs(this.pos[2] - this.scene.hivePos[2]) > tolerance) {
            this.orientation = this.pos[2] < this.scene.hivePos[2] ? 0 : Math.PI;
        } else if (Math.abs(this.pos[0] - this.scene.hivePos[0]) > tolerance) {
            this.orientation = this.pos[0] < this.scene.hivePos[0] ? Math.PI / 2 : -Math.PI / 2;
        } 

        // Define the start and end positions
        const startX = this.pos[0];
        const startY = this.pos[1];
        const startZ = this.pos[2];
    
        const endX = this.scene.hivePos[0];
        const endY = this.scene.hivePos[1];
        const endZ = this.scene.hivePos[2];
    
        // Calculate the horizontal distance and midpoint
        const dx = endX - startX;
        const dz = endZ - startZ;
        const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
    
        // Define the peak of the parabola (you can adjust the height factor)
        const peakHeight = 5.0; // Maximum height of the parabola above the midpoint
        const midpointX = (startX + endX) / 2;
        const midpointY = Math.max(startY, endY) + peakHeight;
        const midpointZ = (startZ + endZ) / 2;
    
        // Define the parameter t (0 <= t <= 1)
        if (this.t === undefined) {
            this.t = 0;
        }

        this.t += 0.001;
    
        if (this.t > 1) {
            this.t = 1; // Clamp t to 1 when it exceeds 1
        }
    
        // Calculate the interpolated positions using a parabolic formula
        const t = this.t;
        const parabolicX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midpointX + t * t * endX;
        const parabolicY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midpointY + t * t * endY;
        const parabolicZ = (1 - t) * (1 - t) * startZ + 2 * (1 - t) * t * midpointZ + t * t * endZ;
    
        // Update the bee's position
        this.pos[0] = parabolicX;
        this.pos[1] = parabolicY;
        this.pos[2] = parabolicZ;
    
        // Check if the bee has reached the hive
        if (Math.abs(this.pos[0] - endX) < tolerance && Math.abs(this.pos[1] - endY) < tolerance && Math.abs(this.pos[2] - endZ) < tolerance) {
            this.bee.hasPollen = false;
            this.state = 0;
            this.scene.hive.pollens.push(new MyPollen(this.scene));
            this.t = undefined; // Reset t for the next movement
        }
    }    

    getNearestFlower() {
        var list = [1000000, flower];
        for( var flower in this.scene.garden.flowers){
            if(this.scene.garden.flowers[flower].hasPollen == true){
                var currDist = Math.sqrt(this.scene.garden.flowers[flower].pos[1]**2 + this.scene.garden.flowers[flower].pos[0]**2 + this.scene.garden.flowers[flower].pos[2]**2);
                if(currDist < list[0]){
                    list[0] = currDist;
                    list[1] = this.scene.garden.flowers[flower];
                }
            }
        }
        this.state = 0;
        return list[1];
    }

    moveTo(targetPos) {
        const tolerance = 0.1; // Define a tolerance value for position comparisons
        
        if (Math.abs(this.pos[2] - targetPos[2]) > tolerance) {
            this.orientation = this.pos[2] < targetPos[2] ? 0 : Math.PI;
        } else if (Math.abs(this.pos[0] - targetPos[0]) > tolerance) {
            this.orientation = this.pos[0] < targetPos[0] ? Math.PI / 2 : -Math.PI / 2;
        } 

        // Define the start and end positions
        const startX = this.pos[0];
        const startY = this.pos[1];
        const startZ = this.pos[2];
    
        const endX = targetPos[0];
        const endY = targetPos[1];
        const endZ = targetPos[2];
    
        // Calculate the horizontal distance and midpoint
        const dx = endX - startX;
        const dz = endZ - startZ;
        const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
    
        // Define the peak of the parabola (you can adjust the height factor)
        const midpointX = (startX + endX) / 2;
        const midpointY = Math.max(startY, endY);
        const midpointZ = (startZ + endZ) / 2;
    
        // Define the parameter t (0 <= t <= 1)
        if (this.t === undefined) {
            this.t = 0;
        }

        this.t += 0.001;
    
        if (this.t > 1) {
            this.t = 1; // Clamp t to 1 when it exceeds 1
        }
    
        // Calculate the interpolated positions using a parabolic formula
        const t = this.t;
        const parabolicX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midpointX + t * t * endX;
        const parabolicY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midpointY + t * t * endY;
        const parabolicZ = (1 - t) * (1 - t) * startZ + 2 * (1 - t) * t * midpointZ + t * t * endZ;
        console.log("par" + parabolicX + " " + parabolicY + " " + parabolicZ);
        // Update the bee's position
        if(this.pos[1] <= 0.5){
            console.log("TOUCHED THE GROUND");
            this.state = 0;
            this.pos[0] = parabolicX;
            this.pos[1] = .5;
            this.pos[2] = parabolicZ;
            this.t = undefined
            return;
        }
        
        this.pos[0] = parabolicX;
        this.pos[1] = parabolicY;
        this.pos[2] = parabolicZ;

        if(this.touchFlower()){
            console.log("TOUCHED FLOWER"); 
            this.state = 0;
            this.t = undefined; // Reset t for the next movement
            return;
        }   
    }
}
