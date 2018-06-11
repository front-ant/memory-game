let card = document.getElementsByClassName('card');
const cards = [...card];
const deck = document.getElementsByClassName('deck').item(0);
const stars = document.querySelector('.stars');
const timer = document.getElementById('timer');
const restartButton = document.querySelector('.restart');
let activeCard = document.getElementsByClassName('open', 'show');
let activeCards = [];
let matchedCards = [];
let moveCounter = document.getElementById('moves').innerText;
let moves = parseInt(moveCounter);
let starRating = "three stars! ***";
let time = 0;
let timerVar = null;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

shuffle(cards);

for (card of cards) {
  deck.appendChild(card);
};

//FUNCTIONALITY OF THE GAME

function openCard(event) { //Display the card's symbol, add card to a list of opened cards
   if (event.target.nodeName === 'LI'//only fires if a card is clicked
   && activeCards.length < 2//not more than two cards should be open at a time
   && (!event.target.classList.contains('open')//will not fire if the card is already open or matched
   && !event.target.classList.contains('show')
   && !event.target.classList.contains('match'))) {//only if the conditions are met, the following sequence of functions will be executed:
     event.target.classList.add('open', 'show');
     activeCards = [...activeCard];
 }};

function checkMatch() {//Check whether a card is a match, add matched cards to a special list
  if (activeCards[0].innerHTML === activeCards[1].innerHTML) {
    matchedCards.push(activeCards[0], activeCards[1]);
    activeCards.forEach(function(activeCard) {
      activeCard.classList.add('match');
      activeCard.classList.remove('open', 'show');
    });
    activeCards = [];
  }
  else {//close unmatched cards after 1 second
    setTimeout(function() {
    activeCards.forEach(function(activeCard) {
    activeCard.classList.remove('open', 'show');
    });
    activeCards = [];
  }, 1000);
  };
 };

function increaseMoveCounter () {//only fires after a match is checked so it won't track every click
  moves += 1;
  document.getElementById('moves').innerText = moves + ' Moves';
  if (moves === 1) {//This is petty but I like it
     document.getElementById('moves').innerText = moves + ' Move';
  };
  if (moves === 18) {//star rating goes down with increasing moves, might be better in a separate function
    stars.removeChild(stars.querySelector('li'));
    starRating = "two stars! **";
  };
  if (moves === 25) {
    stars.removeChild(stars.querySelector('li'));
    starRating = "one star! *";
  };
  if (moves === 30) {
    stars.removeChild(stars.querySelector('li'))
    starRating = "no stars. :(";
  };
};

function increaseTimer() {
  time += 1;
  timer.innerHTML = 'Time: ' + time;
}

function firstClick(event) {
  let timerVar = setInterval(increaseTimer, 1000);
  openCard(event);
  deck.removeEventListener('click', firstClick);
}

function clickOnCard(event) {
  openCard(event);
  if (activeCards.length === 2) {
    checkMatch();
    increaseMoveCounter();
    if (matchedCards.length === 16) {//end of game
      clearInterval(timerVar);
      deck.removeEventListener('click', clickOnCard);
      setTimeout(function() {//timeout prevents end game message from popping up before the second card is opened
        let endGameMessage = confirm('Congrats! You finished the game in ' + moves + ' moves and ' + time + ' seconds! You have earned ' + starRating + ' Another round?');
        if (endGameMessage === true) {//TODO timer keeps ticking when cancel is chosen!
          location.reload();
        }
      }, 500)
}}}





//EVENT LISTENERS

deck.addEventListener('click', firstClick);
deck.addEventListener('click', clickOnCard);
restartButton.addEventListener('click', function() {
  location.reload();
});
