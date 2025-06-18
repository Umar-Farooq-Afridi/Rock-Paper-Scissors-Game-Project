let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}

updateResultsElement('');
updateScoreElement();

function playGame(playerMove) {
    let computerMove = pickComputerMove();

    let result;
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie.'
        }
        else if (computerMove === 'Paper') {
            result = 'You Lose.';
        }
        else if (computerMove === 'Scissors') {
            result = 'You Win.'
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Win.'
        }
        else if (computerMove === 'Paper') {
            result = 'Tie.';
        }
        else if (computerMove === 'Scissors') {
            result = 'You Lose.'
        }
    }
    else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose.'
        }
        else if (computerMove === 'Paper') {
            result = 'You Win.';
        }
        else if (computerMove === 'Scissors') {
            result = 'Tie.'
        }
    }

    if (result === 'You Win.') {
        score.wins += 1;
    }
    else if (result === 'You Lose.') {
        score.losses += 1;
    }
    else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    updateMoveElement(playerMove, computerMove)

    updateResultsElement(result);
}

function pickComputerMove() {
    let randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber > 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}

function updateResultsElement(result) {
    document.querySelector('.js-results').innerHTML = `${result}`;
}

function updateMoveElement(playerMove, computerMove) {
    document.querySelector('.js-moves').innerHTML = `You ${playerMove} - Computer ${computerMove}`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScores() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    updateScoreElement();
    document.querySelector('.js-results').innerHTML = ``;
    document.querySelector('.js-moves').innerHTML = ``;
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(function () {
            let playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }

    checkAutoPlayButton();
}

function checkAutoPlayButton() {
    const autoPlayButtonElement = document.querySelector('.js-auto-play-button');

    if (isAutoPlaying) {
        autoPlayButtonElement.innerHTML = 'Stop Auto Play';
    }
    else {
        autoPlayButtonElement.innerHTML = 'Auto Play';
    }
}