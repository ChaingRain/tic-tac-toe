let name = '';
let name2 = '';

const start = function() {
  $('#start').removeClass('hide');
  $('#oneplayer').click(single)
  $('#twoplayers').click(double)
}
let gameMode = '';
const single =  function() {
  gameMode = 'solo';
  $('#startbuttons').addClass('hide');
  $('#start h1').after('<div id="singlename"><br><label class="startscreen">Name:</label><br><input id="name"><br></div>');
  $('#name').focus();
  $('#singlename').after('<div id="enter" class="hide startscreen"><p>Press Enter</p></div>');
  $('#name').keyup(function (){
    if($('#name').val().length > 0) {
      $('#enter').removeClass('hide')
      $(document).one('keyup', function(e) {
          if(e.which == 13) {
            begin();
          }
        });
    }else {
      $('#enter').addClass('hide')
    }
  })
}
const double = function() {
  gameMode = 'double';
  $('#startbuttons').addClass('hide');
  $('#start h1').after('<div id="doublename"><br><div class="p1input"><label class="startscreen">Player 1 Name:</label><br><input id="name"></div><div class="p2input"><label class="startscreen">Player 2 Name:</label><br><input id="name2"></div></div><br>');
  $('#name').focus();
  $('#doublename').after('</hr><div id="enter" class="startscreen onehundred"><p class="hide">Press Enter</p></div>');
  $('#doublename').keyup(function (){
    if($('#name').val().length > 0 && $('#name2').val().length > 0) {
      $('#enter .hide').removeClass('hide');
      $(document).one('keyup', function(e) {
          if(e.which === 13) {
            begin();
          }
        });
    }else {
      $('#enter p').addClass('hide')
    }
  })
}

function buildGame() {
  name = $('#name').val();
  name2 = $('#name2').val();
  if(gameMode === 'solo'){
    name2 = 'Computer'
  }
  $('#player1').prepend('<p class="name">'+ name + '</p>')
  $('#player2').prepend('<p class="name2">'+ name2 + '</p>')
  $('#start').addClass('hide');
  $('#player1').addClass('active');
}
function begin() {
  if(gameMode === 'solo' && $('#name').val().length > 0){
    buildGame();
  }else if(gameMode === 'double' && $('#name').val().length > 0 && $('#name2').val().length > 0){
    buildGame();
  }

}
let randomNumber = '';
let random = '';
function randomBox() {
  randomNumber = Math.floor((Math.random() * 9) + 1);
  random = $('ul li:nth-child(' + randomNumber + ')' );
  if(random.hasClass('placed')){
    randomBox();
  }else {
  $(random).addClass('box-filled-2 placed')
  }
}
const autoplay = function() {
  randomBox();
  $('#player2').removeClass('active');
  $('#player1').addClass('active');
}

const changePlayer = function() {
  if($(this).hasClass('placed')){
  }else if($('#player1').hasClass('active')){
    if(gameMode === 'solo'){
    setTimeout(autoplay, 1500);
    clearTimeout(autoplay);
    }
    $('#player1').removeClass('active');
    $('#player2').addClass('active');
    $(this).addClass('placed');
    makeArray();
    win();
  }else {
    $('#player2').removeClass('active');
    $('#player1').addClass('active');
    $(this).addClass('placed');
    makeArray();
    win();
  }
}

const addIcon = function() {
  if(gameMode === 'solo' && $('#player2').hasClass('active')){
  }else {
    if($(this).hasClass('placed')){
    }else if($('#player1').hasClass('active')){
      $(this).addClass('box-filled-1');
    }else {
      $(this).addClass('box-filled-2');
    }
  }
}
const removeIcon = function() {
  if(gameMode === 'solo' && $('#player2').hasClass('active')){
  }else {
    if($(this).hasClass('placed')){
    }else if($('#player1').hasClass('active')){
      $(this).removeClass('box-filled-1');
    }else {
      $(this).removeClass('box-filled-2');
    }
  }
}
let boxesArray = [];
let classArray = [];
let horizontal1 = [];
let horizontal2 = [];
let horizontal3 = [];
let vertical1 = [];
let vertical2 = [];
let vertical3 = [];
let diagonal1 = [];
let diagonal2 = [];
let winArray = [];

function makeArray(){
  boxesArray = $('.box').toArray();
}

function resetArray() {
  classArray = [];
  horizontal1 = [];
  horizontal2 = [];
  horizontal3 = [];
  vertical1 = [];
  vertical2 = [];
  vertical3 = [];
  diagonal1 = [];
  diagonal2 = [];
  winArray = [];
}
function buildWin() {
  horizontal1 = classArray.slice(0,3);
  horizontal2 = classArray.slice(3,6);
  horizontal3 = classArray.slice(6,9);
  vertical1.push(classArray[0]);
  vertical1.push(classArray[3]);
  vertical1.push(classArray[6]);
  vertical2.push(classArray[1]);
  vertical2.push(classArray[4]);
  vertical2.push(classArray[7]);
  vertical3.push(classArray[2]);
  vertical3.push(classArray[5]);
  vertical3.push(classArray[8]);
  diagonal1.push(classArray[0]);
  diagonal1.push(classArray[4]);
  diagonal1.push(classArray[8]);
  diagonal2.push(classArray[2]);
  diagonal2.push(classArray[4]);
  diagonal2.push(classArray[6]);
  winArray = [
      horizontal1,
      horizontal2,
      horizontal3,
      vertical1,
      vertical2,
      vertical3,
      diagonal1,
      diagonal2
    ]
}
let playerTwo = []
let playerOne = []

function checkWin() {
  playerTwo = ["box box-filled-2 placed", "box box-filled-2 placed", "box box-filled-2 placed"];
  playerOne = ["box box-filled-1 placed", "box box-filled-1 placed", "box box-filled-1 placed"];
  if($('.placed').length === 9){
    $('#finish').removeClass('hide')
    $('#finish').addClass('screen-win-tie')
    $('#board').addClass('hide');
    $('.message').append("It's a Tie!");
  }
  for (i = 0; i < winArray.length; i++)
  if(winArray[i].toString() === playerTwo.toString()) {
    $('#finish').removeClass('hide')
    $('#finish').addClass('screen-win-two');
    $('#board').addClass('hide');
    if(gameMode === 'solo') {
      $('.message').append("Computer Wins!");
    } else{
      $('.message').append(name2 + ' Wins');
    }
  }else if(winArray[i].toString() === playerOne.toString()) {
    $('#finish').removeClass('hide');
    $('#finish').addClass('screen-win-one');
    $('#board').addClass('hide');
    $('.message').append(name + ' Wins');
  }
}


function win() {
    resetArray();
  for (i = 0; i < boxesArray.length; i++) {
    classArray.push(boxesArray[i].attributes.class.value);
    }
    buildWin();
    checkWin();
}

const reset = function() {
  resetArray()
  makeArray()
  $('.placed').removeClass('placed');
  $('.box-filled-1').removeClass('box-filled-1');
  $('.box-filled-2').removeClass('box-filled-2');
  $('.message').empty();
  $('#finish').addClass('hide');
  $('#finish').removeClass('screen-win-one');
  $('#finish').removeClass('screen-win-two');
  $('#board').removeClass('hide');
  $('#oneplayer').removeClass('hide')
  $('#twoplayer').removeClass('hide')
}

$( document ).ready(start)
$('.box').mouseover(addIcon)
$('.box').mouseout(removeIcon)
$('.box').click(changePlayer)
$('#newgame').click(reset);
$('#reset').click(function () {
    document.location.reload(true);
});
