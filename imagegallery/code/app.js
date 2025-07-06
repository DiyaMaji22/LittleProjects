const randomNumber=parseInt(Math.random()*100+1);
const submit=document.querySelector('#subt');
const userinput=document.querySelector('#guessField');
const guessSlot=document.querySelector('.guesses');
const remaining=document.querySelector('.lastResult');
const lowOrHi=document.querySelector('.lowOrHi');
const startover=document.querySelector('.resultParas');
const p=document.createElement('p');
let prevguess=[];
let numofguesses=1;
 let playGame=true;
 if(playGame)
 {
   submit.addEventListener('click',function(e)
   {
     e.preventDefault();
     const guess=parseInt(userinput.value);
     validateGuesses(guess);

   })
 }
 function validateGuesses(guess)
 {
   if(guess==='' || isNaN(guess))
   {
     alert('Please enter a valid number');

   }
   if(guess<1)
   {
     alert(`Please enter a number greater than 1`)
   }
   if(guess>100)
   {
     alert('please enter a number that is less than 100');
   }
   else{
     prevguess.push(guess);
     if(numofguesses===11)
     {
       displayguesses(guess);
       display(`Game Over. Random Number was ${randomNumber}`);
       endgame();
     }
     else{
       displayguesses(guess);
       checkGuesses(guess);
     }
   }


 } 
 function checkGuesses(guess)
 {
  if(guess>randomNumber)
  {
    display(`The number is greater than the random number`);

  }
  if(guess<randomNumber)
  {
    display(`The number is less than the random number`);

  }
  if(guess===randomNumber)
  {
    display(`You have guessed the correct number,let's goo!!`)
    endgame();
  }
 }
 function displayguesses(guess)
 {
  userinput.value='';
  guessSlot.innerHTML+=`${guess} `;
  numofguesses++;
  remaining.innerHTML=`${11-numofguesses}`
  
 }
 function display(message)
 {
  lowOrHi.innerHTML=`${message}`;
 }
 function newGame()
 {
   const newgamebutton=document.querySelector('#newGame');
   newgamebutton.addEventListener('click',function(e)
   {
    randomNumber=parseInt(Math.random()*100+1);
    prevguess=[];
    numofguesses=1;
    guessSlot.innerHTML='';
    remaining.innerHTML=`${11-numofguesses}`;
    userinput.removeAttribute('disabled');
    startover.removeChild(p);
    playGame=true;
   })

 }
 function endgame()
 {
  userinput.value='';
  userinput.setAttribute('disabled','');
  p.classList.add('button');
  p.innerHTML=`<h2 id="newGame">Start new Game</h2>`;
  startover.appendChild(p);
  playGame=false;
  newGame();

 }