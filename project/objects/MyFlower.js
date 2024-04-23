import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyPetal } from "./MyPetal.js";
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from "./MyReceptacle.js";

export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.petal = new MyPetal(scene);
        this.stem = new MyStem(scene);
        this.receptacle = new MyReceptacle(scene);
    }

    display() {
    
        const petals = [
            { translate: [0.30, 1.3, 0], rotate: (-Math.PI/6) },
            { translate: [1.30, -0.4, 0], rotate: (Math.PI/2) },
            { translate: [0.4, -1.25, 0], rotate: (Math.PI/6) },
            { translate: [-0.4, -1.25, 0], rotate: (5*Math.PI/6)  },
            { translate: [-1.3, -0.4, 0], rotate: Math.PI/2 },
            { translate: [-0.3, 1.3, 0], rotate: (7*Math.PI/6) }
        ];

        // Display each petal using a loop
        for (const petal of petals) {
            this.scene.pushMatrix();
            this.scene.translate(...petal.translate);
            this.scene.rotate(petal.rotate, 0, 0, 1);
            this.petal.display();
            this.scene.popMatrix();
        }
        
        // Display the stem
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, 0);
        this.stem.display();
        this.scene.popMatrix();
    
        // Display the receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.receptacle.display();
        this.scene.popMatrix();
    }
}