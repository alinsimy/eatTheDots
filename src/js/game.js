var gameContext = (function() {

    var canvas;
    var ball;
    var world;

    var world = function() {
        this.worldSize = {
            maxSizeX: 1000,
            maxSizeY: 1000
        };
        this.maxNumberOfDots = 1000000;

        this.createWorld = function() {
            //TODO Here will be implemented the createion of the world (all the dots) / with the help of getRandomInt()
        }
    }

    var canvasObject = function() {
        
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

    function ball(canvas, radius) {
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

    function createGame() {
        canvas = new canvasObject();
        canvas.drawCanvas();

        ball = new ball(canvas, 30);
        ball.update();
    }

    return {
        startGame: createGame
    }
})();


jQuery(document).ready(function($) {
    gameContext.startGame();
});