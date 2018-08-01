function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.querySelectorAll("#board div");
    this.score = 0;
    this.divScore = document.querySelector("#score strong");
    console.log(this.divScore);

    this.position = function(x,y){
            return x + (y * 10);
    }

    this.showFurry = function(){
        this.hideVisibleFurry();
        this.board[ this.position(this.furry.x,this.furry.y) ].classList.add('furry');
    }

    this.hideVisibleFurry = function() {
        let divFurry = document.querySelector(".furry");
        if(divFurry) {
            divFurry.classList.remove("furry");
        }
    }

    this.showCoin = function(){
        this.board[ this.position(this.coin.x,this.coin.y) ].classList.add('coin');
    }


    this.moveFurry = function(){

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;

        }else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;

        }else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;

        }else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;

        }
        this.gameOver();

        if (this.isGameOver === true) {
            return;
        }

        this.showFurry();
        this.checkCoinCollision();

    }

    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });

    this.turnFurry = function(event) {
        var key = event.which;
        switch (key) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    }

    this.checkCoinCollision = function(){
        let furryPos = this.board[ this.position(this.furry.x,this.furry.y)];
        let coinPos = this.board[ this.position(this.coin.x,this.coin.y)];
        if (furryPos === coinPos){
            console.log("zderzenie");
            let divCoin = document.querySelector(".coin");
            divCoin.classList.remove("coin");
            this.score = this.score + 1;
            this.divScore.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.gameOver = function(){
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            this.isGameOver = true;
            this.hideVisibleFurry();
            clearInterval(this.idSetInterval);
            console.log("Game Over");

            this.createScoreBoard();
        }
    }

    this.createScoreBoard = function() {
        var scoreBoard = document.querySelector("#board");
        var score = document.createElement("div");
        var bannerScore = document.createElement("div");
        bannerScore.className = "bannerScore";
        let points;

        if (this.score === 1){
            points = "punkt";
        } else if (this.score >= 2 && this.score < 5){
            points = "punkty";
        } else {
            points = "punktów"
        }


        score.innerHTML = "Koniec gry<br>" + "Zdobyłeś <span>" + this.score + "</span> " + points;
        for (var i = 0; i < this.board.length; i++) {
            this.board[i].style.display = "none";
        }
        scoreBoard.appendChild(bannerScore);
        bannerScore.appendChild(score);
        this.retryGame();
    };

    this.retryGame = function() {
        var retryGame = document.createElement("button");
        retryGame.innerText = "Zagraj ponownie";
        var scoreBoard = document.querySelector("#board .bannerScore div");

        retryGame.addEventListener("click", function() {
            location.reload();
        });
        bannerBoard.appendChild(retryGame);
    };



    this.startGame = function(){
        this.idSetInterval =  setInterval(() => {
            this.moveFurry();
        }, 250);
    }



}
const game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

