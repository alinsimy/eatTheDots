var gameContext = (function() {

    var game;
    var ball;

    var gameContext = function() {
        
        this.canvas = document.getElementById("canvas");

        this.initGame =  function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context = this.canvas.getContext("2d");
        };

        this.deleteCanvasElements =  function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function ball(radius) {
        this.context = game.context;
        this.radius = radius;
        this.x = game.canvas.width / 2;
        this.y = game.canvas.height / 2;
        
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
        game = new gameContext();
        game.initGame();

        ball = new ball(30);
        ball.update();
    }

    return {
        startGame: createGame
    }
})();


jQuery(document).ready(function($) {
    gameContext.startGame();
});