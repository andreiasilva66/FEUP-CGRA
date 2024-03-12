import { CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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

        let idx = 0;
        // let stackhight = 1 / this.stacks;
        let incr = 2 * Math.PI / this.slices;

        // for(let i = 0; i < this.stacks; i++){
        //     for(let j = 0; j<this.slices; j++){
            
        //         let x1 = Math.cos(j*incr);
        //         let y1 = Math.sin(j*incr);
        //         let x2 = Math.cos((j+1)*incr);
        //         let y2 = Math.sin((j+1)*incr);

        //         let z1 = i*stackhight;
        //         let z2 = (i+1)*stackhight;

        //         this.vertices.push(x1, y1, z1, x2, y2, z1, x1, y1, z2, x2, y2, z2);
        //         let base = 4*i*this.slices+4*j;
        //         this.indices.push(base, base+1, base+2, base+1, base+3, base+2);
        //         let nx = Math.cos(j*incr + incr/2);
        //         let ny = Math.sin(j*incr + incr/2); 
        //         this.normals.push(nx, ny, 0, nx, ny, 0, nx, ny, 0, nx, ny, 0);
        //     }
        // }


        for (let i = 0 ; i < this.slices ; i++) {

            let x1 = Math.cos(i*incr);
            let y1 = Math.sin(i*incr);
            let x2 = Math.cos((i+1)*incr);
            let y2 = Math.sin((i+1)*incr);
            
            let zIncr = 1 / this.stacks
            for (let j = 0 ; j < this.stacks ; j++) {

                let x = Math.cos((i+0.5)* incr);
                let y = Math.sin((i+0.5)*incr);
                let size = Math.sqrt(x*x + y*y);

                this.vertices.push(x1, y1, zIncr * j, x2, y2, zIncr * j, x1, y1, zIncr * (j + 1), x2, y2, zIncr * (j + 1));
                this.indices.push(idx+2, idx, idx+1, idx+1, idx+3, idx+2);
                this.indices.push(idx+1, idx, idx+2, idx+2, idx+3, idx+1);
                this.normals.push(x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0);
                console.log(this.normals);
                idx+=4;
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