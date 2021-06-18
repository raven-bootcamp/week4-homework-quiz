// introduction explaining the rules of the game
var introElement = document.querySelector("#intro");

// buttons to start the game and view the high scores
var startButton = document.querySelector("#startgame-btn");
var highScoresButton = document.querySelector("#highscore-btn");

// the section and elements for the game timer
var timerSection = document.querySelector("#timer");
var timeRemainingDisplay = document.querySelector("#time-remaining");

// the section for the question and the buttons for the multiple answers
var questionElement = document.querySelector("#question");
var answerButtonsElement = document.querySelector("#answers-buttons");

// the separate container for high scores and the content 
var highScoresContainer = document.querySelector("#highscores-container");
var highscoreTable = document.querySelector("#highscores-table");
var clearScoresButton = document.querySelector("#clear-highscores-btn")

// the end game section where you can submit your name
var endGameSection = document.querySelector('#end-of-game');
var endGameTitle = document.querySelector('#verdict-title');
var finalScoreDisplay = document.querySelector("#final-score");
var nameInput = document.querySelector("#user-name");
var saveScoreBtn = document.querySelector("#save-score-btn");

// the overall amount of time, and the variable for the timer
var totalTime = 75;
var countdownTimer;

// variables to shuffle the questions so they're not always in the same order
var shuffledQuestions;
var currentQuestionNumber;

// event listeners
startButton.addEventListener("click", startTheGame);
highScoresButton.addEventListener("click", showOrHideHighScores);
saveScoreBtn.addEventListener("click", inputName);
clearScoresButton.addEventListener('click', clearAllScores);

// If there are any high scores, load them when the page is loaded
// High scores panel is hidden by default
generateScoresTable();

// start the game
function startTheGame() {
    showAndHideElementsWhenStarting();
    displayTime();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionNumber = 0
    questionElement.classList.remove("hide");
    answerButtonsElement.classList.remove("hide");
    newQuestion();
    startClock();
}

// reset the display when starting the game
function showAndHideElementsWhenStarting() {
    highScoresContainer.classList.add("hide");
    introElement.classList.add("hide");
    startButton.classList.add("hide");
    highScoresButton.classList.add("hide");
    timerSection.classList.remove("hide");
}

// always update the time display with the remaining time
function displayTime() {
    timeRemainingDisplay.textContent = totalTime; 
}

// count down in increments of 1 second, always checking it's above zero
function startClock() {
    countdownTimer = setInterval(function() {
        totalTime--;
        displayTime();
        verifyTime();
    }, 1000);
}

// verify the timer hasn't reached zero yet
function verifyTime() {
    if(totalTime <= 0) {
        totalTime = 0;
        endOfGame();
    }
}

// reset after any previous questions, and show a newly shuffled question
function newQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionNumber])
}

// show the question and create buttons with the question's answers
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectTheAnswer);
        answerButtonsElement.appendChild(button);
    })
}

