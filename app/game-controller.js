app.controller('GameController', function ($scope, $timeout, GameService) {

    $scope.card1;
    $scope.card2;
    $scope.attempts = 0;
    $scope.totalMatches = 0;
    $scope.deck = GameService.getDeck();

    // Functions for completion of a turn
    $scope.selectCard = function (card) {
        if (card.show === true) {
            return;
        }
        //assign the cards to either card 1 or card 2...
        if (!$scope.card1) {
            card.show = true;
            $scope.card1 = card;
            return;
        } else if (!$scope.card2) {
            if (card === $scope.card1) {
                return;
            }
            card.show = true;
            $scope.card2 = card;
        } else {
            return;
        }

        if ($scope.card2.title === $scope.card1.title) {
            $scope.totalMatches++;
            checkVictory();
            resetCards();
        } else {
            $scope.Attempts++;
            $timeout(hideCards, 1000)
        }
    }
    // Flips cards back over to hide face
    function hideCards() {
        $scope.card1.show = false;
        $scope.card2.show = false;
        resetCards();
    }
    //Card reset 
    function resetCards() {
        $scope.card1 = '';
        $scope.card2 = '';
        $scope.attempts++;
    }
    // Checks if victory is achieved
    function checkVictory() {
        if ($scope.totalMatches === ($scope.deck.length / 2)) {
            $scope.victory = true;
        }
    }
    // Checks for card match
    function isMatch(card1, card2) {
        if (card1 === card2) {
            return true;
        } else {
            return false;
        }
    }
    // Resets Game
    $scope.reset = function (deck) {
        GameService.shuffle(deck);
        GameService.getDeck;
    }
});