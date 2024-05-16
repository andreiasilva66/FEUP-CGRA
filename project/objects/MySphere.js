import { CGFobject, CGFappearance } from "../../lib/CGF.js";

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius = 1, inside = false, scaleYTop = 1, scaleYBottom = 1) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.scaleYTop = scaleYTop;
        this.scaleYBottom = scaleYBottom;
        this.inside = inside ? -1 : 1;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            const theta = stack * Math.PI / this.stacks;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                const phi = slice * 2 * Math.PI / this.slices;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = cosPhi * sinTheta;
                let y, scaleY;
                if (stack <= this.stacks / 2) {
                    y = cosTheta * this.scaleYTop;
                    scaleY = this.scaleYTop;
                } else {
                    y = cosTheta * this.scaleYBottom;
                    scaleY = this.scaleYBottom;
                }
                const z = sinPhi * sinTheta;

                const u = this.inside === -1 ? slice / this.slices : 1 - (slice / this.slices);
                const v = stack / this.stacks;

                this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
                this.normals.push(x * this.inside, y * this.inside, z * this.inside);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = (stack * (this.slices + 1)) + slice;
                const second = first + this.slices + 1;

                if (this.inside === -1) {
                    // Reverse the order of indices for inside-out rendering
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                } else {
                    this.indices.push(first, first + 1, second);
                    this.indices.push(second, first + 1, second + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
