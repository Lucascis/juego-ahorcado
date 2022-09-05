let words = ["JAVASCRIPT", "PYTHON", "SWIFT", "JAVA", "DESARROLLO", "SERVIDOR"];

function initialMenu() {
    console.log(words);
    document.getElementById("initialMenu").style.display = "flex";
    document.getElementById("newWordMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";
}

function newWordMenu() {
    document.getElementById("newWord").value = "";
    document.getElementById("initialMenu").style.display = "none";
    document.getElementById("newWordMenu").style.display = "flex";
    document.getElementById("gameMenu").style.display = "none";
}

function agregarPalabra(newWord) {
    words.push(newWord.toUpperCase());
    console.log("Palabra agregada: " + newWord);
    console.log("Palabras: " + words);
}

function validateWord() {
    let newWord = document.getElementById("newWord").value;
    let regex = /^[a-zA-Z]{1,8}$/;
    if (regex.test(newWord)) {
        agregarPalabra(newWord);
    } else {
        document.getElementsByClassName("alert")[0].style.display = "flex";
    }
}

function gameMenu() {
    document.getElementById("initialMenu").style.display = "none";
    document.getElementById("newWordMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "flex";
    startGame();
}

//function to generate a random word
function randomWord() {
    let random = Math.floor(Math.random() * words.length);
    return words[random];
}

//function to split a word into inputs
function splitWord(word) {
    let wordArray = word.split("");
    let wordLength = wordArray.length;
    let wordInputs = "";
    for (let i = 0; i < wordLength; i++) {
        wordInputs += `<input type="text" id="letter${i + 1}" class="letters" maxlength="1">`;
    }
    document.getElementById("word").innerHTML = wordInputs;

    let letter = document.getElementById("letter1");
    letter.focus();
}

//function to start the game
function startGame() {
    let word = randomWord();
    splitWord(word);
    console.log(word);
}

function eventsListener() {
    initialMenu();
    document.getElementById("addButton").addEventListener("click", newWordMenu);
    document.getElementById("cancelButton").addEventListener("click", initialMenu);
    document.getElementById("saveButton").addEventListener("click", (initialMenu, validateWord));
    document.getElementById("playButton").addEventListener("click", gameMenu);
}
