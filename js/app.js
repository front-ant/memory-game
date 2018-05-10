/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
const cards = [...card];
const deck = document.getElementsByClassName('deck').item(0);
let openCards = [];
let match = false;

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
  // console.log(deck);
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
     event.target.classList.add('open', 'show');
 };

function markAsOpened() {
let currentCardSymbol = event.target.firstElementChild.getAttribute('class');
openCards.push(currentCardSymbol);
console.log(openCards);
 };

 function checkMatch() {
   if (openCards[0] === openCards[1]) {
      match = true;
      console.log("It's a match!");
    }
     else {
       match = false;
       console.log("No match, sorry!")
     };
 };

 function matchOrNo() {
   if (match === false) {
     setTimeout(function() {
       cards.forEach(function(card) {
         card.classList.remove('open', 'show', 'clicked');
       });
       openCards = [];
     }, 1000);
 }}

deck.addEventListener('click', function(event) {
  if (event.target.nodeName === 'LI'
  && openCards.length < 2
  && event.target.classList.contains('clicked') === false) {
  event.target.classList.add('clicked');
  openCard();
  markAsOpened();
  if (openCards.length === 2) {
      checkMatch();
      matchOrNo();
    };
}
});
