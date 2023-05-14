// Set variables

const englishCharacters = ["a", "i", "u", "e", "o",
                            "ka", "ki", "ku", "ke", "ko",
                            "sa", "shi", "su", "se", "so",
                            "ta", "chi", "tsu", "te", "to",
                            "na", "ni", "nu", "ne", "no",
                            "ha", "hi", "fu", "he", "ho",
                            "ma", "mi", "mu", "me", "mo",
                            "ya", "yu", "yo",
                            "ra", "ri", "ru", "re", "ro",
                            "wa", "wo", "n",
                            "ga", "gi", "gu", "ge", "go"];
                            
const hiraganaCharacters = ["あ", "い", "う", "え", "お",
                            "か", "き", "く", "け", "こ",
                            "さ", "し", "す", "せ", "そ",
                            "た", "ち", "つ", "て", "と",
                            "な", "に", "ぬ", "ね", "の",
                            "は", "ひ", "ふ", "へ", "ほ",
                            "ま", "み", "む", "め", "も",
                            "や", "ゆ", "よ",
                            "ら", "り", "る", "れ", "ろ",
                            "わ", "を", "ん",
                            "が", "ぎ", "ぐ", "げ", "ご"];

const katakanaCharacters = ["ア", "イ", "ウ", "エ", "オ",
                            "カ", "キ", "ク", "ケ", "コ",
                            "サ", "シ", "ス", "セ", "ソ",
                            "タ", "チ", "ツ", "テ", "ト",
                            "ナ", "ニ", "ヌ", "ネ", "ノ",
                            "ハ", "ヒ", "フ", "ヘ", "ホ",
                            "マ", "ミ", "ム", "メ", "モ", 
                            "ヤ", "ユ", "ヨ", 
                            "ラ", "リ", "ル", "レ", "ロ", 
                            "ワ", "ヲ", "ン",
                            "ガ", "ギ", "グ", "ゲ", "ゴ"];

const numberCharacters = 51;
let randomQuestionOrder = [];
let questionNumber = 0;
let quizDifficulty;
let questionLanguage;
let difficultySetting;
let questionLanguageSetting;
let question;
let answers = [];
let score = 0;
let mistakes = 0;

// Get element variable for elements called more than once

let questionElement = document.getElementById("question");
let correctCounter = document.getElementById("correct-counter");
let incorrectCounter = document.getElementById("incorrect-counter");
let quizContainer = document.getElementById("quiz-container");
let quizOptions = document.getElementById("quiz-options");
let gameoverContainer = document.getElementById("gameover-container");
let quizFeedback = document.getElementById("message-result");

for (let i = 0; i < numberCharacters; i++) {
    randomQuestionOrder.push(i);
}
randomQuestionOrder.sort(() => Math.random() - 0.5);
let index;

// 3 functions that are called by the 3 buttons in the quiz which start, end and reset the quiz. 
// Each function calls a number of other functions which are explained below.

function quizStart() {
    resetGame();
    checkDifficulty();
    checkLanguage();
    changeDisplay();
    answers = getQuestion();
    buildQuiz();
}

function nextQuestion(button) {
    stopClick();
    checkAnswer(button);
    questionNumber++;
    if (questionNumber === numberCharacters) {
        gameoverDisplay();
    } else {
        answers = getQuestion();
        setTimeout(buildQuiz, 1000); // Allows correct/incorrect answers to be seen
    }
}

function newGame() {
    revertDisplay();
}

// Function resets variables to their initial values

function resetGame() {
    score = 0;
    correctCounter.innerHTML = score;
    mistakes = 0;
    incorrectCounter.innerHTML = mistakes;
    randomQuestionOrder = [];
    for (let i = 0; i < numberCharacters; i++) {
        randomQuestionOrder.push(i);
    }
    randomQuestionOrder.sort(() => Math.random() - 0.5);
    questionNumber = 0;
}

// Functions pull data from radio button to set difficulty and language variables

function checkDifficulty() {
    difficultySetting = document.querySelector("input[name = 'difficulty']:checked").value;
    if (difficultySetting === "easy") {
        quizDifficulty = 3;
    } else if (difficultySetting === "medium") {
        quizDifficulty = 6;
    } else if (difficultySetting === "hard") {
        quizDifficulty = 9;
    }
}

