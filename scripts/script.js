// select the elements from the page
var introElement = document.querySelector("#intro");

var startButton = document.querySelector("#startgame-btn");
var highScoresButton = document.querySelector("#highscore-btn");

var timerSection = document.querySelector("#timer");
var timeRemainingDisplay = document.querySelector("#time-remaining");

var questionElement = document.querySelector("#question");
var answerButtonsElement = document.querySelector("#answers-buttons");

var highScoresContainer = document.querySelector("#highscores-container");

var endGameSection = document.querySelector('#end-of-game');
var finalScoreDisplay = document.querySelector("#final-score");
var nameInput = document.querySelector("#user-name");
var saveScoreBtn = document.querySelector("#save-score-btn");

var timeRemaining = 75;

// variables to shuffle the questions so they're not always in the same order
var shuffledQuestions;
var currentQuestionNumber;

startButton.addEventListener("click", startTheGame);
highScoresButton.addEventListener("click", showOrHideHighScores);

function startTheGame() {
    highScoresContainer.classList.add("hide");
    introElement.classList.add("hide");
    startButton.classList.add("hide");
    highScoresButton.classList.add("hide");
    timerSection.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionNumber = 0
    questionElement.classList.remove("hide");
    answerButtonsElement.classList.remove("hide");
    newQuestion()
}

function newQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionNumber])
}

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

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function selectTheAnswer(event) {
    const selectedBtn = event.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
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
    }, 1500);
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function showOrHideHighScores() {
    if (highScoresContainer.classList.contains("hide")) {
        highScoresContainer.classList.remove("hide"); 
    } else {
        highScoresContainer.classList.add("hide");
    }
}

function endOfGame() {
    // get final score

    // hide timer, question and answers
    timerSection.classList.add("hide");
    questionElement.classList.add("hide");
    answerButtonsElement.classList.add("hide");

    // show end game elements
    endGameSection.classList.remove("hide");

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