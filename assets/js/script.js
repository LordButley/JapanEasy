const englishCharacters = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"];
const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
const numberCharacters = 46;
var randomQuestionIndex = [];
var questionNumber = 0;
var quizDifficulty = 3;
var difficultySetting;

for(let i = 0; i < numberCharacters; i++){
    randomQuestionIndex.push(i);
}

randomQuestionIndex.sort(() => Math.random() - 0.5);

console.log(randomQuestionIndex);

function quizStart(){
    changeDifficulty();
} 

function nextQuestion() {

}

function checkAnswer () {
    
}

function increaseScore (){

}

function increaseIncorrectScore(){
    
}

function changeDifficulty () {
    difficultySetting = document.querySelector("input[name = 'difficulty']:checked").value;
    if (difficultySetting === 1){
        quizDifficulty = 3 ;
    }else if(difficultySetting === 2){
        quizDifficulty = 6;
    }else if(difficultySetting === 3){
        quizDifficulty = 9;
    }
}

document.getElementById("quiz-start").addEventListener("click", quizStart());