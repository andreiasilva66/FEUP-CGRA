import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyHead } from "./MyHead.js";
import { MyLeg } from "./MyLeg.js"
import { MyWing } from "./MyWing.js";
import { MyPollen } from "./MyPollen.js";

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.hasPollen = false;
        this.initY = 15;
        this.pos = [0, this.initY, 0];
        this.states = ['idle', 'flyingUp', 'flyingDown', 'goingUp', 'goingDown', 'goingHive'];
        this.state = 1;
        this.orientation = 0;
        this.velocity = [0, 0, 0];
        this.initObjects();
        this.initMaterials();
    }

    initObjects(){
        this.sphere = new MySphere(this.scene, 20, 20);
        this.head = new MyHead(this.scene);
        this.leg = new MyLeg(this.scene);
        this.wing = new MyWing(this.scene);
        this.pollen = new MyPollen(this.scene);
    }

    initMaterials(){

        // Fur Material
        this.furMaterial = new CGFappearance(this.scene);
        this.furMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.furMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.furMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.furMaterial.setShininess(10.0);
        this.furMaterial.loadTexture('images/furText.jpg');
        this.furMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    
        // Abdomen Material
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.abdomenMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setShininess(10.0);
        this.abdomenMaterial.loadTexture('images/abdomenText.webp');
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Leg Material
        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(0, 0, 0, 1); 
        this.legMaterial.setDiffuse(0.2, 0.08, 0.01, 1); 
        this.legMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.legMaterial.setShininess(10.0);

    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);

        // Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.3);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.furMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        // Thorax
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, -0.9);
        this.scene.scale(0.3, 0.2, 0.4);
        this.furMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Abdomen
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.translate(0, -1.2, -1.1);
        this.scene.scale(0.5, 0.6, 0.3);
        this.abdomenMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Right Legs
        for (let i = 0; i < 3; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0.2, 0.5, -0.7 - i * 0.2); 
            this.scene.scale(1, 0.8, 1);
            this.legMaterial.apply();
            this.leg.display();
            this.scene.popMatrix();
        }

        // Left Legs
        for (let i = 0; i < 3; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0.2, 0.5, 0.7 + i * 0.2); 
            this.scene.scale(1, 0.8, 1);
            this.legMaterial.apply();
            this.leg.display();
            this.scene.popMatrix();
        }

        // First Right Wing
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.7, -0.8);
        this.wing.display();
        this.scene.popMatrix();

        // Second Right Wing
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.7, -1.05);
        this.scene.scale(0.8, 0.8, 0.8);
        this.wing.display();
        this.scene.popMatrix();

        // First Left Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0.2, 0.7, 0.8);
        this.wing.display();
        this.scene.popMatrix();

        // Second Left Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0.2, 0.7, 1.05);
        this.scene.scale(0.8, 0.8, 0.8);
        this.wing.display();
        this.scene.popMatrix();

        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, -0.8);
            this.pollen.display();
            this.scene.popMatrix();
        }

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
        let norm = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[2] * this.velocity[2]);
        this.velocity[0] = norm * Math.sin(this.orientation);
        this.velocity[2] = norm * Math.cos(this.orientation);
    }

    accelerate(v) {
        let norm = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[2] * this.velocity[2]);
        if (norm + v > 0) {
            // Calculate new velocity components based on current orientation
            let newVelX = this.velocity[0] + v * Math.sin(this.orientation);
            let newVelZ = this.velocity[2] + v * Math.cos(this.orientation);
        
            // Update the velocity components
            this.velocity[0] = newVelX;
            this.velocity[2] = newVelZ;
        }
        else {
            this.velocity[0] = 0;
            this.velocity[2] = 0;
        }
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
        if(this.hasPollen){
            this.state = 5;
        }
    }

    moveToHive(){
        const tolerance = 0.2; // Tolerance for the bee to reach the hive

        // Change the orientation to face the hive
        if (Math.abs(this.pos[2] - this.scene.hivePos[2]) > tolerance) {
            this.orientation = this.pos[2] < this.scene.hivePos[2] ? 0 : Math.PI;
        } else if (Math.abs(this.pos[0] - this.scene.hivePos[0]) > tolerance) {
            this.orientation = this.pos[0] < this.scene.hivePos[0] ? Math.PI / 2 : -Math.PI / 2;
        } 

        // Move the bee to the hive
        if (Math.abs(this.pos[2] - this.scene.hivePos[2]) > tolerance) {
            this.pos[2] += this.pos[2] < this.scene.hivePos[2] ? 0.3 : -0.3;
        }else  if (Math.abs(this.pos[0] - this.scene.hivePos[0]) > tolerance) {
            this.pos[0] += this.pos[0] < this.scene.hivePos[0] ? 0.3 : -0.3;
        }else if (Math.abs(this.pos[1] - this.scene.hivePos[1]) > tolerance) {
            this.pos[1] += this.pos[1] < this.scene.hivePos[1] ? 0.3 : -0.3;
        } else {
            this.bee.hasPollen = false;
            this.state = 0;
            this.scene.hive.pollens.push(new MyPollen(this.scene));
        }
    }

    update(t){
        switch (this.states[this.state]) {
            case 'flyingUp':
                this.pos[1] += 0.2;
                if (this.pos[1] >= this.initY + 1) {
                    this.state = 2;
                }
                break;
            case 'flyingDown':
                this.pos[1] -= 0.2;
                if (this.pos[1] <= this.initY - 1) {
                    this.state = 1;
                }
                break;
            case 'goingUp':
                this.pos[1] += 0.3;
                if (this.pos[1] >= this.initY + 1) {
                    this.state = 1;
                }
                break;
            case 'goingDown':
                this.pos[1] -= 0.3;
                if (this.touchFlower()) {
                    this.state = 0;
                }
                if (this.pos[1] <= 0.5) {
                    this.state = 0;
                }
                break;
            case 'goingHive':
                this.moveToHive();
                break;
            default:
                break;
        }
    
        if (this.velocity[0] != 0 || this.velocity[2] != 0) {
            this.pos[0] += this.velocity[0];
            this.pos[2] += this.velocity[2];
        }
    }
}
