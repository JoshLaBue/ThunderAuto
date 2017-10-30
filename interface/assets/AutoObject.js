//ThunderAuto Type-Objects

var ModeSteps = [];

//List Handler. Manages steps internally.
function listHandler(list) {
  this.list = list;
  this.addStep = function(step) {
    console.log('Added step ' + step);
    ModeSteps.push(step);
    refreshTable();
  };
  this.clearList = function(confirmed) {
    var message = 'Mode reset!';
    var delay = 2000;
    if(window.event.shiftKey) {
      confirmed = true;
      if(Math.floor(Math.random() * 10) + 1 == 9) {
        meme = true;
        delay = 7000;
        message = "Wow. You're so edgy, you didn't even feel like confirming a reset. Just for that, I'm gonna reset your mode at a random time. Then <b>you'll</b> see how it feels to have your confirmation skipped."
      }
    }
    if(confirmed == false) {
      $('#confirmClear').modal('show');
    }
    else if(confirmed == true) {
      ModeSteps = [];
      refreshTable();

      document.getElementById('modeName').value = '';
      document.getElementById('listAlert').innerHTML = '<div class="alert alert-danger" id="clearAlert" role="alert">' + message + '</div>';
      $('#clearAlert').first().hide().slideDown(400).delay(delay).slideUp(400, function(){$(this).remove()});
    }
  };
  this.exportList = function(confirmed) {
    if(window.event.shiftKey) confirmed = true;
    if(confirmed == false) {
      $('#confirmExport').modal('show');
    }
    else if (confirmed == true) {
      var steps = JSON.stringify(ModeSteps);
      var a = document.createElement('a');
      var file = new Blob([steps], {type:' application/json'});
      a.href = URL.createObjectURL(file);
      var name;
      if(document.getElementById('modeName').value == '') name = 'AutoMode'
      else name = document.getElementById('modeName').value;
      a.download = name + '.json';
      a.click();
    }
  };
  this.importList = function(confirmed) {
    if(window.event.shiftKey) confirmed = true;
    if(confirmed == false) {
      $('#confirmImport').modal('show');
    }
    else if(confirmed == true) {
      var input = document.getElementById('inputModeFile');
      input.click();
    }
  }
  this.removeStepIndex = function(index) {
    ModeSteps.splice(index, 1);
    animateHideListItem(index);
  }
  this.moveStep = function(index, direction) {
    if(direction == 'up') {
      var tempItem = ModeSteps[index];
      ModeSteps.splice(index, 1);
      ModeSteps.splice(index-1,0,tempItem);
    }
    else if(direction == 'down') {
      var tempItem = ModeSteps[index];
      ModeSteps.splice(index, 1);
      ModeSteps.splice(index+1,0,tempItem);
    }
    refreshTable();
  }
}

function driveType(direction, speed, distance, comment) {
  this.type = 'Drive';
  this.direction = direction;
  this.speed = speed;
  this.distance = distance;
  this.comment = comment;
  this.params = [direction,speed,distance];
}
function visionType(action, comment) {
  this.type = 'Drive';
  this.action = action;
  this.comment = comment;
  this.params = ['Vision', action];
}
function turnType(angle, comment) {
  this.type = 'Turn';
  this.angle = angle;
  this.comment = comment;
  this.params = [angle];
}
function gearType(action, comment) {
  this.type = 'Gear'
  this.action = action;
  this.comment = comment;
  this.params = [action];
}
