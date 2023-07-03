var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];
// Duplicate our cards so that they can match
var gameGrid=cardsArray.concat(cardsArray);
// Randomize game grid on each load
gameGrid.sort(function(){
    return 0.5-Math.random();
})
// cardsArray[0].name;this will return 'CSS'
// similarly for the image
// grab the div with an id of the game-board and assign to a variable game
var game=document.getElementById('game-board');
// create a section element and assign it to variable grid
var grid=document.createElement('section');
// give section element a class of grid
grid.setAttribute('class','grid');
// Append the grid section to the game-board div
game.appendChild(grid);
// loop through each item in our array
for(i=0;i<gameGrid.length;i++){
    // create a div element and assign to variable card
    var card=document.createElement("div");
    // Apply a card class to that div
      card.classList.add('card');
    // set the data-name attribute of the div to the cardsArray name
    card.dataset.name=gameGrid[i].name;
    // Create the front of the card
   var front=document.createElement("div");
   front.classList.add('front');
//    Create the back of the card
   var back=document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage=`url(${gameGrid[i].img})`;
    // Append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}
var firstGuess='';
var secondGuess='';
// set count to 0
var count=0;
var previoustarget=null;
var delay=1200;
// Add match CSS
var match=function(){
var selected=document.querySelectorAll('.selected');
// loop through the array like object containing 'selected' class
for(i=0;i<selected.length;i++){
    selected[i].classList.add('match');
}
}
// Reset guesses after two attempts
var resetGuesses=function(){
    firstGuess='';
    secondGuess='';
    count=0;
    previoustarget=null;
    var selected=document.querySelectorAll('.selected');
    for(i=0;i<selected.length;i++){
        selected[i].classList.remove('selected');
    }
}
// Add eventListener to our grid
grid.addEventListener('click',function(event){
// declare variables to target our clicked items
var clicked=event.target;
// Do not allow the grid section itself to be selected
// only select divs inside the grid
if(clicked.nodeName=='SECTION'|| clicked==previoustarget|| clicked.parentNode.classList.contains('match')|| clicked.parentNode.classList.contains('selected')){
    return;
}
// We only want to add the selected class if the count is less than 2
if(count<2){
    count++;
   if(count==1){
    // Assign first guess
    firstGuess=clicked.parentNode.dataset.name;
    clicked.parentNode.classList.add('selected');
   }
   else{
// Assign second guess
secondGuess=clicked.parentNode.dataset.name;
clicked.parentNode.classList.add('selected')
   }
// If both guesses are not empty
if(firstGuess!=='' && secondGuess!==''){
    // And the firstGuess matches the secondGuess
    if(firstGuess==secondGuess){
        // Run the match function
        setTimeout(match(),delay);
        setTimeout(resetGuesses(),delay);
    }
    else{
        setTimeout(resetGuesses(),delay);
    }
}
previoustarget=clicked;
}

});