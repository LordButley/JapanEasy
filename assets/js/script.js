const englishCharacters = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"];
const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
const numberCharacters = 46;
let randomQuestionOrder = [];
let questionNumber = 0;
let quizDifficulty = 3;
let questionLanguage;
let difficultySetting;
let questionLanguageSetting;
let question = document.getElementById("question");
let answers = [];
let score = 0;
let mistakes = 0;
let time = 0;

for(let i = 0; i < numberCharacters; i++){
    randomQuestionOrder.push(i);
}
randomQuestionOrder.sort(() => Math.random() - 0.5);
let index;  


function quizStart(){
    reset();
    checkDifficulty();
    checkLanguage();
    changeDisplay();
    answers = getQuestion();
    buildQuiz();
} 

function getQuestion() {
    index = randomQuestionOrder[questionNumber];
    console.log(index);
    let answerSet = [hiraganaCharacters[index]];
    let possibleAnswers = hiraganaCharacters.slice();
    possibleAnswers.splice(index,1);
    possibleAnswers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (quizDifficulty - 1); i++){
        let newWrongAnswer = possibleAnswers.shift();
        answerSet.push(newWrongAnswer);
    }
    // questionNumber++;
    answerSet.sort(() => Math.random() - 0.5);
    return answerSet;
}

function changeDisplay(){
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("quiz-options").style.display = "none";
}

function nextQuestion(button){
    checkAnswer(button);
    questionNumber++;
    console.log(questionNumber);
    answers = getQuestion();
    setTimeout(buildQuiz, 1000);
}

function buildQuiz(){
    question.innerHTML = englishCharacters[index] + "?";
    let answerHTML = ``;
    for(answer of answers){
        let rowHTML = `<button class = "btn" onclick="nextQuestion(this)">${answer}</button>`
        answerHTML +=rowHTML;
    }
    document.getElementById("answer-container").innerHTML = answerHTML;
}

function checkAnswer (button) {
    let selected = button.innerHTML;
    console.log(selected);
    
    if(selected == englishCharacters[index] || selected == hiraganaCharacters[index] ){
        increaseScore();
        button.classList.add("correct-answer");
    }else{
        increaseIncorrectScore;
        button.classList.add("incorrect-answer");
    }
}

function increaseScore (){
    score ++;
}

function increaseIncorrectScore(){
    mistakes ++;
}

function reset(){
    score = 0;
    mistakes = 0;
    time = 0;
}

function endGame(){

}

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
    if (questionLanguageSetting === 1){
        questionLanguage = "English";
    } else {
        questionLanguage = "Hiragana";
    }

}


// let buttons = document.querySelectorAll(".btn");
// for (button of buttons) {
//     button.addEventListener('click', checkAnswer())
// }
// document.getElementById("quiz-start").addEventListener("click", quizStart());