import { gameboard, isOutsideBoard } from './Board/index.js';
import {SNAKE_SPEED, draw as snakeDraw, update as snakeUpdate, getSnakeHead, hasSelfCollision as hasSnakeSelfCollision} from './Snake/index.js'
import {draw as foodDraw, update as foodUpdate} from './Food/index.js'

let lastTimeRender = 0;


//current Time -> miliseconds
function main(currentTime){
  if(checkGameOver()){
    if(confirm('Você perdeu o jogo!')){
      window.location.reload();
    }else{
      window.requestAnimationFrame(main);
    }
    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;

  if(secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastTimeRender = currentTime;

  update(); // atualização quando ocorrer uma colisão com a cobra ou a food

  draw(); //desenha a comida / cobra
}

function update(){
  gameboard.innerHTML = '';
  snakeUpdate();
  foodUpdate();
};

function draw(){
  snakeDraw();
  foodDraw();
};

//encerrar o jogo caso perca
function checkGameOver(){
  //verificar se a posição da cobra esta fora do board
  return isOutsideBoard(getSnakeHead()) || hasSnakeSelfCollision();
}

window.requestAnimationFrame(main)