const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


images = {
background: './images/mars_background.jpg',
robot: './images/ia_robot.png',
drones: './images/drones.png',
astronaut: './images/astronaut.png'
}

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
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
        this.height = 80
        this.imgRobot = new Image,
        this.imgRobot.src = images.robot
    }
    drawRobot(){
        ctx.drawImage(this.imgRobot, this.x, this.y, this.width, this.height)
    }
}

class Astronaut {
    constructor(){
        this.x = 200,
        this.y = 450,
        this.width = 50,
        this.height = 40,
        this.imgAstronaut = new Image,
        this.imgAstronaut.src = images.astronaut
    }
    drawAstronaut(){
        ctx.drawImage(this.imgAstronaut, this.x, this.y, this.width, this.height)
    }
}

class Dron {
constructor(){
    this.x = 600,
    this.y = 200,
    this.height = 300,
    this.width = 300,
    this.imgDron = new Image(),
    this.imgDron.src = images.drones
}
drawDron(){
    ctx.drawImage(this.imgDron, this.x, this.y, this.width, this.height)
}
}


const board = new Board()
const robot = new Robot()
const dron = new Dron()
const starMan = new Astronaut()

function startGame (){
  board.drawBoard()
  robot.drawRobot()
  dron.drawDron()
  starMan.drawAstronaut()

}



