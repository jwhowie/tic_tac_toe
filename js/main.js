'use strict';

$(function(){
  var turn = 0;
  var turnArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];

  $('.square').on('click', function(){
    var self = $(this);
    var winner = false;
    if (turn <= 8) {
      if(self.text() === ''){
        self.text(turnArray[turn++]);
        if (turn > 4){
          if(checkWinner()){
            $('.status').text(self.text() + ' Wins!')
            winner = true;
          }
        }
      }
    }

    if(!winner && turn === 9){
      $('.status').text('No One Wins Game Over!')
    }
  });

  function checkWinner(){
    var board = $('.board');
    var otherPlayer = turnArray[turn];
    var magicTable = [[8, 1, 6], [3, 5, 7], [4,9,2]];

    board.find('tr').each(function (r, row){
      $(this).find('td').each(function (c, col){
        if($(col).text() === otherPlayer || $(col).text() === ''){
          magicTable[r][c] = 0;
        }
      });
    });
    return checkWinningPattern(magicTable);
  }

  function checkWinningPattern(magicTable){
    //check for winning row
    for(var r = 0; r < 3; r++){
      if((magicTable[r][0] + magicTable[r][1] + magicTable[r][2]) === 15){
        return true;
      }
    }
    //check for winning col
    for(var c = 0; c < 3; c++){
      if((magicTable[0][c] + magicTable[1][c] + magicTable[2][c]) === 15){
        return true;
      }
    }
    // check for winning top left to bottom right
    if((magicTable[0][0] + magicTable[1][1] + magicTable[2][2]) === 15){
      return true;
    }
    // check for winning bottol left to top right
    if((magicTable[0][2] + magicTable[1][1] + magicTable[2][0]) === 15){
      return true;
    }
    return false;
  }
});
