var SimpleTaskQueue = function(){
  var self = this;
  var queueHasStopped = true;
  var queueShouldRun = false;

  var tasks = [];

  self.addTask = function(task){
    tasks.push(task);
    if (queueHasStopped && queueShouldRun){
      self.run();
    }
  }

  self.isEmpty = function(){
    return (tasks.length === 0);
  }

  self.run = function(){
    queueShouldRun = true;
    queueHasStopped = false;
    self.runNextTask();
  };

  self.stop = function(){
    queueShouldRun = false;
  };


  self.runNextTask = function(){

    var task = tasks.shift();
    if (task === undefined){
      queueHasStopped = true;
    }
    else {
      console.log('executing one task');
      task(function(){
        setTimeout(function(){
          console.log('in the callback, task has finished');
          if (queueShouldRun){
            self.runNextTask();
          }
          else {
            queueHasStopped = true;
          }
        },0);              
      });
    }

  };

};


