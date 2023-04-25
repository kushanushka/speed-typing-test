const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
//Display random quotes
const renderNewQuote = async () => {
  //Fetch contents from url
  const response = await fetch(quoteApiUrl);
  //Store responser
  let data = await response.json();
  //Access quote
  quote = data.content;
  //Array of characters in the quote
  let arr = quote.split("").map((value) => {
    //wrap the characters in a span tag
    return "<span class='quote-chars'>" + value + "</span>";
  });
  //join array for displaying
  quoteSection.innerHTML += arr.join("");
};

  // logic for comparing input words with quote
  userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");

    // create array from span tags
    quoteChars = Array.from(quoteChars);

    //array of users input
    let userInputChars = userInput.value.split("");

    //loop through each char in quote
    quoteChars.forEach((char,index) => {
      //check if user quote char == user input char

      if(char.innerText == userInputChars[index]){
        char.classList.add("success");
      }


      // if user hasn't enter anything or backspaced
       else if (userInputChars[index] == null) {

        //remove class if any
        if(char.classList.contains("success")){
          char.classList.remove("success");
        }
        else{
          char.classList.remove("fail");
        }
      }
       
      // if user enter wrong char 
      else {
        // checks if we already have added fail class

      if (!char.classList.contains("fail")){
        //increment and display
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    //Return true if all char  are entered 
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    if (check){ 
      displayResult();
    }
    }); 
});
//Update Timer on screen
function updateTimer(){
  if(time == 0){
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}
//Sets timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer,1000);
};

 
//End Test
const displayResult = () => {
  // display Result div
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if(time !=0){
    timeTaken = (60 - time) / 100;

  }
  document.getElementById("wpm").innerText = (userInput.value.length/5/timeTaken).toFixed(2) 
  + "wpm";
  document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100
  ) + "% ";
};


  

// start test 
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce()
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";

};
window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};