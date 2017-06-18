var gameContext = (function() {

    var canvas;
    var ball;
    var world;
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
                    curentNumber++;
                }
                
            } 
        };

        this.update = function() {
           for (var i = dots.length - 1; i >= 0; i--) {
                dots[i].update();
            }
        }
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
        }
    }

    function _ball(radius, canvas) {
        this.context = canvas.context;
        this.radius = radius;
        this.x = canvas.canvas.width / 2;
        this.y = canvas.canvas.height / 2;
        
        this.update = function() {
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

        this.update = function() {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = 'green';
            this.context.fill();
        };
    }

    function move(byX, byY) {
        canvas.deleteCanvasElements();
        ball.update();

        for (var i = 0; i < dots.length; i++) {
            dots[i].x += - byX / 5;
            dots[i].y += - byY / 5;
            dots[i].update();
        }
        
    }

    function createGame() {
        canvas = new _canvasObject();
        canvas.drawCanvas();

        ball = new _ball(30, canvas);
        ball.update();

        world = new _world();
        world.createWorld(canvas);
        world.update();
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
    var beta = event.beta;
    var gamma = event.gamma;
    gameContext.move(gamma, beta);
}

    