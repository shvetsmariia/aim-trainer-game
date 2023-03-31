const startBtn = document.querySelector('#start'); 
const screens = document.querySelectorAll('.screen'); 
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time'); 
const board = document.querySelector('#board');

const colors = ['#3c1361', '#52307c', '#663a82', '#7c5295', '#b491c8', '#bca0dc']; 

let time = 0; 
let score = 0; 

startBtn.addEventListener('click', (event) => {
    event.preventDefault(); 
    screens[0].classList.add('up');  
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time')); 
        screens[1].classList.add('up');  
        startGame(); 
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++; 
        event.target.remove(); 
        creatreRandomCircle(); 
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    creatreRandomCircle();
    setTime(time); 
}

function decreaseTime() {
    if (time === 0) {
        finishGame(); 
    } else {
        let current = --time; 
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current); 
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`; 
}

function finishGame() {
    timeEl.parentNode.classList.add('hide'); 
    board.innerHTML = `<h1> Счёт: <span class="primary">${score}</span></h1>`; 
}

function creatreRandomCircle() {
    const circle = document.createElement('div');

    circle.classList.add('circle'); 
    setTimeout(() => setColor(circle), 0);

    const size = getRandonNumber(10, 60); 
    const {width, height} = board.getBoundingClientRect();
    const x = getRandonNumber(0, width - size); 
    const y = getRandonNumber(0, height - size); 
    
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`; 
    circle.style.left = `${x}px`; 
        
    board.append(circle); 
}

function getRandonNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor(); 
    element.style.background = color; 
    element.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`; 
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]; 
}

// How to win the game >> code below: 

function winTheGame() {
    function clickAllCircles() {
        const circle = document.querySelector('.circle'); 

        if(circle) {
            circle.click(); 
        }
    }
    setInterval(clickAllCircles, 25);
}