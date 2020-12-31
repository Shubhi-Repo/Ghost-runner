var tower,towerImg;
var doorGroup,doorImg,door;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var spookySound;



function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  
  tower = createSprite(300,300,600,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  ghost = createSprite(200,200);
  ghost.addImage("ghost_",ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  if(gameState === PLAY){
    
    spookySound.play();
    
    if(keyDown("left_arrow")){ 
      ghost.x = ghost.x - 3; } 
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3; } 
    if(keyDown("space")){ 
      ghost.velocityY = -10; } 
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y>600){
    tower.y=300;
  }
  
  spawnDoor();
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = END;
    }
  
    drawSprites();
    
  }
  
  else if(gameState === END){
    
    spookySound.stop();
    
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250);
    
  }
  
  
  
}

function spawnDoor(){
  if(frameCount % 240 === 0){
  door = createSprite(200,-50);
  door.addImage("obstacle",doorImg);
    
  climber = createSprite(200,10);
  climber.addImage("climb",climberImg);
    
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  
    
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  
  climber.x = door.x;
  invisibleBlock.x = door.x;
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
    
  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;
    
  doorGroup.add(door);
    
  invisibleBlock.visible = false;
  invisibleBlock.debug = true;
    
  climberGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  } 
}