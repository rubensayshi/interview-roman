(function() {
  'use strict';
  
  angular.module('AppModule')
    .factory('WorkerService', function (Q) {
      var path = './js/worker.js';
      
      function postMessage(data) {
        var def = Q.defer(),
            worker = new Worker(path);
        
        worker.def = def;
        
        worker.onmessage = function(event) {
          this.def.resolve(event.data);
          this.terminate();
        };
        
        worker.onerror = function (error) {
          this.def.reject(error);
          this.terminate();
        }
  
        worker.postMessage(data);
        
        return def.promise;
      }
      
      return {
        postMessage: postMessage
      }
    })
})();