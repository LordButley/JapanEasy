// Set variables

const englishCharacters = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"];
const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
const numberCharacters = 46;
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
let time = 0;

// Get element variable for elements called more than once

let questionElement = document.getElementById("question");
let correctCounter = document.getElementById("correct-counter");
let incorrectCounter = document.getElementById("incorrect-counter");
let quizContainer = document.getElementById("quiz-container");
let quizOptions = document.getElementById("quiz-options");
let gameoverContainer = document.getElementById("gameover-container");

for(let i = 0; i < numberCharacters; i++){
    randomQuestionOrder.push(i);
}
randomQuestionOrder.sort(() => Math.random() - 0.5);
let index;  

// 3 overarching functions which control the game.

function quizStart(){
    resetGame();
    checkDifficulty();
    checkLanguage();
    changeDisplay();
    answers = getQuestion();
    buildQuiz();
} 

function nextQuestion(button){
    stopClick();
    checkAnswer(button);
    questionNumber++;
    if (questionNumber === 46){
        gameoverDisplay();
    }else{
    answers = getQuestion();
    setTimeout(buildQuiz, 1000);
    }
}

function newGame(){
    revertDisplay();
}

// Function resets variables

function resetGame(){
    score = 0;
    // document.getElementById("correct-counter").innerHTML = score;
    correctCounter.innerHTML = score;
    mistakes = 0;
    // document.getElementById("incorrect-counter").innerHTML = mistakes;
    incorrectCounter.innerHTML = mistakes;
    time = 0;
    randomQuestionOrder = [];
    for(let i = 0; i < numberCharacters; i++){
        randomQuestionOrder.push(i);
    }
    randomQuestionOrder.sort(() => Math.random() - 0.5);
    questionNumber = 0;
}

// Functions pull data from radio button to set difficulty and language variables

function checkDifficulty () {
    difficultySetting = document.querySelector("input[name = 'difficulty']:checked").value;
    if (difficultySetting === "easy"){
        quizDifficulty = 3 ;
    }else if(difficultySetting === "medium"){
        quizDifficulty = 6;
    }else if(difficultySetting === "hard"){
        quizDifficulty = 9;
    }
}

function checkLanguage(){
    questionLanguageSetting = document.querySelector("input[name ='language']:checked").value;
    if (questionLanguageSetting === "1"){
        questionLanguage = "English";
    } else {
        questionLanguage = "Hiragana";
    }
}

// Functions change the display of elements

function changeDisplay(){
    // document.getElementById("quiz-container").style.display = "block";
    // document.getElementById("quiz-options").style.display = "none";
    quizContainer.style.display = "block";
    quizOptions.style.display = "none";
}

function revertDisplay(){
    // document.getElementById("quiz-container").style.display = "none";
    // document.getElementById("quiz-options").style.display = "block";
    // document.getElementById("gameover-container").style.display = "none";
    quizContainer.style.display = "none";
    quizOptions.style.display = "block";
    gameoverContainer.style.display = "none";
}

function gameoverDisplay(){
    // document.getElementById("gameover-container").style.display = "block";
    // document.getElementById("quiz-container").style.display = "none";
    gameoverContainer.style.display = "block";
    quizContainer.style.display = "none";
    document.getElementById("final-score").innerHTML = score;
    document.getElementById("number-of-questions").innerHTML = questionNumber;
}

// Function determines question and randomly selects answers

function getQuestion() {
    index = randomQuestionOrder[questionNumber];
    let answerSet;
    let possibleAnswers;
    if (questionLanguage === "English"){
        question = englishCharacters[index];
        answerSet = [hiraganaCharacters[index]];
        possibleAnswers = hiraganaCharacters.slice();
    }else if(questionLanguage === "Hiragana"){
        question = hiraganaCharacters[index];
        answerSet = [englishCharacters[index]];
        possibleAnswers = englishCharacters.slice();
    }
    possibleAnswers.splice(index,1);
    possibleAnswers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (quizDifficulty - 1); i++){
        let newWrongAnswer = possibleAnswers.shift();
        answerSet.push(newWrongAnswer);
    }
    answerSet.sort(() => Math.random() - 0.5);
    return answerSet;
}

// Function generates HTML for questions and answers

function buildQuiz(){
    questionElement.innerHTML = question;
    let answerHTML = ``;
    for(let answer of answers){
        let rowHTML = `<button class = "btn" onclick="nextQuestion(this)">${answer}</button>`;
        answerHTML +=rowHTML;
    }
    document.getElementById("answer-container").innerHTML = answerHTML;
}

// Function checks whether answer is correct and add relative classes

function checkAnswer (button) {
    let selected = button.innerHTML;    
    if(selected == englishCharacters[index] || selected == hiraganaCharacters[index] ){
        increaseScore();
        button.classList.add("correct-answer");
    }else{
        increaseIncorrectScore();
        button.classList.add("incorrect-answer");
    }
}

// Functions increase score counters

function increaseScore (){
    score ++;
    // document.getElementById("correct-counter").innerHTML = score;
    correctCounter.innerHTML = score;
}

function increaseIncorrectScore(){
    mistakes ++;
    // document.getElementById("incorrect-counter").innerHTML = mistakes;
    incorrectCounter.innerHTML = mistakes;
}

// Function prevents more than one answer being clicked per question

function stopClick() {
    let buttons = document.getElementsByClassName("btn");
    for (let button of buttons){
        button.removeAttribute("onclick");
    }
}

// Event listeners

document.getElementById("quiz-start").addEventListener("click", quizStart);
document.getElementById("btn-gameover").addEventListener("click", gameoverDisplay);
document.getElementById("new-game").addEventListener("click", newGame);