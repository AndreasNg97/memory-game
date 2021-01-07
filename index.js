const board = document.querySelector("#board");
const startOverlay = document.querySelector("#start-overlay");
const gameoverOverlay = document.querySelector("#gameover-overlay");
const scoreColumn = document.querySelector("#score-column");
const clicksScore = document.querySelector("#clicks-score");
const timerScore = document.querySelector("#timer-score");
const gameResult = document.querySelector("#game-result")

let memes = [ './img/bob.gif', './img/dunder.gif', './img/gatsby.gif', './img/rick.gif', './img/pepe.gif', './img/taphead.gif', './img/trap.gif', './img/what.gif',]
let memesArr
let selectedCards = []
let lock = false
let clicks = 0
let matchedPairs = 0
let ticker 
let ss = 0
let mm = 0

function createGrid(){
    for(let i=0; i<16; i++){
        card = document.createElement('div')
        card.classList = 'card shadow'
        card.innerHTML += `<img class="gif hidden" src="${randomizeAndDeal(memesArr)}"/>`
        card.onclick = (e) => revealCard(e)
        board.appendChild(card)
    } 
}

function randomizeAndDeal(array){
    return array.splice(Math.floor(Math.random() * array.length), 1)   
}


function startGame(){
    memesArr = [...memes, ...memes]
    createGrid()
    removeLayer(startOverlay)
}

function playAgain(){
    board.innerHTML = ''
    memesArr = [...memes, ...memes]
    createGrid()
    removeLayer(gameoverOverlay)
}

function removeLayer(layer){
    layer.style.opacity = '0'
    layer.style.visibility = 'hidden'
}

function revealCard(e){
    if (lock) return
    if(e.target.classList == "gif") return

    if(e.target.classList == "card shadow"){
        e.target.childNodes[0].classList.remove("hidden")
        countClicks()
        selectCard(e.target.childNodes[0])
    }
}

function lockBoard(){
    lock = true
}

function unlockBoard(){
    lock = false
}

function selectCard(item){
    selectedCards.push(item)
    
    if(selectedCards.length == 2){
        
        if(!isMatched(selectedCards)){
            lockBoard()
            setTimeout(function(){
                hideCards(selectedCards[0], selectedCards[1])
            }, 500)
        }
        
        if(isMatched(selectedCards))
            lockMatchedCards(selectedCards[0], selectedCards[1])
        
    }
}

function isMatched(array){
    if(array.length == 2 && array[0].src == array[1].src)
        return true
    if(array.length == 2 && array[0].src != array[1].src)
        return false
}


function hideCards(card1, card2){
    card1.classList.add("hidden")
    card2.classList.add("hidden")
    clearSelectedCards()
    unlockBoard()
}

function lockMatchedCards(card1, card2){
    card1.classList.add("matched")
    card2.classList.add("matched")
    matchedPairs++
    if(matchedPairs == memes.length){
        gameOver()
    }
    clearSelectedCards()
}

function clearSelectedCards(){
    selectedCards = [] 
}

function countClicks(){
    clicks++
    clicksScore.innerText = `Clicks : ${clicks}`
    if(clicks === 1){
        timer()
    }
}

function gameOver(){
    gameoverOverlay.style.opacity = '1'
    gameoverOverlay.style.visibility = 'visible'
    clearInterval(ticker)
    gameResult.innerHTML = `
        <h3>${clicksScore.innerText}</h3>
        <h3>${timerScore.innerText}</h3>`
    resetScore()
}

function resetScore(){
    clicksScore.innerText = `Clicks : 0`
    timerScore.innerText = `Time : 0:00`
    clicks = 0
    ss = 0
    mm = 0
    matchedPairs = 0
}

function timer(){
    ticker = setInterval(function(){
        ss++
        if(ss == 60){
            ss=0
            mm++
        }
        if(ss < 10) 
            ss = '0'+ss
        timerScore.innerText = `Time : ${mm}:${ss}`
    }, 1000)
}




