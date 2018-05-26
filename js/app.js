let card = document.getElementsByClassName('card');
const cards = [...card];
const deck = document.getElementsByClassName('deck').item(0);
const stars = document.querySelector('.stars');
const timer = document.getElementById('timer');
let openCards = [];
let matchedCards = [];
let moveCounter = document.getElementById('moves').innerText;
let moves = parseInt(moveCounter);
let time = 0;

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //Display the card's symbol, add card to a list of opened cards
 function openCard() {
     let currentCardSymbol = event.target.innerHTML;
     openCards.push(currentCardSymbol);
     event.target.classList.add('open', 'show');
 };

//Check whether a card is a match, add matched cards to a special list
 function checkMatch() {
   let activeCard = document.getElementsByClassName('open', 'show');
   const activeCards = [...activeCard];
   if (openCards[0] === openCards[1]) {
      matchedCards.push(openCards[0], openCards[1]);
      activeCards.forEach(function(activeCard) {
        activeCard.classList.add('match');
        activeCard.classList.remove('open', 'show');
      });
      openCards = [];

    }
     else {//close unmatched cards after 1 second
       setTimeout(function() {
         activeCards.forEach(function(activeCard) {
           activeCard.classList.remove('open', 'show');
         });
           openCards = [];
       }, 1000);

     };
 };

//only fires after a match is checked so it won't track every click
 function increaseMoveCounter () {
   moves += 1;
   document.getElementById('moves').innerText = moves + ' Moves';
   if (moves === 1) {//This is petty but I like it
     document.getElementById('moves').innerText = moves + ' Move';
   };
   if (moves === 18) {//star rating goes down with increasing moves, might be better in a separate function
     stars.removeChild(stars.querySelector('li'));
   };
   if (moves === 25) {
     stars.removeChild(stars.querySelector('li'));
   };
   if (moves === 30) {
     stars.removeChild(stars.querySelector('li'))
   };
 };

window.onload = function startGame() {
  let timerVar = setInterval(increaseTimer, 1000);
  function increaseTimer() {
    time += 1;
    timer.innerHTML = 'Time: ' + time;
  }

  deck.addEventListener('click', function(event) {
  if (event.target.nodeName === 'LI'//only fires if a card is clicked
  && openCards.length < 2//not more than two cards should be open at a time
  && (!event.target.classList.contains('open')//will not fire if the card is already open or matched
  && !event.target.classList.contains('show')
  && !event.target.classList.contains('match'))
) {//only if the conditions are met, the following sequence of functions will be executed:
  openCard();
  if (openCards.length === 2) {
      checkMatch();
      increaseMoveCounter();
    };
  if (matchedCards.length === 2) {//end of game
    alert('Congrats! You finished the game in ' + moves + ' moves and ' + time + ' seconds!');
  };
}
});
}
