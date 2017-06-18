var gameContext = (function() {

    var game;

    var gameContext = function() {
        this.canvas = document.getElementById("canvas"),
        this.initGame =  function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context = this.canvas.getContext("2d");
        }
    }

    function createGame() {
        game = new gameContext();
        game.initGame();
    }

    return {
        startGame: createGame
    }
})();


jQuery(document).ready(function($) {
    gameContext.startGame();
});