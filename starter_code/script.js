const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let frames = 0
let interval



images = {
background: './images/mars_background.jpg',
robot: './images/ia_robot.png',
drones: './images/drones.png',
astronauts: './images/astronaut.png'
}

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
      start()
    };
  }

class Board{
 constructor(){
     this.x = 0,
     this.y = 0,
     this.width = canvas.width,
     this.height = canvas.height,
     this.img = new Image(),
     this.img.src = images.background
 }

 drawBoard(){
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height )
 }
}


class Robot {
    constructor(){
        this.x = 500,
        this.y = 70,
        this.width = 60
        this.height = 80,
        this.imgRobot = new Image,
        this.imgRobot.src = images.robot
    }
    drawRobot(){
        ctx.drawImage(this.imgRobot, this.x, this.y, this.width, this.height)
    }
}

class Astronaut {
    constructor(){
        this.x = 100,
        this.y = 480,
        this.spriteWidth = 87 / 3,
        this.spriteHeight = 40,
        this.sx = 0,
        this.sy = 0,
        //this.width = 29
        //this.jump = this.y - 50,
        this.imgAstronaut = new Image(),
        this.imgAstronaut.src = images.astronauts
    }
    drawAstronaut(){
        if(this.sx >= 87) this.sx = 0
        ctx.drawImage(
            this.imgAstronaut, 
            this.sx,
            this.sy,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
            )
    }

    goLeft(){
        this.sx += 29
        this.x -= 10
    }

    goRight(){
        this.sx += 29
        this.x += 10
    }

    jump(){
        this.y -= 70
    }


    gravity(){
        if(this.y < 480){
        this.y += 1
        }
    }
}

class Dron {
constructor(imgType){
    this.x = 600,
    this.y = 430,
    this.sx = 0,
    this.sy = 0,
    this.dronInterval = 0
    this.spriteHeight = 120,
    this.spriteWidth = 680 / 5,
    //this.width = 138,
    this.imgDron = new Image(),
    this.imgDron.src = images.drones,
    this.imgType = imgType
}
drawDron(){
    this.x -= 1
    if(this.sx >= 690) this.sx = 0
    ctx.drawImage(this.imgDron, 
        this.sx, 
        this.sy, 
        this.spriteWidth, 
        this.spriteHeight, 
        this.x, 
        this.y, 
        this.spriteWidth, 
        this.spriteHeight)



    ctx.drawImage(this.imgDron,
        this.sx, 
        this.sy, 
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y-150, 
        this.spriteWidth, 
        this.spriteHeight)



    ctx.drawImage(this.imgDron, 
        this.sx, 
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y-300, 
        this.spriteWidth, 
        this.spriteHeight)
}

spinning(){
    
    this.sx +=150
}
}

const board = new Board()
const robot = new Robot()
const dron = new Dron()
const astronaut = new Astronaut()

function startGame (){
  board.drawBoard()
  robot.drawRobot()
  dron.drawDron()
  astronaut.drawAstronaut()
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.drawBoard()
    dron.drawDron()
    astronaut.drawAstronaut()
    robot.drawRobot()
    astronaut.gravity()
    dron.spinning()
    
}

function start(){
    interval = setInterval(update, 1000 / 20)
    
}

document.addEventListener('keydown', ({keyCode}) => {
    if(keyCode == 37){
        astronaut.goLeft()
    }
    if(keyCode == 39){
        astronaut.goRight()
    }
    if(keyCode == 38){
        astronaut.jump()
        
    }
})





