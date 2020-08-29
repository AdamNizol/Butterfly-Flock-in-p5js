var  VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
     VerletParticle2D = toxi.physics2d.VerletParticle2D,
     ParticleString2D = toxi.physics2d.ParticleString2D,
     VerletSpring2D = toxi.physics2d.VerletSpring2D,
     VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
     GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
     AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior,
     Rect = toxi.geom.Rect,
     Vec2D = toxi.geom.Vec2D;

let p1, physics, bg, curImage;
let ready = false;
let particles = [];
let particlesLeft = [];
let particlesRight = [];
let particlesBottom = [];
let frameCounter = 0;
let imageNum = 1;

//let curImage = [];
getImg("Images/butterfly.png",960,660);

function setup() {
  //createCanvas(window.innerWidth,window.innerHeight);
  createCanvas(1280, 720);
  frameRate(60);
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  /*window.addEventListener('resize', function(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    physics.setWorldBounds(new Rect(-width/2, -height/2, width, height));
    physicsLeft.setWorldBounds(new Rect(-width/2, -height/2, width, height));
  } );*/

  bg = loadImage("Images/butterfly.png");
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.1)));
  //physics.addBehavior(new GravityBehavior(new Vec2D(0,-0.05)));
  p1 = new VerletParticle2D(10,10);
  physics.addParticle(p1);
  physics.addBehavior(new AttractionBehavior(p1, 350, 0.1));

  for(let i =0; i<600; i++){
    particles.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physics.addParticle(particles[i]);
    //physics.addBehavior(new AttractionBehavior(particles[i], Math.random()*50+ 225, Math.random()*0.5-0.5));
  }

  physicsLeft = new VerletPhysics2D();
  physicsLeft.setWorldBounds(new Rect(0, 0, width, height));
  physicsLeft.addBehavior(new GravityBehavior(new Vec2D(0.1,0)));
  physicsLeft.addParticle(p1);
  physicsLeft.addBehavior(new AttractionBehavior(p1, 350, 0.1));

  for(let i =0; i<600; i++){
    particlesLeft.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsLeft.addParticle(particlesLeft[i]);
    //physics.addBehavior(new AttractionBehavior(particles[i], Math.random()*50+ 225, Math.random()*0.5-0.5));
  }

  physicsRight = new VerletPhysics2D();
  physicsRight.setWorldBounds(new Rect(0, 0, width, height));
  physicsRight.addBehavior(new GravityBehavior(new Vec2D(-0.1,0)));
  physicsRight.addParticle(p1);
  physicsRight.addBehavior(new AttractionBehavior(p1, 350, 0.1));

  for(let i =0; i<600; i++){
    particlesRight.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsRight.addParticle(particlesRight[i]);
    //physics.addBehavior(new AttractionBehavior(particles[i], Math.random()*50+ 225, Math.random()*0.5-0.5));
  }

  physicsBottom = new VerletPhysics2D();
  physicsBottom.setWorldBounds(new Rect(0, 0, width, height));
  physicsBottom.addBehavior(new GravityBehavior(new Vec2D(0,-0.1)));
  physicsBottom.addParticle(p1);
  //physicsBottom.addBehavior(new AttractionBehavior(p1, 350, 0.1));

  for(let i =0; i<600; i++){
    particlesBottom.push(new VerletParticle2D(Math.floor(Math.random()*width),Math.random()*660));
    physicsBottom.addParticle(particlesBottom[i]);
    //physics.addBehavior(new AttractionBehavior(particles[i], Math.random()*50+ 225, Math.random()*0.5-0.5));
  }


}

function draw() {
  if(ready){
    physics.update();
    frameCounter++;
    physicsLeft.update();
    physicsRight.update();
    physicsBottom.update();
    if(frameCounter >= 20){
      frameCounter = 0;
      getImg("Images/img"+("000"+imageNum).slice(-4)+".jpg", 1280, 720);
      imageNum++;
    }

    background(250, 250, 250,0);
    //fill(100,100,100, 30);
    //rect(0,0,width,height);
    fill(127);
    p1.x = mouseX;
    p1.y = mouseY;
    let col = getPixel(p1.x,p1.y);

    fill(col[0],col[1],col[2],col[3]);
    ellipse(p1.x, p1.y, 20,20);

    stroke(0,0,0,0);
    for(let i=0; i<particles.length;i++){
      if(particles[i].y == height){
        physics.removeParticle(particles[i]);
        //particles[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*50));
        particles[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physics.addParticle(particles[i]);
        /*
        particles[i].y = 0;
        particles[i].x = Math.floor(Math.random()*959);
        particles[i].clearVelocity();
        particles[i].clearForce();
        console.log(particles[i].getForce())*/
      }

      col = getPixel(particles[i].x,particles[i].y);
      fill(col[0],col[1],col[2],125);
      //rect(particles[i].x-5, particles[i].y-5,10,10);
      ellipse(particles[i].x, particles[i].y, 7,7);
    }

    for(let i=0; i<particlesLeft.length;i++){
      if(particlesLeft[i].x == width){
        physicsLeft.removeParticle(particlesLeft[i]);
        //particlesLeft[i] =  new VerletParticle2D(Math.floor(Math.random()*50),Math.floor(Math.random()*height));
        particlesLeft[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsLeft.addParticle(particlesLeft[i]);
      }

      col = getPixel(particlesLeft[i].x,particlesLeft[i].y);
      fill(col[0],col[1],col[2],125);
      //rect(particles[i].x-5, particles[i].y-5,10,10);
      ellipse(particlesLeft[i].x, particlesLeft[i].y, 7,7);
    }

    for(let i=0; i<particlesRight.length;i++){
      if(particlesRight[i].x == 0){
        physicsRight.removeParticle(particlesRight[i]);
        //particlesRight[i] =  new VerletParticle2D(width - Math.floor(Math.random()*50),Math.floor(Math.random()*height));
        particlesRight[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsRight.addParticle(particlesRight[i]);
      }

      col = getPixel(particlesRight[i].x,particlesRight[i].y);
      fill(col[0],col[1],col[2],125);
      //rect(particles[i].x-5, particles[i].y-5,10,10);
      ellipse(particlesRight[i].x, particlesRight[i].y, 7,7);
    }

    for(let i=0; i<particlesBottom.length;i++){
      if(particlesBottom[i].y <= 1){
        physicsBottom.removeParticle(particlesBottom[i]);
        //particlesBottom[i] =  new VerletParticle2D(Math.floor(Math.random()*width),height - Math.floor(Math.random()*50));
        particlesBottom[i] =  new VerletParticle2D(Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        physicsBottom.addParticle(particlesBottom[i]);
      }

      col = getPixel(particlesBottom[i].x,particlesBottom[i].y);
      fill(col[0],col[1],col[2],125);
      //rect(particles[i].x-5, particles[i].y-5,10,10);
      ellipse(particlesBottom[i].x, particlesBottom[i].y, 7,7);
    }

  }else{
    background(250, 250, 250);
  }
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
