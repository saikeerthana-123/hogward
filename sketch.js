//creating constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//const Detector = Matter.Detector;

//creating variables
var engine, world;
var player, backgroundimg1, bg2;
var backgroundSprite;
var rand, randome, randomee;
var obs1,obs2,obs3,obs4;
var s1,s2,s3,s4,s5,s6,s7,s8;
var obstaclesGroup;
var suppliesGroup, collectedSupplies;
var out;
var slow,normal,fast,save,pup;
var voldemort;
var vold;
var nimbus;
var db;
var edges;
var dobby;
var riddle;
var nimbusGroup;
var gameState = 0;
var score = 0;
var hermoine,ron;
var hermoineGranger,ronWeasley,harryPotter;
var startbutton, startbuttonImage;
var rs;
var state0Sprites, state1Sprites, state2Sprites;
var restart;

function preload(){
  //loading images
  backgroundimg1 = loadImage("images/floor1.png");
  bg2 = loadImage("images/ocean.png");
  harryPotterImage = loadImage("images/HARRY POTTER 2.png");

  obs1 = loadImage("images/obstacle1.png");
  obs2 = loadImage("images/obstacle2.png");
  obs3 = loadImage("images/obstacle3.png");
  obs4 = loadImage("images/obstacle4.png");

  voldemort = loadImage("images/voldemort.png");
  nimbus = loadImage("images/nimbus2001.png");
  db = loadImage("images/dobby2.png");

  s1 = loadImage("images/cauldron.png");
  s2 = loadImage("images/hat.png");
  s3 = loadImage("images/MonsterBook.png");
  s4 = loadImage("images/owl.png");
  s5 = loadImage("images/phial.png");
  s6 = loadImage("images/telescope.png");
  s7 = loadImage("images/wand.png");
  s8 = loadImage("images/Witchs-Brew-1.png");

  hermoine = loadImage("images/hermoine2.png");
  ron = loadImage("images/ron4.png");

  harryPotter = loadImage("images/HARRY POTTER 3.png");
  hermoineGranger = loadImage("images/hermoine 1.png");
  ronWeasley = loadImage("images/ron1.png");

  startbuttonImage = loadImage("images/play.png");
  rs = loadImage("images/restart.png");

  //loading sounds
  out = loadSound("sounds/storm.mp3");
  slow = loadSound("sounds/harry_potter.slow.mp3");
  normal = loadSound("sounds/harry_potter.fast.mp3");
  fast = loadSound("sounds/harry_potter.extrafast.mp3"); 
  save = loadSound("sounds/dobby.mp3");
 }

function setup() {
   //background
   backgroundSprite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
   backgroundSprite.addImage(backgroundimg1);
   backgroundSprite.scale = 2;
   backgroundSprite.y = backgroundSprite.height/2;
  //creating canvas
  createCanvas(windowWidth,windowHeight);
  //creating characters
  ronWeasley = createSprite(300,80,10,10);
  ronWeasley.addImage(ron);
  ronWeasley.scale = 0.6;
  hermoineGranger = createSprite(500,80,10,10);
  hermoineGranger.addImage(hermoine)
  harryPotter = createSprite(700,80,10,10);
  harryPotter.addImage(harryPotterImage)
  //creating engine and world
  engine = Engine.create();
  world = engine.world;
  //creating obstacles group
  obstaclesGroup = createGroup();
  //creating supplies group
  suppliesGroup = createGroup();
  collectedSupplies = 0;
  //creating nimbus group
  nimbusGroup = createGroup();
   //player
  player = createSprite(windowWidth/2 - 300,windowHeight/2,300,300);
  //adding default image
  player.addImage(harryPotterImage);
  //setting collider for player
  player.setCollider('circle',0,0,150);
    
  //dobby
  dobby = createSprite(0,0,40,40);
  dobby.visible = false;
  dobby.scale = 0.4;
   //voldemort
  vold = createSprite(150,500,50,50);
  vold.velocityY = 6;  
  vold.addImage(voldemort);
  //Play button
  startbutton = createSprite(windowWidth/2,windowHeight/2,50,50);
  startbutton.addImage(startbuttonImage);
  startbutton.scale = 0.5;

  restart = createSprite(windowWidth/2,windowHeight/2,50,50);
  restart.addImage(rs);
  restart.visible = false;
  //ocean
  bg2.scale = 10;

  state0Sprites = createGroup();
  state1Sprites = createGroup();
  state2Sprites = createGroup();

  state0Sprites.add(player)
  state0Sprites.add(startbutton)
  state0Sprites.add(hermoineGranger)
  state0Sprites.add(ronWeasley)
  state0Sprites.add(harryPotter);

  //state1Sprites.add(obstaclesGroup);
  //state1Sprites.add(suppliesGroup)
  state1Sprites.add(player)
  state1Sprites.add(backgroundSprite)
  state1Sprites.add(vold)
  //state1Sprites.add(nimbus2001)
  state1Sprites.add(dobby)

  state2Sprites.add(player)
  state2Sprites.add(backgroundSprite)
  state2Sprites.add(restart)
  
}

