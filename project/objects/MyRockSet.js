import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {

    constructor(scene, numStones=10, maxSlices=10, maxStacks=10) {
        super(scene);
        this.numStones = numStones;
        this.maxSlices = maxSlices;
        this.maxStacks = maxStacks;
        this.rocks = [];
        this.initRocks();
        this.initMaterials();
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    initRocks() {
        for (let i = 0; i < this.numStones; i++) {
            var dx = this.getRndInteger(-this.numStones/10, this.numStones/10);
            var dy = this.getRndInteger(-this.numStones/50, this.numStones/10); // Ensure dy is zero or negative
            var dz = this.getRndInteger(-this.numStones/10, this.numStones/10);
            var rock = new MyRock(this.scene, this.maxSlices, this.maxStacks, [dx, dy, dz]);
            this.rocks.push(rock);
        }
    }

    initMaterials() {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.rockMaterial.apply();
    }

    display() {       
        for (let i = 0; i < this.rocks.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.rocks[i].coords[0], this.rocks[i].coords[1], this.rocks[i].coords[2]);
            this.rocks[i].display();
            this.scene.popMatrix();
        }
    }
}
