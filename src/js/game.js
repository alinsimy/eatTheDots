var gameContext = (function() {
    var gameState;
    var bestScore;
    var canvas;
    var ball;
    var world;
    var score;
    var dots = [];

    var $onCanvasElements = $(".onCanvasElements");

    var gameStates = {
        play: 1,
        gameOver: 0
    };

    var dotsType = {
        safe: "safe",
        danger: "danger"
    };

    var radiusSizes = {
        min: 10,
        max: 25
    };  

    var worldSize = {
        min: -2000,
        max: 2000
    };

    var maxNumberOfDots = 1000;

    var _world = function() {
        
        this.createWorld = function(canvas) {
            var curentNumber = 0;
            while (maxNumberOfDots > curentNumber) {

                var dotCanBeCreated = true;

                //Add different types of dots
                if (curentNumber % 5 == 0) {
                    var dot = new _dot(getRandomInt(worldSize.min, worldSize.max), getRandomInt(worldSize.min, worldSize.max), getRandomInt(radiusSizes.min, radiusSizes.max), dotsType.safe, canvas);
                } else {
                    var dot = new _dot(getRandomInt(worldSize.min, worldSize.max), getRandomInt(worldSize.min, worldSize.max), getRandomInt(radiusSizes.min, radiusSizes.max), dotsType.danger, canvas);
                }

                //TODO make a faster colision detection (this take to long) 
                for (var i = dots.length - 1; i >= 0; i--) {
                    if (detectCirclesCollision(dot, dots[i])) {
                        dotCanBeCreated = false;
                    }
                }

                if (dotCanBeCreated) {
                    dots.push(dot);
                    dot.draw();
                    curentNumber++;
                }
            } 
        };
    }

    var _canvasObject = function() {
        
        this.canvas = document.getElementById("canvas");

        this.drawCanvas =  function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context = this.canvas.getContext("2d");
        };

        this.deleteCanvasElements =  function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
    }

    function _ball(radius, canvas) {
        this.context = canvas.context;
        this.radius = radius;
        this.x = canvas.canvas.width / 2;
        this.y = canvas.canvas.height / 2;
        this.currentXPossition = canvas.canvas.width / 2;
        this.currentYPossition = canvas.canvas.height / 2;
        
        this.draw = function() {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "#37ce5a";
            this.context.fill();
            this.context.lineWidth = 5;
            this.context.strokeStyle = "#27913f";
            this.context.stroke();
        };
    }

    function _dot(x, y, radius, type, canvas) {
        this.context = canvas.context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = type;

        this.draw = function() {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

            if (this.type === dotsType.safe) {
                this.context.fillStyle = 'green';
                this.context.lineWidth = 5;
                this.context.strokeStyle = "#005d00";
                this.context.stroke();
            } else if(this.type === dotsType.danger) {
                this.context.fillStyle = 'red';
                this.context.lineWidth = 5;
                this.context.strokeStyle = "#c10000";
                this.context.stroke();
            }
            
            this.context.fill();
        };
    }

    function _score(canvas) {
        this.context = canvas.context;
        this.score = 0;
        this.x =  20 ;
        this.y = 30;

        this.draw = function() {
            this.context.fillStyle = "#000000";
            this.context.font = "20px Georgia";
            this.context.fillText("Score: " + this.score, this.x, this.y);
        }
    }

    function move(byX, byY) {

        if (gameState === gameStates.gameOver) {
            $onCanvasElements.show();
            return;
        }

        canvas.deleteCanvasElements();
        
        for (var i = 0; i < dots.length; i++) {

            if (detectCirclesCollision(ball, dots[i])) {
                if (dots[i].type === dotsType.safe) {
                    score.score += dots[i].radius;
                } else if (dots[i].type === dotsType.danger) {
                    score.score -= dots[i].radius * 2;
                }

                dots.splice(i, 1);
            }

            dots[i].x += - byX;
            dots[i].y += - byY;
            dots[i].draw();
        }

        ball.currentXPossition += byX;
        ball.currentYPossition += byY;

        // this is the test when the ball pass the world border
        if (ball.currentXPossition > worldSize.max) {
            move(-10, 0);
        } 
        if (ball.currentXPossition < worldSize.min) {
            move(10, 0);
        }
        if (ball.currentYPossition > worldSize.max) {
            move(0, -10);
        }
        if (ball.currentYPossition < worldSize.min) {
            move(0, 10);
        }   

        if (score.score < 0) {
            gameState = gameStates.gameOver;
            score.score = 0;
        }

        ball.draw();
        score.draw();
    }

    function resetGame() {
        dots = [];
        createGame();
        $onCanvasElements.hide();
    }

    function createGame() {
        gameState = gameStates.play;

        canvas = new _canvasObject();
        canvas.drawCanvas();

        ball = new _ball(30, canvas);
        ball.draw();

        world = new _world();
        world.createWorld(canvas);

        score = new _score(canvas);
        score.draw();
    }

    return {
        startGame: createGame,
        move: move,
        retry: resetGame
    }
})();



jQuery(document).ready(function($) {
    gameContext.startGame();
    window.addEventListener("deviceorientation", on_device_orientation);

    
});

function on_device_orientation(event) {
    gameContext.move(event.gamma / 3, event.beta / 3);
}