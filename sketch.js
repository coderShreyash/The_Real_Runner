var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  highestScore=0;
  localStorage=highestScore;
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg= loadImage("gameOver.png")
}

function setup() {
  createCanvas(displayWidth-800,displayHeight-600);
  PLAY=1;
  END=0;
  gameState=PLAY;
  trex = createSprite(displayWidth-1450,displayHeight-680,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2,displayHeight-680,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  gameOver = createSprite(displayWidth-1200,displayHeight-770);
  gameOver.addImage(gameOverImg);
  restart = createSprite(displayWidth-1200,displayHeight-730);
 
  restart.addImage(restartImg)
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible=false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight-670,4000,10);
  invisibleGround.visible = false;

  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  bg=0;
}

function draw() {
  background(250);
  stroke("black")
  strokeWeight(5)
  fill("white")
  textSize(30)
  bg=score/1.5
  background(bg)
  text("Highest Score: "+ highestScore, displayWidth-1500,displayHeight-820);
  text("Score: "+ score, displayWidth-1000,displayHeight-820);
  if(gameState==PLAY){
  ground.velocityX=-(6 + 0.1*score/100);
  score = score + Math.round(getFrameRate()/60);
 
  
  if(keyDown("space") &&trex.y>150) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.7
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(score>highestScore){
    highestScore=score
  }
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
}
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);                     
   cloudsGroup.setVelocityXEach(0);
  trex.addAnimation("running",trex_collided);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  

   if(mousePressedOver(
  
   ) || keyDown("space")){ reset();}
  
}
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.addAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth-900,120,40,10);
    cloud.y = Math.round(random(displayHeight-756,displayHeight-716));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0 ) {
    var obstacle = createSprite(displayWidth-900,displayHeight-698,10,40);
    obstacle.velocityX = -(6 + 0.1*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
