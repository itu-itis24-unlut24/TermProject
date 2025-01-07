const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const scoreElement = document.getElementById("points");
const livesDisplay = document.getElementById("hearts");
const letterVeils = document.getElementsByClassName("letter-veil"); // Returns all cover elements on top of letters
const secretWord = "CLOUD";

let livesLeft = 3;
let score = 0;


// modifies livesLeft variable and lives displayed on client
function updateLives(lives) {
    livesLeft = lives;
    let hearts = document.querySelectorAll(".heart-svg");
    for (let i = 0; i < hearts.length; i++) {
        if (i + 1 <= livesLeft) {
            hearts[i].style.filter = "grayscale(0)";
        }else {
            hearts[i].style.filter = "grayscale(.8)";
        }
    }
    if (livesLeft <= 0) {
        setTimeout(() => {  alert("You lost :(")  }); // for it to run asynchronously so it doesn't block the flow
        submitButton.style.display = "none";
    }
}

// modifies score variable and score displayed on client
function updateScore(updatedScore) {
    score = updatedScore;
    scoreElement.innerText = score;
    if (score == 100) {
        setTimeout(() => {  alert("Congratulations! You won.")  }); // for it to run asynchronously so it doesn't block the flow
        submitButton.style.display = "none";
    }
}

// First argument specifies order of the letter, second shows it for true, covers it for false
function changeLetterVisibility(idx, makeVisible) {
    letterVeils[idx].style.opacity = makeVisible ? 0 : 1;
}

function restartGame() {
    updateScore(0);
    updateLives(3);
    for (let i = 0; i < letterVeils.length; i++) {
        changeLetterVisibility(i, false);
    }
    submitButton.style.display = "block";
    resetButton.style.display = "none";
}

function submitGuess() {
    resetButton.style.display = "block";
    guess = guessInput.value.toUpperCase();
    if (guess.length !== 1 && guess.length !== 5) {
        alert("You should either guess one letter at a time or whole word at once");
    }else {
        if (!(secretWord.indexOf(guess) > -1 || guess === secretWord)) {
            livesDeducted = guess.length === 1 ? 1 : livesLeft;
            updateLives(livesLeft - livesDeducted);
        }else {
            for (let idx = 0; idx < guess.length; idx++) {
                idxInWord = secretWord.indexOf(guess[idx]);
                if (letterVeils[idxInWord].style.opacity != '0') {
                    updateScore(score + 20);
                    changeLetterVisibility(idxInWord, true);
                }
            }
        }
    }
    guessInput.value = "";
}

submitButton.addEventListener("click", submitGuess);
resetButton.addEventListener("click", restartGame);