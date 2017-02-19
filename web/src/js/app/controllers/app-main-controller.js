(function() {
  'use strict';
  
  angular.module('AppModule')
    .controller('AppMainController', function ($scope, $timeout, $interval, ChainOfTasksService) {
      // Flag, used to reject a current active chain of tasks when we click on the gogo button
      var _isChainOfTasks = null;
      
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
      $interval(function () {
        $scope.ping = ($scope.ping + 1) % 100;
      }, 200);
      
      // executed when gogo button is clicked
      $scope.gogo = gogoHandler;
      
      // Gogo handler
      function gogoHandler() {
        // reset the result to hide it
        $scope.result = null;
        // reset the progress
        $scope.progress = 0;
        // set working to true to display progress bar
        $scope.working = true;
        
        if (_isChainOfTasks) {
          _isChainOfTasks.reject();
        }
        
        // start the chain of tasks
        _isChainOfTasks = ChainOfTasksService.runChainOfTasks(2);
        
        // update progress when notified through the promis
        _isChainOfTasks.promise.progress(function (progress) {
            console.log((new Date), progress);
            $scope.progress = progress;
          })
          .then(function (i) {
            // set the result
            $scope.result = i;
            // set working to false to hide the progress bar
            $scope.working = false;
            // set flag to null, chain is finished
            _isChainOfTasks = null;
          });
      }
    });
})();




