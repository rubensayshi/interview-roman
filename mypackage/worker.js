var HeavyTask = require('./lib/heavy-task.js');

onmessage = function(event) {
  postMessage(HeavyTask(event.data ? event.data : 0));
};
