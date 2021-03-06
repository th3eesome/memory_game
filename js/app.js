/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var matchingPair = [];
var icons = ['diamond',
    'diamond',
    'paper-plane-o',
    'paper-plane-o',
    'anchor',
    'anchor',
    'bolt',
    'bolt',
    'cube',
    'cube',
    'leaf',
    'leaf',
    'bicycle',
    'bicycle',
    'bomb',
    'bomb'
];
var progress = 0;
var moves = 0;
var stars = 3;
var startTime = Date.now();
var elapsedTime;

var interval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
}, 100);

addCard();

function refreshTime() {
    startTime = Date.now();
}

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

function clickCard(card) {
    if (matchingPair.length < 2){
        console.log(card);
        card.srcElement.setAttribute("class", card.srcElement.className + ' open');
        matchingPair.push(card.srcElement.children[0]);
    }
   // console.log(matchingPair);
    if (matchingPair.length === 2)
        if (!isPaired()) {
                console.log('wrong');
                setTimeout(wrongGuess, 700);
            }
        console.log(progress);
        console.log(moves);
    if (progress === 16) {
            setTimeout(confirmRestart, 500);
        }
   // assessScore();
}

function assessScore() {
    document.getElementsByClassName('moves')[0].innerHTML = moves;
    console.log(document.getElementsByClassName('stars')[0].children);
    if (moves === 16) {
        document.getElementsByClassName('stars')[0].children[0].style.color = 'grey';
        stars--;
    }
    if (moves === 22) {
        document.getElementsByClassName('stars')[0].children[1].style.color = 'grey';
        stars--;
    }
}

function removeCard() {
   document.getElementsByClassName('deck')[0].innerHTML = '';
   document.getElementsByClassName('stars')[0].children[0].style.color = 'black';
   document.getElementsByClassName('stars')[0].children[1].style.color = 'black';
   matchingPair = [];
   moves = 0;
   progress = 0;
   stars = 3;
   document.getElementsByClassName('moves')[0].innerHTML = moves;
   refreshTime();
}

function addCard() {
    removeCard();
    shuffle(icons).forEach(function (d) {
        var className = "fa fa-" + d;
        var card = document.createElement("li");
        card.className = "card";
        card.addEventListener("click", function (d) {
            d.srcElement.className === 'card' ? clickCard(d): console.log('no action');
        }, true);
        var node = document.createElement("i");
        node .className = className;
        card.appendChild(node);
        document.getElementsByClassName('deck')[0].appendChild(card);
    })
}

function isPaired() {
    moves++;
    assessScore();
    if (matchingPair[0].className === matchingPair[1].className)
    {
        matchingPair.forEach(function (d) {
            d.parentNode.setAttribute("class", "card match animated jello");

        });
        matchingPair = [];
        progress = progress + 2;
        return true
    } else {
        matchingPair.forEach(function (d) {
            console.log(d.parentNode);
            d.parentNode.setAttribute("class", "card different animated wobble");
        });
        return false;
    }

}

function wrongGuess() {
    console.log(matchingPair);
    matchingPair.forEach(function (d) {
        d.parentNode.setAttribute("class", "card");
    });
    matchingPair = [];
}

function msgSend() {
    alert("Congratulations! you finish the game within " + moves +" steps and " + stars + "star");
}

function confirmRestart() {
    if (confirm("Congratulations! you finish the game within " +moves+ " steps and " + stars + " star in " + (elapsedTime / 1000).toFixed(2) + " seconds ,restart？")) {
        addCard();
    }
}
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
