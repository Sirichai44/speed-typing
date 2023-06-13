const wordEl = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const btnLevelEl = document.getElementById('level-btn');
const settingEl = document.getElementById('setting');
const levelFormEl = document.getElementById('levelform');
const levelEl = document.getElementById('level');
const gameOverEl = document.getElementById('game-over-container');

const words = ["ant","bat","cat"];

let randomText;
let score = 0;
let time = 10; //easy => 15, medium => 10, hard => 5
let level='medium';
const saveMode = localStorage.getItem('mode') !==null ? localStorage.getItem('mode'): 'medium';

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI(){
    randomText = getRandomWord();
    wordEl.innerHTML = randomText;
    timeEl.innerHTML = time;
}
textEl.addEventListener('input', (e) =>{
    const inputText = e.target.value;

    if(inputText === randomText){
        if(saveMode == 'easy'){
            time += 5;
        }else if(saveMode == 'medium'){
            time += 3;
        }else{
            time += 2;
        }
        displayWordToUI();
        updateScore();
        e.target.value = '';
    }
});
function updateScore(){
    score += 10;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver(){
    gameOverEl.innerHTML=`
    <h1>Game Over!</h1>
    <p>Score = ${score} Points</p>
    <button onclick="location.reload()">Play Again</button>
    `;
    gameOverEl.style.display='flex';
}
btnLevelEl.addEventListener('click', () => {
    settingEl.classList.toggle('hide');
});

levelEl.addEventListener('change', (e) =>{
    level = e.target.value;
    localStorage.setItem("mode", level);
})
function startGame(){
    levelEl.value = saveMode;
    
    if(saveMode == 'easy'){
        time = 15;
    }else if(saveMode == 'medium'){
        time = 10;
    }else{
        time = 5;
    }
    displayWordToUI();
}
startGame();
textEl.focus();