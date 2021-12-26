let cow = document.getElementById('cow')
let music = document.getElementById('music')
let field = document.getElementById('field')
const yourPoint = document.getElementById('point')
const cowPosition = {
    x : 0,
    y : 0,
}
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


randomCowPosition()
let point = 0
music.volume = 0.2

cow.addEventListener ('click' , (e) => {
    point += 1
    yourPoint.innerText = `Your point: ${point}`
    randomCowPosition()
})
field.addEventListener ('mousemove' , (event) => {
    const mousePosition = getCoords(event)
    const distanceBetweenMouseAndCow = calcD(mousePosition.x, mousePosition.y, cowPosition.x + 25, cowPosition.y + 25)
    let volume = calcVol(distanceBetweenMouseAndCow)
    music.volume = volume
    console.log(volume);
})


