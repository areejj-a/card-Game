// Areej Alanazi project 2
///////////////////////////////////////////////Variables 
var counter=0 ;
const cards = document.querySelectorAll(".card");
const deck=document.querySelector("#deck");
const reset= document.querySelector("#restart");
let cardChildren =[];
let allCards=[];
let lives =0;
let hi=[];
const span=document.getElementById("moves");
var matchResult;
let hearts=document.getElementById("heart").children;
var min=0, sec=0;
var timeout= false;
let timerId=0;
let winCards=[];
let shuffleArr = [];
var firstClick=0;
var resetFlag=false;
////////////////////////////////////////////// eventListeners 
deck.addEventListener('click',function(){
// TO AVOID counting time multiple times 
firstClick++;
if(firstClick==1)
    countTime();

});
reset.addEventListener('click',resetGame);

for( let card of cards){
card.addEventListener("click",function(event){
 // increment for the clicks number 
    counter++;
//change span text & count clicks 
  document.getElementById("moves").textContent = counter.toString()+" moves"
// reveal card 
event.target.classList.add("open")
// add it to the array that will be used in match function
cardChildren.push(event.target)
// add it to the open & match cards ( cards that have classes open || match)
allCards.push(event.target)
//using the mod to know if the number of clicks is one of the multiples of #eight 
if(counter%8==0){
// if the player uses all 24 clicks 
    if(counter==24){
// alert him/her 
alert("Hard Luck Next Time :( !");
// and reset the game 
resetGame();
// and shuffle the cards - but it does Not work 
    }
// else if counter <24 && counter%8 ==0 
    else{
    // remove one heart 
    hi=hearts[lives].children
    hi[0].classList.remove("bi-heart-fill")
    lives++; }
}
   
// when the player opens 2 cards consecutively 
if(cardChildren.length==2){

    //check if they match 
    matchResult=match(cardChildren)

// if they match assign the css class "match" to them 
    if(matchResult==true){
      //  console.log("match");
        cardChildren[0].classList.add("match")
        cardChildren[1].classList.add("match")
        cardChildren.pop(cardChildren[0])
        cardChildren.pop(cardChildren[1])
       // and also check if the player won all 16 cards or not 
       if(win()){
        alert("Congrats You Win !")
        }
    }
  // if the 2 cards do not match 
    else{
        // close them by removing the css class "open" 
        // but there is a problem here that the second card does not open from the beginning 
        //cardChildren[0].classList.remove("open")
        //cardChildren[1].classList.remove("open")
        setTimeout(function(){ 
            cardChildren[0].classList.remove("open")
            cardChildren[1].classList.remove("open")
            cardChildren.pop(cardChildren[0])
        cardChildren.pop(cardChildren[1])
        }, 280);
      
        
      //console.log(cardChildren.length)
    }
  
}
    }// end function
    
    
    )// end listener 
}

/////////////////////////////////////////////////// Functions 

//////////////////////////////// (1)
//function that find out if two cards matched or Not 
function match(arr){
// the array will have 2 open cards 
let card1=[],card2=[];
// so get there children elements 
card1=arr[0].children;
card2=arr[1].children;
// get each children className 
if(typeof card1[0]!== 'undefined'&& typeof card2[0]!== 'undefined'){
cardClass1=card1[0].className
cardClass2=card2[0].className}
// if they are equal it is a match 
if(cardClass1!=='undefined' && cardClass2 !== 'undefined')
 if(cardClass1==cardClass2){
/* and push one of the classes names into winCards array that will be used to check if the player
won the game or Not */
winCards.push(cardClass1);
//and return true so the caller function knows that they match to change the css class to "match"
    return true
 }

 // if they do not match return false so the caller function close the cards
 else
  return false
}

//////////////////////////////// (2)
// the function that check if the player won when counter <24 
function win() {
/*the logic behind this is that there is 8 types of cards whenever two cards matched 
we push the card class name in the winCard array and when that array length ==8 that
means the player won the game */ 
if(winCards.length==8)
return true;
else 
return false;
}

////////////////////////////////(3)
//the function that should activate the timer 
function countTime (){

if(timeout==false){
timerId= setInterval(function(){
    sec++;
    if(sec==59)
    {min++;
   sec=0;}
   // i shoud have use .innerHTML 
   if(sec<10){
 document.getElementById("timer").textContent = min.toString()+":0"+sec.toString();}
 else{
    document.getElementById("timer").textContent = min.toString()+":"+sec.toString();

 }

   
},1000)

}

}

////////////////////////////////(4) 
//the reset function 
function resetGame(){
    
    let i =0;
// reset counter
counter=0;
document.getElementById("moves").textContent = counter.toString()+" moves"

//reset hearts
for(i=0;i<hearts.length;i++){
hi=hearts[i].children
hi[0].classList.add("bi-heart-fill")}

//reset timer 
// to stop counting time 
firstClick=0;
// check the timeout variable effect 
timeout=true;
clearInterval(timerId);
countTime();
timeout=false;
min=0;
sec=0;
document.getElementById("timer").textContent = min.toString()+":0"+sec.toString()

/*close all cards ( allCards is an array that was originally created to not
 use an element that was previously clicked to avoid any error may appear )*/
for( i=0;i<allCards.length;i++){
// conditions are just to avoid any probable error 
 if(allCards[i].classList.contains("open"))
 allCards[i].classList.remove('open')
 if(allCards[i].classList.contains("match"))
allCards[i].classList.remove('match')
} 

// not the given one 
shuffle();

//console.log(shuffle(shuffleArr))
//for(y=0;y<shuffleArr.length;y++)
}

////////////////////////////////(5)

//shuffle cards 
function shuffle(){

cards.forEach( card=>{

let randomPos = Math.floor(Math.random()*16);
card.style.order = randomPos;

})

}

