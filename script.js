//DOM elements
const reusltDOM = document.querySelector(".result");
const RandomNum = getRandomNum();
const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let speech = new speechRecognition();
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
console.log("random number is : "+ RandomNum)
recognition.start();
//defining getRandomNum
function getRandomNum(){
    return Math.floor(Math.random() * 100);
}
//definig validation
function validation(text){
    let num = +text;
    if(Number.isNaN(num)){
        return "Invalid number"
    }else{
        if(num >= 1 && num <= 100){
            if(num > RandomNum){
                return "BELOW"
            }else if(num === RandomNum){
                return "you win";
            }else{
                return "ABOVE"
            }
        }else{
            return "please enter a number between 0 and 100"
        }
    }
}
//defining updateContent
function updateContent(text){
    res = validation(text);
    if(res === "you win"){
        reusltDOM.innerHTML = `
            <p>you win</p>
            <button class = "hey" >play again</button>
        `
    }else{
        reusltDOM.innerHTML = `
        <label>you said</label>
        <h3 class = "box">${text}</h3>
        <h3>${res}</h3>
    `
    }
   
}
recognition.addEventListener("result", (e)=>{
    let text = e.results[0][0].transcript;
    updateContent(text);
})
recognition.addEventListener("end", (e=>{
    recognition.start();
}))
reusltDOM.addEventListener("click", (e)=>{
    if(e.target.classList.contains("hey")){
        window.location.reload();
    }
})


