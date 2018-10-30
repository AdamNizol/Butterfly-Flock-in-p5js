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

//let curImage = [];
getImg("Images/butterfly.png",960,660);

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  frameRate(60);
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  window.addEventListener('resize', function(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    physics.setWorldBounds(new Rect(-width/2, -height/2, width, height));
  } );

  bg = loadImage("Images/butterfly.png");
  //physics.addBehavior(new GravityBehavior(new Vec2D(0,0.2)));
  p1 = new VerletParticle2D(10,10);
  physics.addParticle(p1);

  physics.addBehavior(new AttractionBehavior(p1, 250, 0.5));


}

function draw() {
  if(ready){
    physics.update();
    background(100, 100, 100);
    fill(127);
    let col = getPixel(p1.x,p1.y);
    fill(col[0],col[1],col[2],col[3]);
    ellipse(p1.x, p1.y, 20,20);
  }else{
    background(50, 50, 50);
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
