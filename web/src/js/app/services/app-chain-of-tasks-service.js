(function() {
  'use strict';
  
  angular.module('AppModule')
    .factory('ChainOfTasksService', function (Q, WorkerService) {
      
      /**
       * wrap executing HeavyTask in a promise
       *
       * @param i
       * @returns {q.Promise}
       */
      var doHeavyTask = function(i) {
        return Q.when(WorkerService.postMessage(i));
      };
  
      /**
       * execute HeavyTask 4 times over the input `i`
       *  and notify of the progress through the promise
       *
       * @param i
       * @returns {}
       */
      var ChainOfTasks = function(i) {
        var def = Q.defer();
        
        // Q.delay(1) to let the promise return before blocking
        Q.delay(1)
          .then(function() {
            // notify of start
            def.notify(ChainOfTasks.PROGRESS_START);
        
            // do the heavy task after a short delay
            return Q.delay(100).then(function() {
              return doHeavyTask(i);
            });
          })
          .then(function(i) {
            // notify we've finish step1
            def.notify(ChainOfTasks.PROGRESS_STEP1);
        
            // do the heavy task after a short delay
            return Q.delay(100).then(function() {
              return doHeavyTask(i);
            });
          })
          .then(function(i) {
            // notify we've finished step2
            def.notify(ChainOfTasks.PROGRESS_STEP2);
        
            // do the heavy task after a short delay
            return Q.delay(100).then(function() {
              return doHeavyTask(i);
            });
          })
          .then(function(i) {
            // notify we've finished step3
            def.notify(ChainOfTasks.PROGRESS_STEP3);
        
            // do the heavy task after a short delay
            return Q.delay(100).then(function() {
              return doHeavyTask(i);
            });
          })
          .then(function(i) {
            // notify we're done
            def.notify(ChainOfTasks.PROGRESS_DONE);
            // resolve with the result
            def.resolve(i);
          })
          // any caught error should be passed through the promise we returned
          .catch(function(e) { def.reject(e); });
    
        return {
          promise: def.promise,
          reject: def.reject
        };
      };
  
      /**
       * progress constants
       */
      ChainOfTasks.PROGRESS_START = 0;
      ChainOfTasks.PROGRESS_STEP1 = 25;
      ChainOfTasks.PROGRESS_STEP2 = 50;
      ChainOfTasks.PROGRESS_STEP3 = 75;
      ChainOfTasks.PROGRESS_DONE = 100;
  
      return {
        runChainOfTasks: ChainOfTasks
      }
    });
})();



