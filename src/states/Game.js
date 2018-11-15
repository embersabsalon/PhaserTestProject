/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'

export default class extends Phaser.State {
  init() {
    var paddle1;
    var paddle2; 
    
    var ball_launched;
    var ball_velocity;
    var ball;

    var score1_text;
    var score2_text;

    var score1;
    var score2;
  }

  preload() { }

  create() {
    this.ball_launched = false;
    this.ball_velocity = 400;
    this.paddle1 = this.create_paddle(0,this.game.world.centerY);
    this.paddle2 = this.create_paddle(this.game.world.width - 8,this.game.world.centerY);
    this.ball = this.create_ball(this.game.world.centerX,this.game.world.centerY);

    this.game.input.onDown.add(this.launch_ball,this);

    this.score1_text = this.game.add.text(128,128,'0',{
      font: "64px Helvetica",
      fill: "#ffffff",
      align: "center"
    });

    this.score2_text = this.game.add.text(this.game.world.width - 128,128,'0',{
      font: "64px Helvetica",
      fill: "#ffffff",
      align: "center"
    });

    this.score1 = 0;
    this.score2 = 0;
  }

  update(){
    this.score1_text.text = this.score1;
    this.score2_text.text = this.score2;

    this.control_paddle(this.paddle1,this.game.input.y);
    this.game.physics.arcade.collide(this.paddle1,this.ball);
    this.game.physics.arcade.collide(this.paddle2,this.ball);

    if(this.ball.body.blocked.left){
      this.score2+=1;
      console.log(this.score2);
    }
    else if(this.ball.body.blocked.right){
      this.score1+=1;
      console.log(this.score1);
    }

    this.paddle2.body.velocity.setTo(this.ball.body.velocity.y);
    this.paddle2.body.velocity.x = 0;
    this.paddle2.body.maxVelocity.y = 250;

    
  }

  create_paddle(x,y) {
    var paddle = this.game.add.sprite(x,y,"paddle");
    paddle.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable = true;
    paddle.scale.setTo(0.5,0.5);
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

  create_ball(x,y){
    var ball = this.game.add.sprite(x,y,"ball");
    ball.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
  }

  launch_ball(){
    if(this.ball_launched){
      this.ball.x = this.game.world.centerX;
      this.ball.y = this.game.world.centerY;
      this.ball.velocity.setTo(0,0);
      this.ball_launched = false;
    }
    else{
      this.ball.body.velocity.x = -this.ball_velocity;
      this.ball.body.velocity.y = this.ball_velocity;
      this.ball_launched = true;
    }
  }


}
