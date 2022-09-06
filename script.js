//words list
let words = ["PROGRAMA", "PYTHON", "SWIFT", "JAVA", "JUEGO", "SERVIDOR", "AHORCADO"];

function initialMenu() {
    document.getElementById("initialMenu").style.display = "flex";
    document.getElementById("newWordMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";
}

//new word menu functions
function newWordMenu() {
    document.getElementById("newWord").value = "";
    document.getElementsByClassName("alert")[0].style.display = "none";
    document.getElementById("initialMenu").style.display = "none";
    document.getElementById("newWordMenu").style.display = "flex";
    document.getElementById("gameMenu").style.display = "none";
}

function agregarPalabra(newWord) {
    words.push(newWord.toUpperCase());
}

function validateWord() {
    let newWord = document.getElementById("newWord").value;
    let regex = /^[A-Z]{4,8}$/;
    if (regex.test(newWord)) {
        agregarPalabra(newWord);
        return false;
    } else {
        document.getElementsByClassName("alert")[0].style.display = "flex";
        return true;
    }
}

//game menu functions
function gameMenu() {
    document.getElementById("initialMenu").style.display = "none";
    document.getElementById("newWordMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "flex";
    document.getElementById("wrong-letter").innerHTML = "";
    startGame();
}

//function to start the game
let word = "";
function startGame() {
    reset();
    word = randomWord();
    splitWord(word);
}

//function to reset variables and hangman
function reset() {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`hangman${i}`).style.display = "none";
    }
    wordArray = [];
    wrongLetters = [];
    greatLetters = [];
}

//function to generate a random word
function randomWord() {
    let random = Math.floor(Math.random() * words.length);
    return words[random];
}

//function to split a word into inputs fields
let wordArray = [];
function splitWord(word) {
    wordArray = word.split("");
    let wordLength = wordArray.length;
    let wordInputs = "";
    for (let i = 0; i < wordLength; i++) {
        wordInputs += `<input type="text" id="letter${i + 1}" class="letters" maxlength="0">`;
    }
    document.getElementById("word").innerHTML = wordInputs;
}

//input only letters
function onlyLetters(e) {
    let key = e.which;
    let letter = String.fromCharCode(key).toUpperCase();
    let regex = /^[A-Z]$/;
    if (!regex.test(letter)) {
        e.preventDefault();
    } else {
        checkLetter(letter);
    }
}

//check for correct letter
let greatLetters = [];
function checkLetter(letter) {
    let letterPosition = wordArray.indexOf(letter);
    for (let i = 0; i < wordArray.length; i++) {
        if (letterPosition !== -1) {
            greatLetters.push(letter);
            document.getElementById("letter" + (letterPosition + 1)).value = letter;
            wordArray.splice(letterPosition, 1, " ");
            letterPosition = wordArray.indexOf(letter);
            if (greatLetters.length === word.length) {
                document.getElementById("word").innerHTML = `La palabra era: ${word}`;
                document.getElementById("wrong-letter").innerHTML = `GANASTE con ${wrongLetters.length} errores`;
            }
        } else if (letterPosition === -1 && greatLetters.indexOf(letter) === -1) {
            checkWrongLetters(letter);
        }
    }
}
//check for wrong letters and show hangman
let wrongLetters = [];
function checkWrongLetters(letter) {
    let wrongLetterPosition = wrongLetters.indexOf(letter);
    if (wrongLetterPosition === -1 && wrongLetters.length < 6) {
        wrongLetters.push(letter);
        document.getElementById("wrong-letter").innerHTML = wrongLetters;
        document.getElementById(`hangman${wrongLetters.length}`).style.display = "block";
    } else if (wrongLetters.length === 6) {
        document.getElementById("word").innerHTML = `La palabra era: ${word}`;
        document.getElementById("wrong-letter").innerHTML = "PERDISTE";
    }
}

function eventsListener() {
    //intial menu
    initialMenu();
    document.getElementById("playButton").addEventListener("click", gameMenu);
    document.getElementById("addButton").addEventListener("click", newWordMenu);

    //new word menu
    document.getElementById("saveButton").addEventListener("click", () => { if (!validateWord()) { gameMenu(); } });
    document.getElementById("cancelButton").addEventListener("click", initialMenu);

    //game menu
    document.getElementById("word").addEventListener("keydown", onlyLetters);
    document.getElementById("startAgainButton").addEventListener("click", gameMenu);
    document.getElementById("quitButton").addEventListener("click", initialMenu);
}