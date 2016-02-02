app.controller('GameController', function ($scope, $timeout, GameService) {

    $scope.card1;
    $scope.card2;
    $scope.attempts = 0;
    $scope.totalMatches = 0;                                 //Add to $scope a way to track number of guesses, and total matches
	
    //This is a freebie we are using the GameService to help keep our controller clean. 
    // The GameServie will be in charge of creating and shuffling the deck.
    $scope.deck = GameService.getDeck();


    $scope.selectCard = function (card) {
        if(card.show === true){
            return;
        }
        //assign the cards to either card 1 or card 2...
        if (!$scope.card1) {
            card.show = true;
            $scope.card1 = card;
            return;
        }else if(!$scope.card2){
            if(card === $scope.card1){
                return;
            }
            card.show = true;
           $scope.card2 = card; 
        }else{
            //get outta here!
            return;
        }
        
        if ($scope.card2.title === $scope.card1.title) {
            //increment pairs found.
            //clear card1, card2 with resetCard()
            //check to see if the game is over.
            $scope.totalMatches++;
            checkVictory();
            resetCards();
        }else{
            // increment attempts
            // flip cards //Problem... cards filp back over immediatly, so I can't see what I chose
            // clear card1, card2
            $scope.Attempts++;
            $timeout(hideCards,1000)
        }
        
        //Check to see if they have the same title...
        
        
        // if (card1 !== false) {
        //     card2 === card.title;
        // }
        // $timeout(function () {
        //     card1.show = false;
        //     card2.show = false;
        //     $scope.resetCards();
        // }, 1000);
    }
    
    function hideCards(){
       $scope.card1.show = false;
       $scope.card2.show = false;
       resetCards();
    }
        
    // $scope.choice.push(GameService.deck.card(card))
            
            
            
            
            
    //Write a function that accepts a card object on click.
    //Before assingning card1 or card2 check to make sure both cards are falsey 
    //This function should set either card1 or card2 depending on the order of selection
    //set card.show to true
    //if this is card 1 then return to short circut the function
    //if card2 and card2 isMatch of card 1 then resetCards() increase the totalMatches and checkVictory()
    //otherwise this is where we will need to use $timeout with a delay of 1000 
    //set card1.show = false
    //card2.show = false
    //resetCards() 
	
	
    //write a function to resetCards
    //it will empty the two card variables above and increase the number of attempts
    function resetCards() {
        $scope.card1 = '';
        $scope.card2 = '';
        $scope.attempts++;
    }
	
	
    //write a checkVictory function that will set $scope.victory = true if the totalMatches is half the length of the deck
    function checkVictory() {
        if ($scope.totalMatches === ($scope.deck.length / 2)) {
            $scope.victory = true;
        }
    }
    
    //write an isMatch function that accepts two cards and returns true or false if the card titles match.
    function isMatch(card1, card2) {
        if (card1 === card2) {
            return true;
        } else {
            return false;
        }
    }
	
    //Bonus: Write a function that can reset the game
    
    $scope.reset = function (deck) {
        GameService.shuffle(deck);
        GameService.getDeck;
    }

});

// app.service('Choice', function(){
//    var _list = [];
//    this.getList= function(){
//        return _list
//         }
    
// });