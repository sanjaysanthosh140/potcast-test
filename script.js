const displayscore = document.querySelector("#score")
const grid = document.querySelector(".grid")

//score++
let score = 0

const boarwidth = 600
const boarheight = 300

const blockwidth = 100
const blockheight = 20

// ball move varable
let timerId
let xDirection = 2
let yDirection = 2

grid.style.backgroundColor = "#000";
// user 

// user 
const user = [120, 10]
let userCurrentPosition = user


// ball 
const ball = [130, 30]
let ballCurrentPosition = ball

// add user into gird
const users = document.createElement('div')
users.classList.add('UserCls')
grid.appendChild(users)
drawUser()


// add ball 
const balls = document.createElement('div')
balls.classList.add('ballCls')
grid.appendChild(balls)
drawBall()

// draw user 
function drawUser() {
    users.style.left = `${userCurrentPosition[0]}px`
    users.style.bottom = `${userCurrentPosition[1]}px`
}

// draw ball 

function drawBall() {
    balls.style.left = `${ballCurrentPosition[0]}px`
    balls.style.bottom = `${ballCurrentPosition[1]}px`
}


// class for seting blocks
class Blocks {
    constructor(xAxis, yAxis) {
        this.blockLeft = [xAxis, yAxis]
        this.blockRight = [xAxis + blockwidth, yAxis]
        this.topleft = [xAxis, yAxis + blockheight]

    }
}

let blocks = [
    new Blocks(20, 270),
    new Blocks(130, 270),
    new Blocks(240, 270),
    new Blocks(350, 270),
    new Blocks(460, 270),

    new Blocks(20, 240),
    new Blocks(130, 240),
    new Blocks(240, 240),
    new Blocks(350, 240),
    new Blocks(460, 240),

    new Blocks(20, 210),
    new Blocks(130, 210),
    new Blocks(240, 210),
    new Blocks(350, 210),
    new Blocks(460, 210)
]

// draw blocks
function drawBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const briks = document.createElement('div')
        briks.classList.add('brikClis')
        briks.style.left = `${blocks[i].blockLeft[0]}px`
        briks.style.bottom = `${blocks[i].blockLeft[1]}px`
        grid.appendChild(briks)
    }
}

drawBlock()

// move user

function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (userCurrentPosition[0] > 0) {
                userCurrentPosition[0] -= 10
                drawUser()
            }
            break;
        case "ArrowRight":
            if (userCurrentPosition[0] < (boarwidth - blockwidth)) {
                userCurrentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// moveBall

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkforCollections()
}

timerId = setInterval(moveBall, 30)


// check for collection 
function checkforCollections() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            // ballCurrentPosition[0] > blocks[i].blockLeft[0] &&
            ballCurrentPosition[0] < blocks[i].blockRight[0] &&
            (ballCurrentPosition[1] + blockheight) > blocks[i].blockLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topleft[1]

        ) {
            const allBriks = document.querySelectorAll('.brikClis')
            allBriks[i].classList.remove('brikClis')
            blocks.splice(i, 1)
            chengeDirection()
            score++
            displayscore.textContent = score
        }
        if(blocks.length===0){
            displayscore.innerHTML="you win"
            clearInterval(timerId)
        }
    }

    //check for wall collection()
    if (ballCurrentPosition[0] >= (boarwidth - blockheight) ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= (boarheight - blockheight)
    ) {
        chengeDirection()

    }

    //// user and ball collection ////


    if (
        (ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockwidth) &&
        (ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < userCurrentPosition[1] + blockheight)
    ) {
        chengeDirection()
        console.log("collaied")
    }

    if (
        ballCurrentPosition[1] <= 0
    ) {
        chengeDirection()
        // displayscore.innerHTML = "you lose"
        // clearInterval(timerId)
        // document.removeEventListener('keydown', moveUser)

    }


}

function chengeDirection() {
    if (xDirection == 2 & yDirection == 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 & yDirection == -2) {
        xDirection = -2
        return
    }
    if (xDirection == -2 & yDirection == -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 & yDirection == 2) {
        xDirection = 2
        return
    }
}