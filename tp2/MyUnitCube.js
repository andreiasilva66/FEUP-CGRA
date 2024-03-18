import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
            -0.5, -0.5, 0.5,	//1
            -0.5, 0.5, -0.5,	//2
            -0.5, 0.5, 0.5,		//3
            0.5, -0.5, -0.5,	//4
            0.5, -0.5, 0.5,		//5
            0.5, 0.5, -0.5,		//6
            0.5, 0.5, 0.5		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, //left
            1, 3, 2,
            4, 6, 5, //right
            5, 6, 7,
            0, 2, 4, //bottom
            2, 6, 4,
            1, 5, 3, //top
            3, 5, 7,
            0, 4, 1, //back
            1, 4, 5,
            2, 3, 6, //front
            3, 7, 6
		];

        this.normals = [
            -1, 0, 0, //left
            -1, 0, 0,
            1, 0, 0, //right
            1, 0, 0,
            0, -1, 0, //bottom
            0, -1, 0,
            0, 1, 0, //top
            0, 1, 0,
            0, 0, -1, //back
            0, 0, -1,
            0, 0, 1, //front
            0, 0, 1
        ];  

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

