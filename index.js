let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumPlayerOne = document.getElementById("sum-one-el")
let sumPlayerTwo = document.getElementById("sum-two-el")
let cardsPlayerOne = document.getElementById("cards-one-el")
let cardsPlayerTwo = document.getElementById("cards-two-el")
let playerOneEl = document.getElementById("player-one-el")
let playerTwoEl = document.getElementById("player-two-el")


let playerOne = {
    name: "One",
    number: 1,
    cards: [],
    sum: 0,
    turn: true,
    chips: 200

}

let playerTwo = {
    name: "Two",
    number: 2,
    cards: [],
    sum: 0,
    turn: false,
    chips: 200

}

playerOneEl.textContent = "Player " + playerOne.number + ": $" + playerOne.chips
playerTwoEl.textContent = "Player " + playerTwo.number + ": $" + playerTwo.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    playerOne.turn = true
    playerTwo.turn = false
    playerOne.cards = [getRandomCard(), getRandomCard()]
    playerTwo.cards = [getRandomCard(), getRandomCard()]
    playerOne.sum = playerOne.cards[0] + playerOne.cards[1]
    playerTwo.sum = playerTwo.cards[0] + playerTwo.cards[1]
    renderGame()
}

function renderGame() {

    cardsPlayerOne.textContent = ""
    cardsPlayerTwo.textContent = ""
    for (let i = 0; i < playerOne.cards.length; i++) {
        cardsPlayerOne.textContent += playerOne.cards[i] + " "
    }

    for (let i = 0; i < playerTwo.cards.length; i++) {
        cardsPlayerTwo.textContent += playerTwo.cards[i] + " "
    }
    
    sumPlayerOne.textContent = playerOne.sum
    sumPlayerTwo.textContent = playerTwo.sum
    if (playerOne.sum <= 20 && playerOne.turn === true) {
        message = "Player 1 got " + playerOne.sum + ". Player 2, it's your turn to draw..."
        playerOne.turn = false
        playerTwo.turn = true
    } else if (playerOne.sum  === 21 && playerOne.turn) {
        message = "Player 1 got Blackjack! Congratulations!"
        hasBlackJack = true
        playerOne.chips += 5
        playerTwo.chips -= 5
    } else if(playerOne.sum > 20 && playerOne.turn === true) {
        message = "Player 1, you're out of the game! Player 2 Won!!!"
        isAlive = false
        playerOne.chips -= 5
        playerTwo.chips += 5
    } else if (playerTwo.sum <= 20 && playerTwo.turn) {
        message = "Player 2 got " + playerTwo.sum + ". Player 1, it's your turn to draw..."
        playerTwo.turn= false
        playerOne.turn = true
    } else if (playerTwo.sum === 21 && playerTwo.turn){
        message = "Player 2 got Blackjack! Congratulations!"
        hasBlackJack = true
        playerOne.chips -= 5
        playerTwo.chips += 5
    } else if(playerTwo.sum > 20 && playerTwo.turn === true) {
        message = "Player 2, you're out of the game! Player 1 won!!!"
        isAlive = false
        playerOne.chips += 5
        playerTwo.chips -= 5
    }
    messageEl.textContent = message
    playerOneEl.textContent = "Player " + playerOne.number + ": $" + playerOne.chips
    playerTwoEl.textContent = "Player " + playerTwo.number + ": $" + playerTwo.chips
}


function newCard(player) {

    
    if (isAlive === true && hasBlackJack === false && player.turn) {
        player.turn = false
        if(player.name !== "One" || player.name !== "Two") {
            player.turn = true
        }
        let card = getRandomCard()
        player.sum += card
        player.cards.push(card)      
        renderGame() 
    }

}
