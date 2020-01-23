
//Llamado del canvas con su contexto en 2d
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Variables globales
let frames = 0
let interval
let counter = 0
const dronesArr = []
const laserArr = []

//Objeto con la ubicacion de las imagenes a utilizar
images = {
background: './images/mars_background.jpg',
robot: './images/ia_robot.png',
robotScreen: './images/robot_screen.png',
drones: './images/drones.png',
astronauts: './images/astronaut.png',
laser: './images/laser_sprite.png'
}

//Funcion para cargar el canvas en pantalla e iniciar juego
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
        this.imgScreen = new Image,
        this.imgScreen.src = images.robotScreen
    }
    drawRobot(){
        ctx.drawImage(this.imgRobot, this.x, this.y, this.width, this.height)
    }
    drawScreen(){
        ctx.drawImage(this.imgScreen,400, this.y, 100, 60)
    }
}

class Astronaut {
    constructor(){
        this.x = 100,
        this.y = 480,
        this.width = 87 / 3,
        this.height = 40,
        this.sx = 0,
        this.sy = 0,
        //this.width = 29
        //this.jump = this.y - 50,
        this.imgAstronaut = new Image(),
        this.imgAstronaut.src = images.astronauts
        //this.imgLaser = new Image(),
        //this.imgLaser.src = images.laser
    }
    drawAstronaut(){
        if(this.sx >= 87) this.sx = 0
        ctx.drawImage(
            this.imgAstronaut, 
            this.sx,
            this.sy,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
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
        this.y += 5
        }
    }

    touchDron(dron){
        return(
            this.x < dron.x + dron.width && 
            this.x + this.width > dron.x &&
            this.y < dron.y + dron.height && 
            this.y + this.height > dron.y 
        )
    }
}

class Laser {
    constructor(x, y){
       this.x = x,
       this.y = y,
       this.type = true,
       this.width = 50,
       this.height = 50,
       this.imgLaser = new Image(),
       this.imgLaser.src = images.laser
    }
    draw(){
        ctx.drawImage(this.imgLaser, this.x,this.y, this.width, this.height) 
    }
    laserTrajectory(){
        //if(this.type){
         this.x +=5
         
       // }
    }
}

class Dron {
constructor(imgType){
    this.x = 800,
    this.y = 430,
    this.sx = 0,
    this.sy = 0,
    this.dronInterval = 0
    this.spriteHeight = 120,
    this.spriteWidth = 680 / 5,
    this.imgDron = new Image(),
    this.imgDron.src = images.drones,
    this.imgType = imgType
}
drawDron(){
    this.x -= 3
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

touchDron(laser){
 return (
     this.x < laser.x + laser.width &&
     this.x + this.width > laser.x  &&
     this.y < laser.y + laser.height &&
     this.y + this.height > laser.y
 )
}

}
//Declaracion de instancias
const board = new Board()
const robot = new Robot()
const dron = new Dron()
const astronaut = new Astronaut()
const laser = new Laser()


//Funciones del juego
function update(){
    frames += 1
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.drawBoard()
    //dron.drawDron()
    astronaut.drawAstronaut()
    robot.drawRobot()
    robot.drawScreen()
    astronaut.gravity()
    dron.spinning()
    generateDron()
    drawDron()
    checkCollision()
    laserTrajectory()
}

function start(){
    interval = setInterval(update, 1000 / 20)
    
}


function startGame (){
  board.drawBoard()
  robot.drawRobot()
  //robot.drawScreen()
  dron.drawDron()
  astronaut.drawAstronaut()
}

function generateDron(){
    if(frames % 100 === 0){
   dronesArr.push(new Dron())
    }
}

function generateLaser(){
    if(laser.type){
   laserArr.push(new Laser(astronaut.x, astronaut.y))
    }
}

function drawDron(){
    dronesArr.forEach( dron => dron.drawDron())
}

function laserTrajectory(){
    laserArr.forEach(laser => {
        laser.laserTrajectory()
        laser.draw()
        
    })
}

function checkCollision(){
    dronesArr.forEach((dron, i) => {
  //  if(dron.x + dron.width <= 0){
  //      dronesArr.splice(i,1)
  //  }
    astronaut.touchDron(dron) ? gameOver() : null
})
console.log(counter)
}

function points(){
    counter +=1
}

function gameOver(){
    clearInterval(interval)
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
    if(keyCode == 83){
        generateLaser()
        laserBullet()
    }
})





