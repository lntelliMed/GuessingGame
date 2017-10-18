function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function Game(){
      this.playersGuess = null;
      this.pastGuesses = [];
      this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
      return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.provideHint = function(){
    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}

Game.prototype.playersGuessSubmission = function(num){
    if(typeof num !== "number" || num < 1 || num > 100){
        throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        return "You Win!";
    }


    if(this.pastGuesses.indexOf(this.playersGuess) >= 0){
        return "You have already guessed that number.";
    }

    this.pastGuesses.push(this.playersGuess);
    
    if(this.pastGuesses.length >= 5){
        return "You Lose.";
    }        

    var theDifference = this.difference();

    if(theDifference < 10){
        return "You\'re burning up!";
    } else if(theDifference < 25){
        return "You\'re lukewarm.";
    } else if(theDifference < 50){
        return "You\'re a bit chilly.";
    } else if(theDifference < 100){
        return "You\'re ice cold!";
    }
}

function newGame(){
    return new Game();
}    

 