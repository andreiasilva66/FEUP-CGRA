import { CGFobject } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var xstack;
        var ystack;
        var zstack;
        for (let stack = 0; stack <= this.stacks; stack++) {
            const theta = stack * Math.PI / this.stacks;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                const phi = slice * 2 * Math.PI / this.slices;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;
                const u = 1 - (slice / this.slices);
                const v =  stack / this.stacks;
                const min = .95; // Minimum value
                const max = 1.2; // Maximum value
                const randomNumber = Math.random() * (max - min) + min;
                const xn = (slice == 0 || slice == this.slices) ? x : x * randomNumber;
                const yn = (slice == 0 || slice == this.slices) ? y : y * randomNumber;
                const zn = (slice == 0 || slice == this.slices) ? z : z * randomNumber;
                this.vertices.push(xn, yn, zn);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = (stack * (this.slices + 1)) + slice;
                const second = first + this.slices + 1;

                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
