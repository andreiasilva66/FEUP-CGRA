import {CGFobject} from '../../lib/CGF.js';

export class MyTrapezoid extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1.5, 0, 0,	//0
			1.5, 0, 0,	//1
			1, 2, 0,	//2
            -1, 2, 0	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 2, 3,
            0, 1, 3,
            2, 1, 0,
            2, 0, 3
		];

		// Texture coordinates
		this.texCoords = [
			0, 0,   // Vertex 0
			1, 0,   // Vertex 1
			0.833, 1,   // Vertex 2
			0.167, 1    // Vertex 3
		];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}