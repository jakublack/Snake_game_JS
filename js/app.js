var canvas = document.getElementById('snakeArea');
var ctx = canvas.getContext('2d');
var snakeSize = 15; 
var w = window.innerWidth -10;
var h = window.innerHeight -50;
var snake;
var food;

canvas.setAttribute("width",w);
canvas.setAttribute("height",h);

var allDraw = (function () { 

  var lineSnake = function(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var foodToEat = function(x, y) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  var startSnake = function() {
      var length = 5;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
    
  var mainDraw = function(){
      //bg black
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      
      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }
      
      
      //game over
      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || hitSnake(snakeX, snakeY, snake)) {
          //restart game
          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
        }
        
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          
          //Create new food
          createFood(); 
        } else {
          var tail = snake.pop(); 
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        
        snake.unshift(tail); 

        for(var i = 0; i < snake.length; i++) {
          lineSnake(snake[i].x, snake[i].y);
        } 
        
        foodToEat(food.x, food.y); 
        
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor(Math.random + 1);
          food.y = Math.floor(Math.random + 1);
        }
      }
  }

  var hitSnake = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      startSnake();
      createFood();
      gameloop = setInterval(mainDraw, 100);
  }
    return {
      init : init
    };

    
}());
    var btn = document.querySelector('.start');

    btn.addEventListener("click", function(){ 
        allDraw.init();
    });

	document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (direction != 'right') {
            direction = 'left';
          }
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          }
          break;
          }
      }