function draw() {
  //background
  background("white"); 
  
  //creating edges
  edges = createEdgeSprites();
  if(gameState === 0){
    drawSprites(state0Sprites);
    text("PowerUp.It is thanks to this item",windowWidth/2,windowHeight/2+80);
    text("That you can sweep the floor",windowWidth/2,windowHeight/2+100);
    text("It’s also used by witches",windowWidth/2,windowHeight/2+120);
    text(" So they can fly and soar",windowWidth/2,windowHeight/2+140);
    text("also collect school supplies on your way",windowWidth/2,windowHeight/2+160);
    if(mousePressedOver(harryPotter)){
      player.addImage(harryPotterImage);
      player.scale = 0.8;
    }
    if(mousePressedOver(hermoineGranger)){
      player.addImage(hermoine);
    }
    if(mousePressedOver(ronWeasley)){
      player.addImage(ron);
    }
    if(mousePressedOver(startbutton)){
      gameState = "play";
      //removing play and characters
      startbutton.visible = false
      hermoineGranger.visible = false;
      ronWeasley.visible = false
      harryPotter.visible = false
      backgroundSprite.addImage(backgroundimg1);
    }
  }
  if(gameState === "play"){
    backgroundSprite.velocityY = 6;
    //setting background sprite
    if (backgroundSprite.y > windowHeight) {
      backgroundSprite.y = backgroundSprite.height/2;
    }
     //creating obstacles
    if(frameCount % 100 === 0){
        randome = Math.round(random(400,900));
        var obs = createSprite(randome,5,10,10);
        rand = Math.round(random(1,4));
        obs.velocityY = 6;
        switch (rand) {
          case 1:
            obs.addImage(obs1);
            break;
          case 2:
            obs.addImage(obs2);
            break;
          case 3:
            obs.addImage(obs3);
            break;
          case 4:
            obs.addImage(obs4);
        }
        obs.scale = 0.5;
        obstaclesGroup.add(obs);
      }
      //allowing player to jump over obstacles
      if (keyDown("space")) {
        player.velocityY = -6;
      }
      //allowing player to move toward left or right
      if(keyCode === 37){
        player.velocityX = - 10;
      }
      if(keyCode === 39){
        player.velocityX = 10;
      }
      player.velocityY = player.velocityY + 0.8;
      //powerup with nimbus2001
      if(player.isTouching(nimbusGroup)){
        dobby.visible = true;
        dobby.x = player.x;
        dobby.y = player.y - 100;
        dobby.addImage(db);
        //destroying obstacles when dobby hits;
        if(dobby.isTouching(obstaclesGroup)){
          obstaclesGroup.destroyEach();
        }
      }

      //score
      if(player.isTouching(suppliesGroup)) {
        score += 1;
        suppliesGroup.destroyEach();
        
      }
      //calling spawnNimbus function
      spawnNimbus();
      //dobby
      if(dobby.visible == true){
        dobby.x = player.x;
        dobby.y = player.y - 50;
      }
      //calling spawnSupplies function
      spawnSupplies();
      //play music if level up
      if(frameCount <2000){
        slow.play();
      }
      if(frameCount >2000 && frameCount <4000){
        slow.pause();
        normal.play();
      }
      if(frameCount >4000){
        normal.pause();
        fast.play();
      }
      //camera
         // camera.position.x = player.x;
         // camera.position.y = player.y;

      //making player collide with edges
      player.collide(edges[3]);
      //drawing sprites
    
      //ending game when player is touching obstacles
      if (obstaclesGroup.isTouching(player)){
        gameState = "end";
      }
      console.log(gameState);
      drawSprites();

  }
    if(gameState === "end"){
        //state1Sprites.setVisibleEach(false);
        backgroundSprite.addImage(bg2);
        restart.visible = true;
        backgroundSprite.velocityY = 0;
        obstaclesGroup.destroyEach();
        
        player.velocityX = 0;
        player.velocityY = 0;
        slow.pause();
        normal.pause();
        fast.pause();
        out.play();
        
        drawSprites(state2Sprites);
        if(mousePressedOver(restart)){
          gameState = 0;
          restart.visible = false
          startbutton.visible = true
          hermoineGranger.visible = true;
          ronWeasley.visible = true
          harryPotter.visible = true
        }
      }
    
}

//creating nimbus 2001
function spawnNimbus(){
  if(frameCount % 1000 === 0){
  var nimbus2001 = createSprite(randome,200,50,50) ;
  nimbus2001.addImage(nimbus);
  nimbus2001.scale = 0.4;
  nimbus2001.lifetime = 100;
  nimbus2001.velocityY = 6;
  nimbus2001.setCollider('rectangle',0,0,200,30);
  nimbusGroup.add(nimbus2001);
  dobby.visible = true;
    if(save.isPlaying === false){
    save.play();
  }
  else{
    save.pause();
  }
  }
}

//creating tokens
function spawnSupplies(){
  if(frameCount % 100 === 0){
    randome = Math.round(random(100,1000));
    var supply = createSprite(randome,5,10,10);
    supply.scale = 0.4;
    supply.velocityY = 6;
    switch (rand) {
      case 1:
        supply.addImage(s1);
        break;
      case 2:
        supply.addImage(s2);
        break;
      case 3:
        supply.addImage(s3);
        break;
      case 4:
        supply.addImage(s4);
      case 5:
        supply.addImage(s5);
      case 6:
        supply.addImage(s6);
      case 7:
        supply.addImage(s7);
      case 8:
        supply.addImage(s8);
    }
    suppliesGroup.add(supply);
  }
  
}