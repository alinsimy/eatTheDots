var gameContext = (function() {

    var canvas;
    var ball;
    var world;
    var score;
    var dots = [];

    var _world = function() {
        this.worldSize = {
            min: -5000,
            max: 5000
        };
        this.maxNumberOfDots = 1000;
        this.radius = 10;

        this.createWorld = function(canvas) {
            //TODO Here will be implemented the createion of the world (all the dots) / with the help of getRandomInt()
            var curentNumber = 0;
            while (this.maxNumberOfDots > curentNumber) {

                var canBeCreated = true;
                var dot = new _dot(getRandomInt(this.worldSize.min, this.worldSize.max), getRandomInt(this.worldSize.min, this.worldSize.max), this.radius, canvas);

                //TODO make a faster colision detection (this take to long) 
                for (var i = dots.length - 1; i >= 0; i--) {
                    if (detectCirclesCollision(dot, dots[i])) {
                        canBeCreated = false;
                    }
                }

                if (canBeCreated) {
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

    function _dot(x, y, radius, canvas) {
        this.context = canvas.context;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.draw = function() {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = 'green';
            this.context.fill();
        };
    }

    function _score(canvas) {
        this.context = canvas.context;
        this.score = 0;
        this.x =  20 ;
        this.y = 30;
        this.context.fillStyle = "#000000";
        this.context.font = "20px Georgia";
        this.draw = function() {
            this.context.fillStyle = "#000000";
            this.context.font = "20px Georgia";
            this.context.fillText("Score: " + this.score, this.x, this.y);
        }
    }

    function move(byX, byY) {
        canvas.deleteCanvasElements();
        
        for (var i = 0; i < dots.length; i++) {

            if (detectCirclesCollision(ball, dots[i])) {
                dots.splice(i, 1);
                score.score += dots[i].radius;
            }

            dots[i].x += - byX / 5;
            dots[i].y += - byY / 5;
            dots[i].draw();
        }

        ball.draw();
        score.draw();
    }

    function createGame() {
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
        move: move
    }
})();



jQuery(document).ready(function($) {
    gameContext.startGame();
    window.addEventListener("deviceorientation", on_device_orientation);
});

function on_device_orientation(event) {
    gameContext.move(event.gamma, event.beta);
}

    