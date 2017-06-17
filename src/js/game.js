var gameContext = (function() {

    var game = {
        canvas: document.getElementById("canvas"),
        initGame: function() {
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = screen.height * 2;
            this.context = this.canvas.getContext("2d");
        }
    }
    function createGame() {
        game.initGame();
    }

    return {
        startGame: createGame
    }
})();


jQuery(document).ready(function($) {
    gameContext.startGame();
});