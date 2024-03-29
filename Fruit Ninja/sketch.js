var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, knifeImage;
var fruitGroup, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, enemyMoving;

var gameoverImage;

var score, level;

function preload() {
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemyMoving = loadAnimation("alien1.png","alien2.png");
  gameoverImage = loadImage("gameover.png");
  
}


function setup() {
  createCanvas(400,400);
  
  knife = createSprite(200,300,20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.5;
  
  gameover = createSprite(200,200,10,10);
  gameover.addImage(gameoverImage);
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  level = 1;
}

function draw() {
  
  background("blue");
  
  text("Score = " + score,310,40);
  text("Level " + level,30,40);
  
  if (gameState === PLAY) {
    gameover.visible = false;
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    if (fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      score = score + 1;
    }
    if (enemyGroup.isTouching(knife)) {
      gameState = END;
    }
    level = Math.round(1 + score / 6);
    spawnFruit();
    spawnEnemy();
  } else if (gameState === END) {
    gameover.visible = true;
    fruitGroup.setVelocityYEach(0);
    enemyGroup.setVelocityYEach(0);
    fruitGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}


function spawnFruit() {
  
  if (World.frameCount % 60 === 0) {
    var fruit = createSprite(200,400,10,10);
    fruit.velocityY = -(8 + score / 6);
    fruit.scale = 0.15;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    fruit.x = Math.round(random(50,350));
    fruit.lifetime = 400;
    fruitGroup.add(fruit);
  }
}

function spawnEnemy() {
  
  if (World.frameCount % 300 === 0) {
    var enemy = createSprite(200,400,10,10);
    enemy.addAnimation("moving",enemyMoving);
    enemy.velocityY = -(8 + score / 6);
    enemy.x = Math.round(random(50,350));
    enemy.lifetime = 400
    enemyGroup.add(enemy);
  }
}