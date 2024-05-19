import { CGFobject } from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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
        this.texCoords = []; // Initialize the texture coordinates array

        for (var z = 0; z <= this.stacks; z += 1) {
            this.vertices.push(1, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
            this.texCoords.push(1, z / this.stacks); // Texture coordinates for the first slice
        }

        for (var i = 1; i <= this.slices; i++) {

            var incr = 2 * Math.PI * i / this.slices;
            var x = Math.cos(incr);
            var y = Math.sin(incr);

            var vector_size = Math.sqrt(x * x + y * y);
            if (i != this.slices) {
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
                this.texCoords.push(i / this.slices, 0); // Texture coordinates for the base vertices
            }

            for (var j = 1; j <= this.stacks; j++) {

                if (i != this.slices) {

                    var z = j / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);
                    this.texCoords.push(i / this.slices, z / this.stacks); // Texture coordinates for the side vertices

                    var p = this.vertices.length / 3;
                    var c = p - 2;
                    var d = p - 1;
                    var b = d - (this.stacks + 1);
                    var a = b - 1;
                    this.indices.push(a, c, d, a, d, b);
                    this.indices.push(d, c, a, b, d, a);

                } else {

                    var p = this.vertices.length / 3;

                    var c = j - 1;
                    var d = j;
                    var b = p - this.stacks - 1 + j;
                    var a = b - 1;
                    this.indices.push(a, c, d, a, d, b);
                    this.indices.push(d, c, a, b, d, a);
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