/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
const cards = [...card];
const deck = document.getElementsByClassName('deck').item(0);
const stars = document.querySelector('.stars');
const timer = document.getElementById('timer');
let openCards = [];
let matchedCards = [];
let moveCounter = document.getElementById('moves').innerText;
let moves = parseInt(moveCounter);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *
 */

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

// loop through each card and create its HTML
// *   - add each card's HTML to the page
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
 function openCard() {
     let currentCardSymbol = event.target.innerHTML;
     openCards.push(currentCardSymbol);
     event.target.classList.add('open', 'show');
 };


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
     else {
       setTimeout(function() {
         activeCards.forEach(function(activeCard) {
           activeCard.classList.remove('open', 'show');
         });
           openCards = [];
       }, 1000);

     };
 };

 function increaseMoveCounter () {
   moves += 1;
   document.getElementById('moves').innerText = moves + " Moves";
   if (moves === 1) {
     document.getElementById('moves').innerText = moves + " Move";
   };
   if (moves === 18) {
     stars.removeChild(stars.querySelector('li'));
   };
   if (moves === 25) {
     stars.removeChild(stars.querySelector('li'));
   };
   if (moves === 30) {
     stars.removeChild(stars.querySelector('li'))
   };
 };


deck.addEventListener('click', function(event) {
  if (event.target.nodeName === 'LI'
  && openCards.length < 2
  && (!event.target.classList.contains('open')
  && !event.target.classList.contains('show'))

) {
  openCard();
  if (openCards.length === 2) {
      checkMatch();
      increaseMoveCounter();
    };
  if (matchedCards.length === 16) {
    alert('Congrats! You finished the game in ' + moves + ' moves!');
  };
}
});
