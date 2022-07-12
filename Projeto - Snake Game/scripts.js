CANVAS = document.getElementById("gameCanvas");
CONTEXT = CANVAS.getContext("2d");
SCORE = document.getElementById("score");
SNAKE_SIZE = document.getElementById("size");

//size relation
CANVAS.width = CANVAS.height = 400;
grid_size = tile_count = 20;

//snake and apple start position
snake_x = snake_y = 10;
apple_x = apple_y = 15;
//tail initial size
snake_tail_initial = 3
snake_tail = snake_tail_initial;
snake_trail = [];

score = 0

//move direction (stopped)
x_velocity = y_velocity = 0;
snake_speed = 4

document.addEventListener("keydown",keyPush);
setInterval(updateGame,1000/snake_speed);

function updateGame() {
    //move
    snake_x += x_velocity;
    snake_y += y_velocity;
    //update score/size
    SCORE.innerHTML = "Score: " + score;
    SNAKE_SIZE.innerHTML = "Size: " + snake_tail;

    wrapScreen();
    drawBrackground();
    drawApple();
    drawSnake();
}
//screen wrap
function wrapScreen(){
    if(snake_x < 0) {
        snake_x = tile_count - 1;
    }
    if(snake_x > tile_count - 1) {
        snake_x = 0;
    }
    if(snake_y < 0) {
        snake_y = tile_count - 1;
    }
    if(snake_y > tile_count - 1) {
        snake_y = 0;
    }
}
//background
function drawBrackground(){
    CONTEXT.fillStyle = "black";
    CONTEXT.fillRect(
            0,
            0,
            CANVAS.width,
            CANVAS.height
    );
}
//apple
function drawApple(){
    CONTEXT.fillStyle = "red";
    CONTEXT.fillRect(
        apple_x * grid_size,
        apple_y * grid_size,
        grid_size - 2,
        grid_size - 2
    );
}
//snake
function drawSnake(){
    CONTEXT.fillStyle = "lime";
    for(let i = 0; i < snake_trail.length; i++) {
        CONTEXT.fillRect(
                snake_trail[i].x * grid_size,
                snake_trail[i].y * grid_size,
                grid_size - 2,
                grid_size - 2
        );

        //eat own body
        if(snake_trail[i].x ==snake_x && snake_trail[i].y == snake_y) {
            snake_tail = snake_tail_initial;
            score = 0
        }
    }

    snake_trail.push({x:snake_x, y:snake_y});

    while(snake_trail.length > snake_tail) {
        snake_trail.shift();
    }

    //eat apple
    if(apple_x == snake_x && apple_y == snake_y) {
        snake_tail++;
        score++;
        apple_x, apple_y = placeNewApple();
    }
}

//prevents apple from spawning on snake body
function placeNewApple(){
    apple_x = Math.floor(Math.random() * tile_count);
    apple_y = Math.floor(Math.random() * tile_count);
    for(let i = 0; i < snake_trail.length; i++){
        if(apple_x == snake_trail[i].x || apple_y == snake_trail[i].y){
            placeApple()
        } else {
            return apple_x, apple_y
        }
    }
}


//move keys
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            if(x_velocity != 1){
                x_velocity = -1; y_velocity = 0;
            }
            break;
        case 38:
            if(y_velocity != 1){
            x_velocity = 0; y_velocity = -1;
            }
            break;
        case 39:
            if(x_velocity != -1){
                x_velocity = 1; y_velocity = 0;
            }
            break;
        case 40:
            if(y_velocity != -1){
            x_velocity = 0; y_velocity = 1;
            }
            break;
    }
}