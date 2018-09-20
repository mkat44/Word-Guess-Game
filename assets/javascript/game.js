//global variables
var score = 0;
var HP = 10;
var guessesRemaining = 8;
var guessedLetters = [];                    //empty array for guessed letters
var guessedWrongLetters = [];               //wrong letters go in here
var pokeName = [];                          //name of chosen 'mon
var gamePlay = false;                       //are we playing?
var finisher = true;                        //is the game finished?
var chooseYou = [];                         //chosen Pokemon
var whosThatPokemon = [];                   //empty array for current pokeguess
var holdUpChuck = false;                    //sets a wait for between games
var gameData = [];                          //updates the status of the game in word guess

//array of pokemon to choose from
var pokemon = ["Squirtle", "Ninetails", "Diglett", "Dugtrio", "Arcanine", "Slowpoke", "Doduo", "Grimer", "Gengar", "Koffing", "Ditto", "Mew", "Bayleef",
                "Igglybuff", "Mareep", "Umbreon", "Pineco", "Corsola", "Houndour", "Phanpy", "Smoochum", "Swampert", "Lotad", "Gardevoir", "Torkoal", "Trapinch", 
                "Wynaut", "Salamence", "Turtwig", "Empoleon", "Combee", "Cherubi", "Stunky", "Bonsly", "MimeJr", "Gible", "Munchlax", "Riolu", "Finneon", "Mantyke", 
                "Togekiss", "Mamoswine", "Tepig", "Serperior", "Blitzle", "Tirtouga", "Joltik", "Litwick", "Greninja", "Fletchling", "Gogoat", "Pancham", "Inkay", "Skrelp",
                "Aurorus", "Torracat", "Charjabug", "Cutiefly", "Rockruff", "Stufful", "Palossand", "Mimikyu", "Drampa"];

//start function + randomly choose a pokemon & make blanks for its name
function startGame () {
    guessesRemaining = 8;
    gamePlay = true;
    chooseYou = pokemon[Math.floor(Math.random() * pokemon.length)];
    guessedWrongLetters = [];
    guessedLetters = [];
    whosThatPokemon = [];
    document.getElementById("wordguess").textContent = "";
        for (l = 0; l < chooseYou.length; l++) {
            whosThatPokemon.push(" _ ");
            whosThatPokemon.join(" ");
            gameData = "A wild " + whosThatPokemon + " has appeared!";
        }
    document.getElementById("encounters").src = "";

    updateDOM();
    showMon();
    console.log("Everything has started!")
}

//update the displays
function updateDOM () {
    document.getElementById("HPremaining").textContent = HP;
    document.getElementById("triesremaining").textContent = guessesRemaining;
    document.getElementById("score").textContent = score;
    document.getElementById("wordguess").textContent = gameData;
    document.getElementById("lettersguessed").textContent = guessedWrongLetters;
    if (holdUpChuck) {
        document.getElementById("startquit").textContent = "Press any key to restart the game!";
    }
    else {
    document.getElementById("startquit").textContent = "Press any key to continue playing!";
    }
    console.log("Everything is updated!")
}

//function to link pokemon with its image
function showMon () {
    document.getElementById("encounters").src = "./assets/images/0" + pokemon.indexOf(chooseYou) + ".png";
    console.log("Here's a new image!");
}

//function to capture key presses
document.onkeyup = function (guess) {
    if (holdUpChuck) {
        holdUpChuck = false;
        finisher = false;
        startGame();
    }
    else if (finisher) {
        startGame ();
        finisher = false;
    }
    else {
            // Check to make sure a-z was pressed.
            if (guess.keyCode >= 65 && guess.keyCode <= 90) {
                makeGuesses(guess.key.toLowerCase());
            }
    }
    console.log("We're getting key-ups!");
}

//function to make guesses
function makeGuesses(letter) {
    if (guessesRemaining > 0 && gamePlay === true) {
        if (guessedLetters.indexOf(letter) === -1) {
            console.log(guessesRemaining);
            guessedLetters.push(letter);
            evaluateGuesses(letter);
        }
    }
    else if (guessesRemaining <= 0 && gamePlay === true) {
        // document.getElementById("wordguess").textContent = "The Pokémon has run away!";
        gameData = "The wild " + chooseYou + " has run away!";
        HP--;
        finisher = false;
        holdUpChuck = true;
        document.getElementById("encounters").src = "./assets/images/grass.png";
    }
    updateDOM();
    console.log("We're making guesses!");
}

//function to evaluate the guesses--loop through the word the check for the guesses and place them
function evaluateGuesses(letter) {
    var letterPositions = [];
    for (let j = 0; j < chooseYou.length; j++) {
        if(chooseYou[j].toLowerCase() == letter) {
            letterPositions.push(j);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (letterPositions.length <= 0) {
        guessesRemaining--;
        guessedWrongLetters.push(letter);
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(let k = 0; k < letterPositions.length; k++) {
            whosThatPokemon[letterPositions[k]] = letter;
        }
        catchThatPokemon();
    }
    console.log("Guesses are coming through!");
}

// function for win and update gamedata 
function catchThatPokemon () {
    if (whosThatPokemon.indexOf(" _ ") === -1) {
        console.log(whosThatPokemon);
        // document.getElementById("wordguess").textContent = "Congrats! You caught " + chooseYou + "!";
        gameData = "Congrats! You caught " + chooseYou + "!";
        score++;
        finisher = true;
        holdUpChuck = true;
        console.log("A winner is me.");
    }
    else {
        gameData = "A wild " + whosThatPokemon + " has appeared!";
    }
}