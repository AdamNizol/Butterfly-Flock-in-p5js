var  VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
     VerletParticle2D = toxi.physics2d.VerletParticle2D,
     ParticleString2D = toxi.physics2d.ParticleString2D,
     VerletSpring2D = toxi.physics2d.VerletSpring2D,
     VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
     GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
     AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior,
     Rect = toxi.geom.Rect,
     Vec2D = toxi.geom.Vec2D;

let strokeControl;
let mousePos, physics, bg, curImage;
let ready = false;
let particles = [];
let particlesLeft = [];
let particlesRight = [];
let particlesBottom = [];
let frameCounter = 0;
let imageNum = 1;
let frameCount = 12;
let minParticleSize = 2;
let maxParticleSize = 15;

let particleSize = maxParticleSize;

let butterflyUrl = "Images/butterfly.png"
getImg(butterflyUrl,960,660);

function setup() {
  strokeControl = document.getElementById("strokeEnabledBox");
  mousePos = new Vec2D(mouseX, mouseY);
  let mouseAttraction = 0.5;
  let mouseAttractionRange = 200;

  createCanvas(962, 720);
  frameRate(60);
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  bg = loadImage(butterflyUrl);
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.1)));
  physics.addBehavior(new AttractionBehavior(mousePos, mouseAttractionRange, mouseAttraction));

  for(let i =0; i<600; i++){
    particles.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physics.addParticle(particles[i]);
  }

  physicsLeft = new VerletPhysics2D();
  physicsLeft.setWorldBounds(new Rect(0, 0, width, height));
  physicsLeft.addBehavior(new GravityBehavior(new Vec2D(0.1,0)));
  physicsLeft.addBehavior(new AttractionBehavior(mousePos, mouseAttractionRange, mouseAttraction));

  for(let i =0; i<600; i++){
    particlesLeft.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsLeft.addParticle(particlesLeft[i]);
  }

  physicsRight = new VerletPhysics2D();
  physicsRight.setWorldBounds(new Rect(0, 0, width, height));
  physicsRight.addBehavior(new GravityBehavior(new Vec2D(-0.1,0)));
  physicsRight.addBehavior(new AttractionBehavior(mousePos, mouseAttractionRange, mouseAttraction));

  for(let i =0; i<600; i++){
    particlesRight.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsRight.addParticle(particlesRight[i]);
  }

  physicsBottom = new VerletPhysics2D();
  physicsBottom.setWorldBounds(new Rect(0, 0, width, height));
  physicsBottom.addBehavior(new GravityBehavior(new Vec2D(0,-0.1)));
  physicsBottom.addBehavior(new AttractionBehavior(mousePos, mouseAttractionRange, mouseAttraction));

  for(let i =0; i<600; i++){
    particlesBottom.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsBottom.addParticle(particlesBottom[i]);
  }


}

function draw() {
  if(ready){
    mousePos.set(mouseX, mouseY);
    physics.update();
    frameCounter++;
    physicsLeft.update();
    physicsRight.update();
    physicsBottom.update();
    let framesPerImage = 100;
    particleSize = maxParticleSize - ((maxParticleSize - minParticleSize)*(frameCounter/framesPerImage));
    if(frameCounter >= framesPerImage){
      frameCounter = 0;
      getImg("Images/img"+("000"+imageNum).slice(-4)+".jpg", 550, 640);
      imageNum++;
      imageNum = Math.max(imageNum%(frameCount+1), 1);
    }

    background(250, 250, 250,0);
    fill(127);
    // p1.x = mouseX;
    // p1.y = mouseY;
    // let col = getPixel(p1.x,p1.y);
    //
    // fill(col[0],col[1],col[2],col[3]);
    // ellipse(p1.x, p1.y, 20,20);
    let col
    let particleOpacity = 250

    stroke('rgba(0,0,0,0.05)');
    if(strokeControl.checked){
      strokeWeight(1)
    }else{
      strokeWeight(0)
    }
    for(let i=0; i<particles.length;i++){
      if(particles[i].y == height){
        physics.removeParticle(particles[i]);
        particles[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physics.addParticle(particles[i]);
      }

      col = getPixel(particles[i].x,particles[i].y);
      fill(col[0],col[1],col[2],particleOpacity);
      ellipse(particles[i].x, particles[i].y, particleSize,particleSize);
    }

    for(let i=0; i<particlesLeft.length;i++){
      if(particlesLeft[i].x == width){
        physicsLeft.removeParticle(particlesLeft[i]);
        particlesLeft[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsLeft.addParticle(particlesLeft[i]);
      }

      col = getPixel(particlesLeft[i].x,particlesLeft[i].y);
      fill(col[0],col[1],col[2],particleOpacity);
      ellipse(particlesLeft[i].x, particlesLeft[i].y, particleSize,particleSize);
    }

    for(let i=0; i<particlesRight.length;i++){
      if(particlesRight[i].x == 0){
        physicsRight.removeParticle(particlesRight[i]);
        particlesRight[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsRight.addParticle(particlesRight[i]);
      }

      col = getPixel(particlesRight[i].x,particlesRight[i].y);
      fill(col[0],col[1],col[2],particleOpacity);
      ellipse(particlesRight[i].x, particlesRight[i].y, particleSize,particleSize);
    }

    for(let i=0; i<particlesBottom.length;i++){
      if(particlesBottom[i].y <= 1){
        physicsBottom.removeParticle(particlesBottom[i]);
        particlesBottom[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsBottom.addParticle(particlesBottom[i]);
      }

      col = getPixel(particlesBottom[i].x,particlesBottom[i].y);
      fill(col[0],col[1],col[2],particleOpacity);
      ellipse(particlesBottom[i].x, particlesBottom[i].y, particleSize,particleSize);
    }

  }else{
    background(250, 250, 250);
  }

  col = getPixel(mousePos.x,mousePos.y);
  fill(col[0],col[1],col[2],col[3]);
  stroke('rgba(0,0,0,0.4)');
  strokeWeight(2)
  ellipse(mousePos.x, mousePos.y, 20,20);

}
function getPixel(x, y) {
  let pos = ((curImage.width * Math.floor(y)) + Math.floor(x)) * 4;
  if(curImage.data == undefined ){
    return([255,255,255,1]);
  }
  if(curImage.data[pos] == undefined){
    return([255,255,255,1]);
  }else{
    return [curImage.data[pos],curImage.data[pos+1],curImage.data[pos+2],curImage.data[pos+3]];
  }

}
function getImg(url, w, h) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function()
    {
      context.drawImage(img, 0, 0);
      curImage = context.getImageData(0, 0, w, h);
      ready = true;
    };
  img.src = url;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;
}
