let cow = document.getElementById('cow')
let music = document.getElementById('music')
let field = document.getElementById('field')
const yourPoint = document.getElementById('point')
const highestPointEl = document.getElementById('highestPoint')
const hitSound = document.getElementById('hit-sound')
const timeEl = document.getElementById('time')
const missed = document.getElementById('missed')
let cowMoveTime = 3000
let timeBonus = 3
let timeLost = 1
let startingTime = 60
let pointPerHit = 1
let currentDifficulty = localStorage.getItem('difficulty') || 'easy'
if (currentDifficulty === 'medium') {
    cowMoveTime = 2500
    timeBonus = 2
    timeLost = 1
    startingTime = 45
    pointPerHit = 3
}else if (currentDifficulty === 'hard') {
    cowMoveTime = 2000
    timeBonus = 1
    timeLost = 2
    startingTime = 30
    pointPerHit = 5
} 

const cowPosition = {
    x : 0,
    y : 0,
}
music.play()
cow.style.width = '50px'
cow.style.height = '50px'

function randomCowPosition() {
    cowPosition.x = Math.round(Math.random() * (document.body.clientWidth - 50))
    cowPosition.y = Math.round(Math.random() * (document.body.clientHeight - 50))
    cow.style.top = `${cowPosition.y}px`
    cow.style.left = `${cowPosition.x}px`
}
function getCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    return {x,y}    
}
function calcD(aX, aY, bX, bY) {
    const d = Math.round(Math.sqrt((aX - bX)**2 + (aY - bY)**2))
    return d
}
function calcVol(d) {
    const maxD = Math.sqrt((document.body.clientHeight)**2 + (document.body.clientWidth)**2)
    let vol = 1 - d / maxD
    return vol
}
function random(from , to) {
    return Math.round(Math.random() * (to - from) + from )
}

let currentTime =  startingTime + 1


randomCowPosition()
let point = 0
let highestPoint = Number(localStorage.getItem('highestpoint')) || 0
yourPoint.innerText = `Your point: ${point}`
highestPointEl.innerText = `Highest point: ${highestPoint}`
music.volume = 0.2
setInterval(() => {
    if(currentTime > 0) {
        currentTime -= 1
        timeEl.innerText = `Time left: ${currentTime}s`
    }
    if(currentTime == 0) {
        yourPoint.innerText = `Your point: 0`
        point = 0
        currentTime = startingTime
    }
},1000)
setInterval(() => {
    const cowMovementX = random(-50 , 50) 
    const cowMovementY = random(-50 , 50) 
    const positonXAfterMove = cowPosition.x + cowMovementX
    const positonYAfterMove = cowPosition.y + cowMovementY
    if(positonXAfterMove > 0 && positonXAfterMove < document.body.clientWidth - 50 && positonYAfterMove > 0 && positonYAfterMove < document.body.clientHeight - 50) {
        cowPosition.x = positonXAfterMove
        cowPosition.y = positonYAfterMove
        cow.style.left = `${cowPosition.x}px`
        cow.style.top = `${cowPosition.y}px`
    }
}, cowMoveTime)

cow.addEventListener ('click' , (e) => {
    point += pointPerHit
    currentTime += timeBonus
    if(point > highestPoint) {
        localStorage.setItem('highestpoint', point)
        highestPoint = point
        highestPointEl.innerText = `Highest point: ${point}`
    }
    yourPoint.innerText = `Your point: ${point}`
    music.pause()
    hitSound.play()
    setTimeout(function() {
        music.play()
    },1500)
    randomCowPosition()
})
field.addEventListener ('mousemove' , (event) => {
    const mousePosition = getCoords(event)
    const distanceBetweenMouseAndCow = calcD(mousePosition.x, mousePosition.y, cowPosition.x + 25, cowPosition.y + 25)
    let volume = calcVol(distanceBetweenMouseAndCow)
    music.volume = volume
})
field.addEventListener ('click' , (e) => {
    currentTime -= timeLost
    if(e.target.id != 'cow') {
        missed.play()
        randomCowPosition()
    }
    music.pause()
    setTimeout(function() {
        music.play()
    },1000)
    
})

