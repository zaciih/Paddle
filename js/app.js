$(function(){

  var ball_interval;
  var progRunning = false;

  var time_interval;

  var speed_up_interval;


//target timer
  var milisec_timer = $("#mil_seconds");
  var milisec_count_up = milisec_timer.html();
  var sec_timer = $("#seconds");
  var sec_count_up = sec_timer.html();
  var min_timer = $("#minutes");
  var min_count_up = min_timer.html();

//target the ball object
  var ball = $("#ball");

//target the paddle object
  var paddle = $("#paddle");

//score system
  var score = $("#score")
  var score_up = score.html();

//target container
  var container = $("#container");

//set the inital position of the ball
  var posx = 0;
  var posy = 0;

//set ball direction
  var direction_x = "+"
  var direction_y = "+"

//friction
  var friction = 0;
  var frictionspeed = 0;
  var friction_increase = 5;

//random variable
  // var random = Math.random()*2;

//gravity
  var gravity = 0.1;
  var gravityspeed = 0;
  var grav_decrease = -5;

  $("#btn").click(function(){
    if (progRunning) {
      $("#btn").html("Resume");
      //stop the ball
      progRunning = false;
      $("#restart_btn").hide();
      clearInterval(ball_interval);
      clearInterval(time_interval);
    } else {
        // $("#restart_btn").show();
        $("#btn").html("Pause");

        //mouse move on start paddle follows cursor
        $("#container").mousemove(function(e) {
            paddle.data("dragging", true);
            paddle.css("left", e.pageX - paddle.width()-260);
            paddle.css("top", e.pageY - paddle.height()-150);
        });

        //start the ball
        progRunning = true;
        ball_interval = setInterval(function(){
        //find coordinates of the ball and container edges
          var ball_left = ball.offset().left
          var ball_right = ball_left + ball.width();
          var ball_top = ball.offset().top;
          var ball_bottom = ball_top + ball.height();

          var container_left = container.offset().left
          var container_right = container_left + container.width();
          var container_top = container.offset().top;
          var container_bottom = container_top + container.height();

          //findcoordinates of the paddle
          var paddle_top = paddle.offset().top;
          var paddle_bottom = paddle_top + paddle.height();
          var paddle_left = paddle.offset().left
          var paddle_right = paddle_left + paddle.width();
        //if ball hits paddle bounce up
          if (ball_bottom >= paddle_top) {
            if (ball_top <= paddle_bottom) {
              if (ball_right > paddle_left) {
                if (ball_left < paddle_right) {
                  console.log("ball is on paddle");
                  direction_y = "-";                    frictionspeed = friction_increase;
                  gravityspeed = grav_decrease;
                  //if ball hits paddle add points
                  score.html(score_up);
                  score_up ++;
              }
            }
          }
        };

        //ball movement
          ball.css({
            'left': posx + "px",
            'top': posy + "px"
          });

        //ball direction X
          if (direction_x === "+" ) {
            frictionspeed += friction;
            posx+= frictionspeed;
          } else {
            frictionspeed += friction;
            posx-= frictionspeed;
          }
        //ball direction Y
          if (direction_y === "+" ) {
            gravityspeed += gravity;
            posy+= gravityspeed;
          } else {
            gravityspeed += gravity;
            posy+= gravityspeed;
          }

          wall_collision();

          //wall collisions
        function wall_collision(){
          if (ball_right >= container_right) {
            direction_x = "-";
            if (friction_increase > 0){
              friction_increase = friction_increase-0.01;
              // console.log(friction_increase);
          } else {
            friction_increase = 0.01
          }
          } else if (ball_left <= container_left) {
            direction_x = "+";
            if (friction_increase > 0){
              friction_increase = friction_increase-0.01;
              // console.log(friction_increase);
          } else {
            friction_increase = 0.01
          }
          }
          if (ball_bottom >= container_bottom){
            direction_y = "-";
            clearInterval(ball_interval);
            clearInterval(time_interval);
            $("#btn").hide();
            $("#restart_btn").show();
          //gravity and friction decreases per hit
            if (grav_decrease < 0){
            grav_decrease = grav_decrease+0.1;
          } else {
            grav_decrease = 0
            posy = container.height() - ball.height();
          }
            if (friction_increase > 0){
              friction_increase = friction_increase-0.01;
          } else {
            friction_increase = 0.0
          }
            frictionspeed = friction_increase;
            gravityspeed = grav_decrease;
          } else if (ball_top <= container_top) {
             direction_y = "+";
           }
         };
        }, 10)
      //timer interval setup
        time_interval = setInterval(function(){
          milisec_count_up ++;
          milisec_timer.html(":" +milisec_count_up);
          if (min_count_up <= 9) {
            min_timer.html("0" + min_count_up + ":");
          } else {
            min_timer.html(min_count_up + ":");
            }
          if (sec_count_up == 60) {
            sec_count_up = 0;
            min_count_up ++;
          }
          if (sec_count_up <= 9) {
            sec_timer.html("0" +sec_count_up)
          } else {
          sec_timer.html(sec_count_up)
            }
          if (milisec_count_up == 99) {
            milisec_count_up = 0;
            sec_count_up ++;
          }
        }, 10);
        speed_up_interval = setInterval(function(){
          friction_increase +=0.25;
          grav_decrease -=0.2;
          console.log(friction_increase);
        },5000);
      }
  })
//restart button
  $("#restart_btn").click(function(){
  //reloads the page - resestting the game
    document.location.reload();
    // posx = 0;
    // posy = 0;
    // friction = 0;
    // frictionspeed = 0;
    // friction_increase = 5;
    // gravity = 0.1;
    // gravityspeed = 0;
    // grav_decrease = -5;
    // milisec_count_up = 0;
    // sec_count_up = 0;
    // min_count_up = 0;
    // score_up = 0;
    // score.html(0);
  })

});
