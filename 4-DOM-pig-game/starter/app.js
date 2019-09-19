/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//GLOBAL VARS DECLARATIONS

var scores, roundScore, activePlayer, games, gamePlaying;

//DOM VARS DECLARATIONS

var p1DOM, p2DOM, sc1DOM, sc2DOM, panName1DOM, panName2DOM, plName1DOM, plName2DOM, dice1DOM, dice2DOM;


p1DOM = document.getElementById('current-0');
p2DOM = document.getElementById('current-1');
sc1DOM = document.querySelector('#score-0');
sc2DOM  = document.querySelector('#score-1');
panName1DOM = document.querySelector('.player-0-panel');
panName2DOM = document.querySelector('.player-1-panel');
plName1DOM = document.querySelector('#name-0');
plName2DOM = document.querySelector('#name-1');
dice1DOM = document.querySelector('#dice-1');
dice2DOM = document.querySelector('#dice-2');

var scoresDOM = [sc1DOM, sc2DOM];
var namesDOM = [plName1DOM, plName2DOM];
var panNamesDOM = [panName1DOM, panName2DOM];

games = 0;
gamePlaying = false;

//SETUP

init();

/*
dice = Math.floor(Math.random() * 6) + 1;

//with # i select the id of an HTML element in index 
document.querySelector('#current-' + activePlayer).innerHTML = '<bl>' + dice + '</bl>';

//I can use querySelector for reading or writing actions
roundScore = document.querySelector('#score-' + activePlayer).textContent;
console.log(roundScore);

*/

//with . I select all the elements with a certain classgiven by the css file
document.querySelector('.dice').style.display = 'none';

//add an EventListener to ROLL and add as argument a callback function without (), but it's possible defining anonymous functions too, 
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        //only accessible into this scope
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        if (dice1 | dice2 !== 1) {
            //add result to roundscore and continue to play
            roundScore += dice1 + dice2;
            activePlayer === 0 ? p1DOM.textContent = roundScore: p2DOM.textContent = roundScore;
        }
        else {
            //reset roundscore and change active player
            nextPlayer();
        }
    }
    
});

//add an EventListener to HOLD
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add CURRENT to GLOBAL
        scores[activePlayer] += roundScore;
        //update UI respectively
        scoresDOM[activePlayer].textContent = scores[activePlayer];
        //check if someone won (GLOBAL > 100)
        if (scores[activePlayer] >= 20) {
            namesDOM[activePlayer].textContent = 'WINNER!'
            diceDOM.style.display = 'none';
            panNamesDOM[activePlayer].classList.add('winner');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
    
    

});
    

//add an EventListener to NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);

//FUNCTIONS DEFINITIONS

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        p1DOM.textContent = 0;
        p2DOM.textContent = 0;
        //i can remove or add classes to elements
        panName1DOM.classList.toggle('active');
        panName2DOM.classList.toggle('active');
};

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    p1DOM.textContent = '0';
    p2DOM.textContent = '0';
    sc1DOM.textContent = '0';
    sc2DOM.textContent = '0';
    plName1DOM.textContent = 'Player 1';
    plName2DOM.textContent = 'Player 2';
    panName1DOM.classList.remove('winner');
    panName2DOM.classList.remove('winner');
    panName1DOM.classList.remove('active');
    panName2DOM.classList.remove('active');
    panName1DOM.classList.add('active');
    gamePlaying = true;
    games ++;
}