// reset the state of the question and answers, including button colours
function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// remove an element's class of either "correct" or "wrong"
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// this handles the event of the player clicking an answer.
// after a click, it will change the colours of the answer buttons.
// this shows which answers were right and wrong.
// if a wrong answer is selected, deduct 10 seconds.
function selectTheAnswer(event) {
    const selectedBtn = event.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    if (!correct){
        totalTime = totalTime - 10;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    setTimeout(function() {
        if (shuffledQuestions.length > currentQuestionNumber + 1) {
            currentQuestionNumber++
            newQuestion();
        } else {
            endOfGame();
        }
    }, 1000);
    
}

// adds the class of "correct" or "wrong" for answer buttons, changing the colour
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// toggles the high scores panel on or off.
// off by default, and will turn off when the game begins.
function showOrHideHighScores() {
    if (highScoresContainer.classList.contains("hide")) {
        highScoresContainer.classList.remove("hide"); 
    } else {
        highScoresContainer.classList.add("hide");
    }
}

// when the game is over, stop the clock, calculate the score and show the end game screen
function endOfGame() {
    // stop the clock
    clearInterval(countdownTimer);

    // hide timer, question and answers
    timerSection.classList.add("hide");
    questionElement.classList.add("hide");
    answerButtonsElement.classList.add("hide");

    // show end game elements
    endGameSection.classList.remove("hide");

    // get final score and display it
    var finalScore = totalTime;
    if (finalScore === 0) {
        endGameTitle.textContent = ("🎮 Out of Time!! 🎮");
    }
    finalScoreDisplay.textContent = finalScore;
}

// enter your name to save your score

function inputName(event) {
    event.preventDefault();
  
    const playerName = nameInput.value;
  
    if (validateInput(playerName)) {
      const score = totalTime;
      const scoreEntry = getNewScoreEntry(playerName, score);
      saveScoreEntry(scoreEntry);
      window.location.href= "./index.html"
    }
}

function getNewScoreEntry(name, score) {
    const entry = {
      name: name,
      score: score,
    }
    return entry;
}

// ensures the player has entered a name before saving it
function validateInput(name) {
    if (name === "") {
        alert("Please enter your name!");
        return false;
    } else {
        return true;
    }
}

// save the name and score in local storage
function saveScoreEntry(highscoreEntry) {
    const currentScores = getScoreList();
    addToScoreList(highscoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

// get any existing scores
function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
      return JSON.parse(currentScores);
    } else {
      return [];
    }
}

// add new scores to the existing list
function addToScoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

// order the list to be high to low
function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
      for (let i = 0; i < scoreList.length; i++) {
        if (scoreList[i].score <= newEntry.score) {
          return i;
        }
      } 
    }
    return scoreList.length;
}


// Score table generation


// click the clear button to remove all high scores
function clearAllScores() {
    localStorage.setItem("scoreList", []);
    while (highscoreTable.children.length > 1) {
        highscoreTable.removeChild(highscoreTable.lastChild);
    }
}


function generateScoresTable() {
    var overallScoreList = localStorage.getItem("scoreList");
    if (overallScoreList) {
        addScoreTableRows(overallScoreList);
    }
}

function addScoreTableRows(overallScoreList) {
    overallScoreList = JSON.parse(overallScoreList);

    overallScoreList.forEach(function(scoreItem, index) {
        var rankCell = createRankCell(index + 1);
        var scoreCell = createScoreCell(scoreItem.score);
        var nameCell = createNameCell(scoreItem.name);
        var scoreTableRow = createScoreTableRow(rankCell, scoreCell, nameCell);
        highscoreTable.appendChild(scoreTableRow);
    });
}

function createRankCell(rank) {
    var rankCell = document.createElement('td');
    rankCell.textContent = `#${rank}`;
    return rankCell;
}

function createScoreCell(score) {
    var scoreCell = document.createElement('td');
    scoreCell.textContent = score;
    return scoreCell;
}

function createNameCell(playerName) {
    var nameCell = document.createElement('td');
    nameCell.textContent = playerName;
    return nameCell;
}

function createScoreTableRow(rankCell, scoreCell, nameCell) {
    var tableRow = document.createElement('tr');
    tableRow.appendChild(rankCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(scoreCell);
    return tableRow;
}



const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Alerts", correct: true },
            { text: "Numbers", correct: false }
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ____",
        answers: [
            { text: "Quotes", correct: false },
            { text: "Curly brackets", correct: false },
            { text: "Parentheses", correct: true },
            { text: "Square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            { text: "Numbers and strings", correct: false },
            { text: "Other arrays", correct: false },
            { text: "Booleans", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            { text: "Commas", correct: false },
            { text: "Curly brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Parentheses", correct: false }
        ]
    },
    {
        question: "HTML stands for:",
        answers: [
            { text: "HyperTerminal Markdown Language", correct: false },
            { text: "HyperText Markup Language", correct: true },
            { text: "High Terse Multi Level", correct: false },
            { text: "High Terminal Multi Language", correct: false }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Terminal/Bash", correct: false },
            { text: "For Loops", correct: false },
            { text: "console.log", correct: true }
        ]
    }
]