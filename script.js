
//Llamado del canvas con su contexto en 2d
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Variables globales
let frames = 0
let interval
let counterPlayer1 = 0
let player1
let counterPlayer2 = 0
let player2 
let dronesArr = []
let laserArr = []

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
    document.getElementById("jugador1-button").onclick = function() {
       player1 = true
       player2 = false 
      startGame();
      start()
    };
  }

  document.getElementById("jugador2-button").onclick = function() {
    player1 = false
    player2 = true
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    restart()
    startGame();
   
    start()
  }

//Declaracion de classes

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
constructor(y){
    this.x = 800,
    this.y = y,
    this.sx = 0,
    this.sy = 0,
    this.dronInterval = 0
    this.spriteHeight = 110,
    this.spriteWidth = 680 / 5,
    this.imgDron1 = new Image(),
    this.imgDron1.src = images.drones
    //this.imgDron2 = new Image(),
    //this.imgDron2.src = images.drones,
    //this.imgDron3 = new Image(),
    //this.imgDron3.src = images.drones
    //this.imgType = imgType
}
drawDron(){
    this.x -= 3
    if(this.sx >= 690) this.sx = 0
    ctx.drawImage(this.imgDron1, 
        this.sx, 
        this.sy, 
        this.spriteWidth, 
        this.spriteHeight, 
        this.x, 
        this.y, 
        this.spriteWidth, 
        this.spriteHeight)



    /*ctx.drawImage(this.imgDron2,
        this.sx, 
        this.sy, 
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y-150, 
        this.spriteWidth, 
        this.spriteHeight)
    */


    /*ctx.drawImage(this.imgDron3, 
        this.sx, 
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y-300, 
        this.spriteWidth, 
        this.spriteHeight)
        */
}

spinning(){
    
    this.sx +=150
}

touchDron(laser){
 return (
     this.x < laser.x + laser.width &&
     this.x + this.spriteWidth > laser.x  &&
     this.y < laser.y + laser.height &&
     this.y + this.spriteHeight > laser.y
 )
}

}
//Declaracion de instancias
const board = new Board()
const robot = new Robot()
const dron = new Dron(0)
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
    score()
}

function start(){
    interval = setInterval(update, 1000 / 50)
    
}

function startGame (){
  board.drawBoard()
  robot.drawRobot()
  //robot.drawScreen()
  dron.drawDron()
  astronaut.drawAstronaut()
}

function generateDron(){
    if(frames % 40 === 0){
   const max = canvas.height - 270
   const min = canvas.height / 6
   const randomHeight = Math.floor(Math.random() * max) + min
   const dron = new Dron(randomHeight)
   dronesArr.push(dron)
    }
}

function drawDron(){
    dronesArr.forEach( dron => dron.drawDron())
}

function generateLaser(){
   laserArr.push(new Laser(astronaut.x, astronaut.y))
}

function laserTrajectory(){
    laserArr.forEach(laser => {
        laser.laserTrajectory()
        laser.draw()
        
    })
}

function checkCollision(){
    
    dronesArr.forEach((dron, i) => {
   if(dron.x + dron.spriteWidth <= 0) return gameOver()

   
   laserArr.forEach( (laser,j) => {
    if(dron.touchDron(laser)){
        dronesArr.splice(i,1)
        laserArr.splice(j,1)
       
        points()
    }
   
   } 
)

})

//console.log(counter)
}

function points(){
    if(player1){
    counterPlayer1 +=1
    console.log(counterPlayer1)
    }
    else if(!player1){
        counterPlayer2 +=1
    }
}

function score(){
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(counterPlayer1, 415, 110);

  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(counterPlayer2, 460, 110);
}

function winner(){
    if(player2){
    if(counterPlayer1 > counterPlayer2){
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText('Player1 wins', 350, 300);
    }
    else if(counterPlayer2 > counterPlayer1){
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText('Player2 wins', 350, 300);
    }
    else if(counterPlayer1 === counterPlayer2){
        ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText('Draw', 400, 300);
    }
}
}

function gameOver(){
    clearInterval(interval)
    //player1=false
    //player2=true
    let over = 'Game Over'
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(over, 370, 500)
    winner()
}


function restart(){
    laserArr = []
    dronesArr = []
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
        
    }
})





