let btnStart = document.querySelector(".start"),
    infoScore = btnStart.nextElementSibling,
    scoreUpdate = document.querySelector(".score"),
    canvas = document.getElementById('snakeArea'),
    ctx = canvas.getContext('2d'),
    snakeSize = 15, 
    w = 360,
    h = 360,
    snake,
    food,
    score = 0,
    score_info = 0;
//var speed_info = 1
//var speed =100;

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
        let length = 5;
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

        for(let i = 0; i < snake.length; i++) {
            lineSnake(snake[i].x, snake[i].y);
        } 

        foodToEat(food.x, food.y);
    
        scoreUpdate.innerText = score ;
    }

    let createFood = function() {
        food = {
            x: Math.floor((Math.random() * 20) + 1),
            y: Math.floor((Math.random() * 20) + 1)
            
           
            
        }
       

        for (let i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 20) + 1);
                food.y = Math.floor((Math.random() * 20) + 1);
            }
        }
    }
      let hitSnake = function(x, y, array) {
          for(let i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
          } 
          return false;
      }

      let init = function(){
          direction = 'right';
          startSnake();
          createFood();
          gameloop = setInterval(mainDraw, 100);
      }
      return {
          init : init
      }; 
}());

let btn = document.querySelector('.start');
btn.addEventListener("click", function(){ 
    btnStart.classList.toggle("hide");
    infoScore.classList.toggle("hide");
    allDraw.init();
});

//for mobile to touch
let startX, startY, endX, endY, resultX, resultY, direction;

canvas.addEventListener("touchstart",function(e){
    e.preventDefault()
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
   
});

canvas.addEventListener("touchend",function(e){
    e.preventDefault()
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    
    resultX = startX - endX
    resultY = startY - endY
  
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