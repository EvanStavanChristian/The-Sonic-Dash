var back
var obstacles1Group, obstacles2Group;
var obstacle1, obstacle2;
var dash;
var ground;
var coin, coinGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverI;



function preload() {
  obs1 = loadImage("Obs1.png");
  obs2 = loadImage("Obs2.png");
  rd = loadImage("runDash.png");
  cn = loadImage("coin.png")
  backgro = loadImage("seamless-cartoon-country-landscape-endless-260nw-286804538 (1).webp");
  go = loadImage("gameOver.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  back = createSprite(500, 400, 150, 15);
  back.addImage(backgro);
  back.scale = 4.2;
  back.velocityX = -13;


  dash = createSprite(width-600, height-100, 50, 50);
  dash.shapeColor = "blue";
  dash.addImage(rd);
  dash.scale = 0.2

  ground = createSprite(385, height-5, 850, 18);
  ground.shapeColor = "green";
  ground.velocityX = -6;
  ground.x = ground.width / 2;

  gameOverI = createSprite(300, 200, 200, 200);
  gameOverI.addImage(go);
  gameOverI.scale = 5;

  obstacles1Group = new Group();
  obstacles2Group = new Group();
  coinGroup = new Group();

}

function draw() {
  background("lightBlue");


  if (gameState === PLAY) {
  gameOverI.visible=false;
    
    dash.collide(ground);

    if (back.x < 0) {
      back.x = back.width / 2;
    }
    ground.x = ground.width / 2;
    obstacle();

    if((touches.length > 0 || keyDown("SPACE")) && dash.y >= height-120) {            dash.velocityY = -19; 
       touches = []; }

    

    coin();
    ground.visible = false;

    dash.velocityY = dash.velocityY + 0.5;
    if (dash.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score = score + 1;

    }
    if (dash.isTouching(obstacles1Group) || dash.isTouching(obstacles2Group)) {
      dash.destroy();

      back.velocityX = 0;
      gameState = END;
      // coinGroup.visible = false;
      // obstacles1Group.visible = false;
      // obstacles2Group.visible = false;

    }
    } else if (gameState === END) {
        gameOverI.visible=true;

      //set lifetime of the game objects so that they are never destroyed

      coinGroup.setLifetimeEach(-1);
      obstacles1Group.setLifetimeEach(-1);
      obstacles2Group.setLifetimeEach(-1);

      obstacles1Group.setVelocityXEach(0);
      obstacles2Group.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);
    }

    drawSprites();

    stroke("blue");
    textSize(24);
    fill("red");
    text("score = " + score, 600, 50);

  }

  function obstacle() {
    if (frameCount % 200 === 0) {
      obstacle1 = createSprite(width, height-45, 100, 100);
      obstacle1.velocityX = -13;
      obstacle1.lifetime = 200;
      obstacle1.addImage(obs1);
      obstacle1.scale = 0.3;

      obstacles1Group.add(obstacle1);
    }
    if (frameCount % 300 === 0) {
      obstacle2 = createSprite(width, height-50, 100, 100);
      obstacle2.velocityX = -13;
      obstacle2.lifetime = 200;
      obstacle2.addImage(obs2);
      obstacle2.scale = 0.5;

      obstacles2Group.add(obstacle2);
    }



  }

  function coin() {
    if (frameCount % 100 === 0) {
      var coin = createSprite(700, 150, 25, 25);
      coin.addImage(cn);
      coin.scale = 0.1;
      coin.velocityX = -13;
      coin.lifetime = 150;
      coinGroup.add(coin);
      coin.y = Math.round(random(150, 200));
    }

  }