/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'

export default class extends Phaser.State {
  init() {
    var paddle1;
    var paddle2; 
  }

  preload() { }

  create() {
    this.paddle1 = this.create_paddle(0,this.game.world.centerY);
    this.paddle2 = this.create_paddle(this.game.world.width - 16,this.game.world.centerY);
  }

  update(){
    this.control_paddle(this.paddle1,this.game.input.y);
  }

  create_paddle(x,y) {
    var paddle = this.game.add.sprite(x,y,"paddle");
    paddle.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    return paddle;
  }

  control_paddle(paddle,y){
    paddle.y = y;

    if(paddle.y < paddle.height/2){
      paddle.y = paddle.height/2;
    } 

    else if (paddle.y > this.game.world.height - paddle.height / 2){
      paddle.y - this.game.world.height - paddle.height /2;
    }
  }


}
