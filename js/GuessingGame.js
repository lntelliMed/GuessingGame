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
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
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

//  $(document).ready(function(){
//     var game = newGame();    
//     $("#submit").on("click", function(event){
//         console.log("Submit button was clicked!");        
//         processUserValue();
//     });

//     $("#players-input").on("keyup", function(event){
//         //console.log(event.which);
//         if(event.which === 13){
//             console.log("Enter was pressed!");                    
//             processUserValue();
//         }
//     });

//     function processUserValue(){
//         var usersValue = +$("#players-input").val();
//         $("#players-input").val("");
//         console.log(usersValue);
//         game.playersGuessSubmission(usersValue);
//     }
//  });

function makeAGuess(game) {
    var guess = $('#players-input').val();    
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    console.log(output);
    $("#title").text(output);

    if(output === "You Win!" || output === "You Lose."){
        $("#submit").prop( "disabled", true );
        $("#hint").prop( "disabled", true );        
        $("#players-input").prop( "disabled", true );                
        $("#subtitle").text("Press the Reset button!");                
    } else if(output === "You have already guessed that number."){
        $("#subtitle").text("Guess again!");                
    } else if(game.isLower()){
        $("#subtitle").text("Guess a higher number!");
    } else {
        $("#subtitle").text("Guess a lower number!");                
    }
    
    $(".guess").each(function(i){
        $(this).text(game.pastGuesses[i]);
    });

}

$(document).ready(function() {
    var game = new Game();
    //var game = newGame();    
    var initialTitle = $("#title").text();
    var initialSubTitle = $("#subtitle").text();
    var initialGuessList = $(".guess:first").text();
    

    $('#submit').click(function(e) {
       makeAGuess(game);
    });

    $('#players-input').keypress(function(event) {
        if (event.which === 13) {            
           makeAGuess(game);
        }
    });

    $('#reset').click(function(e) {
        $("#submit").prop( "disabled", false );
        $("#hint").prop( "disabled", false );        
        $("#players-input").prop( "disabled", false );                
        $("#title").text(initialTitle); 
        $("#subtitle").text(initialSubTitle);  
        $(".guess").each(function(i){
            $(this).text(initialGuessList);
        });            
        game = new Game();          
    });

    $('#hint').click(function(e) {
        $("#title").text("The correct answer is one of the following: " + game.provideHint());
    });
});