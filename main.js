//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다

let computerNum = 0
let buttonClick = document.getElementById("button-click");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

buttonClick.addEventListener("click", click);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100) + 1;
    console.log("정답", computerNum);
}

function click(){
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent="1과 100사이 숫자를 입력해주세요!"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent=userValue+" 는 이미 입력한 숫자! 다른 숫자를 입력하길!"
        return;
    }

    chances -- ;
    chanceArea.textContent = "남은기회 : "+chances+"번"; //`남은기회:${chances}번`; *chances:동적인값 과 정적인 값을 합쳐서 쓸 수 있는 문법

    if(userValue < computerNum){
        resultArea.textContent = "Up!!!"
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!!!"
    }else {
        resultArea.textContent = "정답!!!"
        gameOver=true
    }

    history.push(userValue);

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        buttonClick.disabled = true;
    }
}

function reset(){
    //user input창이 깨끗하게 정리
    userInput.value = ""
    //새로운 번호가 생성
    pickRandomNum();

    resultArea.textContent="Up일까? Down일까?"
}
pickRandomNum();