function checkLanguage() {
    questionLanguageSetting = document.querySelector("input[name ='language']:checked").value;
    if (questionLanguageSetting === "1") {
        questionLanguage = "English";
    } else if (questionLanguageSetting === "2") {
        questionLanguage = "Hiragana";
    } else if (questionLanguageSetting === "3") {
        questionLanguage = "Katakana";
    }
}

// Functions change the display of elements

function changeDisplay() {
    quizContainer.style.display = "block";
    quizOptions.style.display = "none";
}

function revertDisplay() {
    quizContainer.style.display = "none";
    quizOptions.style.display = "block";
    gameoverContainer.style.display = "none";
}

function gameoverDisplay() {
    gameoverContainer.style.display = "block";
    quizContainer.style.display = "none";
    quizResult();
}

// Function that gives specific feedback dependent on scores

function quizResult() {
    document.getElementById("final-score").innerHTML = score;
    document.getElementById("number-of-questions").innerHTML = questionNumber;
    let percentageResult = Math.floor(score / questionNumber * 100);
    if (score === questionNumber && score !== 0) {
        quizFeedback.innerHTML = "Perfect! You have mastered Hiragana! Well done!";
    } else if (percentageResult > 80) {
        quizFeedback.innerHTML = "Very good. You have almost mastered Hiragana.";
    } else if (percentageResult > 60) {
        quizFeedback.innerHTML = "Not bad! A few more attempts and you will know all Hiragana.";
    } else {
        quizFeedback.innerHTML = "Hiragana is hard but don't give up!";
    }
}

// Function first selects which character set will be used as question and answer. 
// An array filled with numbers from 0 to 45 is randomised and used as the index between the question and correct answer.
// It is then used to remove the correct answer from aa character set.
// The character set it then randomised and the number of answers based on difficulty are pulled out.

function getQuestion() {
    index = randomQuestionOrder[questionNumber];
    let answerSet;
    let possibleAnswers;
    if (questionLanguage === "English") {
        question = englishCharacters[index];
        answerSet = [hiraganaCharacters[index]];
        possibleAnswers = hiraganaCharacters.slice();
    } else if (questionLanguage === "Hiragana") {
        question = hiraganaCharacters[index];
        answerSet = [englishCharacters[index]];
        possibleAnswers = englishCharacters.slice();
    } else if (questionLanguage === "Katakana") {
        question = katakanaCharacters[index];
        answerSet = [englishCharacters[index]];
        possibleAnswers = englishCharacters.slice();
    }
    possibleAnswers.splice(index, 1);
    possibleAnswers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (quizDifficulty - 1); i++) {
        let newWrongAnswer = possibleAnswers.shift();
        answerSet.push(newWrongAnswer);
    }
    answerSet.sort(() => Math.random() - 0.5);
    return answerSet;
}

// Function generates HTML for questions and answers in a for loop

function buildQuiz() {
    questionElement.innerHTML = question;
    let answerHTML = ``;
    for (let answer of answers) {
        let rowHTML = `<button class = "btn" onclick="nextQuestion(this)">${answer}</button>`;
        answerHTML += rowHTML;
    }
    document.getElementById("answer-container").innerHTML = answerHTML;
}

// Function checks whether answer is correct and add relative classes

function checkAnswer(button) {
    let selected = button.innerHTML;
    if (selected == englishCharacters[index] || selected == hiraganaCharacters[index]) {
        increaseScore();
        button.classList.add("correct-answer");
    } else {
        increaseIncorrectScore();
        button.classList.add("incorrect-answer");
    }
}

// Functions increase score counters

function increaseScore() {
    score++;
    correctCounter.innerHTML = score;
}

function increaseIncorrectScore() {
    mistakes++;
    incorrectCounter.innerHTML = mistakes;
}

// Function prevents more than one answer being clicked per question

function stopClick() {
    let buttons = document.getElementsByClassName("btn");
    for (let button of buttons) {
        button.removeAttribute("onclick");
    }
}

// Event listeners

document.getElementById("quiz-start").addEventListener("click", quizStart);
document.getElementById("btn-gameover").addEventListener("click", gameoverDisplay);
document.getElementById("new-game").addEventListener("click", newGame);