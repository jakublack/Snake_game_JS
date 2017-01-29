var btnStart = document.querySelector(".start");
var infoScore = btnStart.nextElementSibling
var scoreUpdate = document.querySelector(".score");
var canvas = document.getElementById('snakeArea');
var ctx = canvas.getContext('2d');
var snakeSize = 15; 
var w = 350;
var h = 350;
var snake;
var food;
//var speed =100;
var score = 0;
var score_info = 0;
//var speed_info = 1

//
//canvas.setAttribute("width",w);
//canvas.setAttribute("height",h);

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
//    var scoreInfo = function() {
//        score_info = "Score: " + score;
//        ctx.fillStyle = 'red';
//        ctx.fillText(score_info, w/2.5, 10);
//    }
    
    var mainDraw = function(){
        //bg black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);
        
        
      
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction == 'right') { 
            snakeX++; 
        }
        else if (direction == 'left') { 
            snakeX--; 
        }
        else if (direction == 'up') { 
            snakeY--; 
        } 
        else if(direction == 'down') { 
            snakeY++; 
        }
        //game over
        if (snakeX == -1 || snakeX > w/snakeSize || snakeX > w || snakeY == -1 || snakeY > h/snakeSize || hitSnake(snakeX, snakeY, snake)) {
            //restart game
            score = 0;
            speed_info =1;
            infoScore.classList.toggle("hide");
            btnStart.classList.toggle("hide");
            ctx.clearRect(0,0,w,h);
            gameloop = clearInterval(gameloop);
            return;          
        }

        if(snakeX == food.x && snakeY == food.y) {
            var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
              //Create new food
            createFood();
            score +=10
//            if (score>=speed_info*100){
//                speed-=30
//                speed_info++
//            }
        } 
        else {
            var tail = snake.pop(); 
            tail.x = snakeX; 
            tail.y = snakeY;
        }

            snake.unshift(tail); 

        for(var i = 0; i < snake.length; i++) {
            lineSnake(snake[i].x, snake[i].y);
        } 

        foodToEat(food.x, food.y);
    
        scoreUpdate.innerText = score ;
    }

    var createFood = function() {
        food = {
            x: Math.floor((Math.random() * 20) + 1),
            y: Math.floor((Math.random() * 20) + 1)
            
           
            
        }
       

        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 20) + 1);
                food.y = Math.floor((Math.random() * 20) + 1);
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
          direction = 'right';
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
    btnStart.classList.toggle("hide");
    infoScore.classList.toggle("hide");
    allDraw.init();
});

//for mobile to touch
var startX;
var startY;
var endX;
var endY;
var resultX;
var resultY;
var direction;

canvas.addEventListener("touchstart",function(e){
    
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
    e.preventDefault()
});

canvas.addEventListener("touchend",function(e){
    
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    
    resultX = startX - endX
    resultY = startY - endY
    
    console.log(resultX)
    console.log(resultY)
    
    if (resultX<0 && direction != 'left'){
        direction = 'right'
        console.log("prawo")
    }
    else if (resultX>0 && direction != 'right'){
        direction = 'left'
        console.log("lewo")
    }
    else if(resultY>0 && direction != 'down'){
        direction = 'up'
        console.log("gora")
    }
    else if(resultY<0 && direction != 'up'){
        direction = 'down'
        console.log("dol")
    }
    e.preventDefault()
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