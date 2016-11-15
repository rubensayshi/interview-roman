/* global mypackage */
angular.module('myApp', []);

angular.module('myApp').controller('MyAppMainController', function($scope, $timeout, $interval) {
    // used to update progress bar width %
    $scope.progress = 0;
    // used to move the ping indicator
    $scope.ping = 0;
    // when true shows the progress bar
    $scope.working = false;
    // when not null shows the result
    $scope.result = null;

    // this interval represents other things happening while the ChainOfTasks is being executed
    //  it clearly demonstrates the browser blocking completely
    $interval(function() {
        $scope.ping = ($scope.ping + 1) % 100;
    }, 200);

    // executed when gogo button is clicked
    $scope.gogo = function() {
        // reset the result to hide it
        $scope.result = null;
        // reset the progress
        $scope.progress = 0;
        // set working to true to display progress bar
        $scope.working = true;

        // start the chain of tasks
        mypackage.ChainOfTasks(2)
            // update progress when notified through the promise
            .progress(function(progress) {
                console.log((new Date), progress);

                // wrap in $timeout because the promise we're using isn't an angular promise
                //  and we need to trigger an update of the DOM
                $timeout(function() {
                    $scope.progress = progress;
                });
            })
            .then(function(i) {
                // wrap in $timeout because the promise we're using isn't an angular promise
                //  and we need to trigger an update of the DOM
                $timeout(function() {
                    // set the result
                    $scope.result = i;
                    // set working to false to hide the progress bar
                    $scope.working = false;
                });
            });
    };
});
