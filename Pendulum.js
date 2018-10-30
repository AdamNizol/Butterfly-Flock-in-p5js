var  VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
     VerletParticle2D = toxi.physics2d.VerletParticle2D,
     ParticleString2D = toxi.physics2d.ParticleString2D,
     VerletSpring2D = toxi.physics2d.VerletSpring2D,
     VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
     GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
     Rect = toxi.geom.Rect,
     Vec2D = toxi.geom.Vec2D;

let p1, p2, p3, s1, s2, physics, bg, curImage;
let ready = false;

//let curImage = [];
getImg("Images/butterfly.png",960,660);

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  frameRate(60);
  physics = new VerletPhysics2D();
  //physics.setWorldBounds(new Rect(-width/2, -height/2, width, height));
  //VerletParticle2D selected=null;

  p1 =  new VerletParticle2D(70,70);
  p2 = new VerletParticle2D(width/2+55,-20);
  p3 = new VerletParticle2D(width/2+150,-50);
  s1 = new VerletSpring2D(p1,p2,200,1);
  s2 = new VerletSpring2D(p2,p3,170,1);

  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addParticle(p3);

  physics.addSpring(s1);
  physics.addSpring(s2);

  p1.lock();

  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.1)));
  physics.setDrag(0);

  window.addEventListener('resize', function(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    //physics.setWorldBounds(new Rect(-width/2, -height/2, width, height));
  } );

  //console.log(getPixel("Images/butterfly.png", 230,240));
  bg = loadImage("Images/butterfly.png");
}

function draw() {
  if(ready){
    background(100, 100, 100);
    //translate(width/2, height/2.5);
    physics.update();
    fill(150);
    //rect(0-400,0-300,960,660);
    image(bg, 0, 0);
    //physics.update();
    fill(127);
    stroke(0);
    strokeWeight(2);
    line(p1.x, p1.y,p2.x, p2.y);
    line(p2.x, p2.y,p3.x, p3.y);

    let col = getPixel(p1.x, p1.y);
    fill(col[0],col[1],col[2] );
    ellipse(p1.x, p1.y, 20,20);
    let col2 = getPixel(p2.x, p2.y);
    fill(col2[0],col2[1],col2[2]);
    ellipse(p2.x, p2.y, 20,20);
    let col3 = getPixel(p3.x, p3.y);
    fill(col3[0],col3[1],col3[2]);
    ellipse(p3.x, p3.y, 20,20);

  }else{
    background(50, 50, 50);
  }


}
function getPixel(x, y) {
  //let pos = 4*(curImage.width*Math.floor(y) + Math.floor(x));
  let pos = ((curImage.width * Math.floor(y)) + Math.floor(x)) * 4;
  //console.log(curImage.data[pos]+", "+curImage.data[pos+1]+", "+curImage.data[pos+2]+", "+curImage.data[pos+3]);
  //console.log(curImage.data);
  //return [0,0,0,0];
  if(curImage.data == undefined ){
    ("err222222, undefined")
    return([255,255,255,1]);
  }
  if(curImage.data[pos] == undefined){
    console.log("err, undefined")
    return([255,255,255,1]);
  }else{
    //console.log(curImage.data[pos]);
    //console.log(x+", "+y)
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


  //console.log(context.getImageData(0, 0, w, h));
  //return context.getImageData(0, 0, w, h);
}
