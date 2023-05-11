const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let notClicked = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(e) {
  //if card not clicked does nothing. if card has already been clicked it does nothing
  if (notClicked) return;
  if (e.target.classList.contains("flipped")) return;

  //changes background color of card if clicked and adds class of "flipped"
  let cardClicked = e.target;
  cardClicked.style.backgroundColor = cardClicked.classList[0];

  if (!card1 || !card2) {
    cardClicked.classList.add("flipped");
    card1 = card1 || cardClicked;
    card2 = cardClicked === card1 ? null : cardClicked;

}
//creates a variable for colored side and checks to see if the colors match
//if they match the card1 & card2 variables are set to be empty not notClicked becomes false. if they don't match notClicked is set to true and the cards are then flipped back over by removing the class of flipped
if(card1 && card2) {
  notClicked = true;
  let colored1 = card1.className;
  let colored2 = card2.className;

  if(colored1 === colored2){
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    notClicked = false;
  }else{
    setTimeout(function(){
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      notClicked = false;
    },1000);
    }

  }

}

createDivsForColors(shuffledColors);
