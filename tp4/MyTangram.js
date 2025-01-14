import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyDiamond  } from './old/MyDiamond.js';
import { MyTriangle } from './old/MyTriangle.js';
import { MyParalellogram } from './old/MyParalellogram.js';
import { MyTriangleBig } from './old/MyTriangleBig.js'; 
import { MyTriangleSmall } from './old/MyTriangleSmall.js';

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangleBlue = new MyTriangleBig(this.scene, [0, 0, 1, 0, 0.5, 0.5]);
        this.triangleOrange = new MyTriangleBig(this.scene, [1, 0, 0.5, 0.5, 1, 1]);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleRed = new MyTriangleSmall(this.scene, [0.5, 0.5, 0.25, 0.75, 0.75, 0.75]);
        this.trianglePurple = new MyTriangleSmall(this.scene, [0, 0, 0, 0.5, 0.25, 0.25]);
        this.paralellogram = new MyParalellogram(this.scene);
        this.initMaterials();
    }

    initMaterials(){
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.diamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.diamondMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.diamondMaterial.setShininess(10.0);
        //this.diamondMaterial.loadTexture('images/tangram.png');
        this.diamondMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.triangleBlueMaterial = new CGFappearance(this.scene);
        this.triangleBlueMaterial.setAmbient(0.5, 0.5, 0.5, 1)
        this.triangleBlueMaterial.setDiffuse(0, 0, 1, 0);
        this.triangleBlueMaterial.setSpecular(0.9, 0.9, 0.9, 1)
        this.triangleBlueMaterial.setShininess(10.0);

        this.triangleOrangeMaterial = new CGFappearance(this.scene);
        this.triangleOrangeMaterial.setAmbient(0.5, 0.5, 0.5, 1)
        this.triangleOrangeMaterial.setDiffuse(255/255, 128/255, 0/255, 0);
        this.triangleOrangeMaterial.setSpecular(0.9, 0.9, 0.9, 1)
        this.triangleOrangeMaterial.setShininess(10.0);

        this.trianglePinkMaterial = new CGFappearance(this.scene);
        this.trianglePinkMaterial.setAmbient(0.5, 0.5, 0.5, 1)
        this.trianglePinkMaterial.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0);
        this.trianglePinkMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.trianglePinkMaterial.setShininess(10.0);

        this.triangleRedMaterial = new CGFappearance(this.scene);
        this.triangleRedMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.triangleRedMaterial.setDiffuse(255/255, 0/255, 0/255, 0);
        this.triangleRedMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleRedMaterial.setShininess(10.0);

        this.trianglePurpleMaterial = new CGFappearance(this.scene);
        this.trianglePurpleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.trianglePurpleMaterial.setDiffuse(76/255, 0/255, 153/255, 0);
        this.trianglePurpleMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.trianglePurpleMaterial.setShininess(10.0);

        this.paralellogramMaterial = new CGFappearance(this.scene);
        this.paralellogramMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.paralellogramMaterial.setDiffuse(255/255, 255/255, 0/255, 0);
        this.paralellogramMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.paralellogramMaterial.setShininess(10.0);

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
    }

//    @Override
    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangleBlue.enableNormalViz();
        this.triangleOrange.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.triangleRed.enableNormalViz();
        this.trianglePurple.enableNormalViz();
        this.paralellogram.enableNormalViz();
    }

//     @Override
    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangleBlue.disableNormalViz();
        this.triangleOrange.disableNormalViz();
        this.trianglePink.disableNormalViz();
        this.triangleRed.disableNormalViz();
        this.trianglePurple.disableNormalViz();
        this.paralellogram.disableNormalViz();
    }

    display(){

        this.scene.pushMatrix();
        let translationMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        this.scene.multMatrix(translationMatrix);

        // Display Diamond
        this.scene.translate(2, 1, 0);
        //this.diamondMaterial.apply();
        this.texture.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // Display Blue Triangle
        this.scene.pushMatrix();
        this.scene.rotate(45*Math.PI/180, 0, 0, 1);
        //this.triangleBlueMaterial.apply();
        this.texture.apply();
        this.triangleBlue.display();
        this.scene.popMatrix();

        // Display Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -2, 0);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        //this.triangleOrangeMaterial.apply();
        this.texture.apply();
        this.triangleOrange.display();
        this.scene.popMatrix();

        // Display Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
        //this.trianglePinkMaterial.apply();
        this.texture.apply();
        this.trianglePink.display();
        this.scene.popMatrix();

        // Display Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(0.7, -2.12, 0);
        this.scene.rotate(45*Math.PI/180, 0, 0, 1);
        //this.triangleRedMaterial.apply();
        this.texture.apply();
        this.triangleRed.display();
        this.scene.popMatrix();

        // Display Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        //this.trianglePurpleMaterial.apply();
        this.texture.apply();
        this.trianglePurple.display();
        this.scene.popMatrix();

        // Display Paralellogram
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -4, 0);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        //this.paralellogramMaterial.apply();
        this.texture.apply();
        this.paralellogram.display();
        this.scene.popMatrix();
    }

    
}