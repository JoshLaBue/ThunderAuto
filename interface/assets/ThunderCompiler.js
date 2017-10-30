//ThunderCompiler
//Takes JSON Array and Compiles into Native C++
var output;
function compile(steps) {
  output = '';
  addLine('// ' + document.getElementById('modeName').value);
  var name = document.getElementById('modeName').value.split(' ');
  var stringName = '';
  for(var i = 0; i<name.length; i++) {
    stringName = stringName + name[i];
    if(i<name.length-1) stringName = stringName + '_'
  }
  addLine('#ifndef ' + stringName.toUpperCase() + '_H_');
  addLine('#define ' + stringName.toUpperCase() + '_H_');
  addLine('');
  addLine('void ' + stringName + '() {');
    var stepIndex = 0;
    var needIndex = true;
    for(var i = 0; i<steps.length; i++) {
      needIndex = true;
      addLine('\tif(autoStep == ' + stepIndex + ') {');
      if(steps[i].type == 'Drive') {
        if(steps[i].params[0] == 'Vision') {
          if(steps[i].params[1] == 'Forward') addLine('\t\t_drive->Auto_Vision_Straight();');
          if(steps[i].params[1] == 'Turn') addLine('\t\t_drive->Auto_Vision_Turn();');
        } else {
          var speed = steps[i].speed;
          if(steps[i].direction == 'Reverse') speed = -speed;
          addLine('\t\t_drive->Auto_Straight(' + speed + ',' + steps[i].params[2] + ');');
        }
      }
      if(steps[i].type == 'Gear') {
        if(steps[i].action == 'Open') {
          addLine('\t\t_gear->Extend_Flippers();');
          addLine('\t\tif(_timer.Get() > 1) {');
          addLine('\t\t\tautoStep++;');
          addLine('\t\t}');
          stepIndex++;
          needIndex = false;
        }
        if(steps[i].action == 'Close') addLine('\t\t_gear->Retract_Flippers();');
      }
      if(steps[i].type == 'Turn') {
        addLine('\t\t_drive->Auto_Pivot_Turn(' + steps[i].angle + ');');
        addLine('\t\t_timer.Reset();');
      }
      if(needIndex == true) {
        addLine('\t\tautoStep++;');
        stepIndex++;
      }
      if(i == steps.length-1) {
        addLine('\t\tfinished = true;');
      }
      addLine('\t}');

      if(steps[i].type == 'Drive') {
        if(steps[i].params[1] == 'Turn') addStepConfirmation('\t', 'Is_Auto_Turn_Finished()', stepIndex, 0);
        else addStepConfirmation('\t', 'Is_Auto_Straight_Finished()', stepIndex, 0);
        stepIndex++;
      }
      if(steps[i].type == 'Turn') {
        addStepConfirmation('\t', 'Is_Auto_Turn_Finished()', stepIndex, 1);
        stepIndex++;
      }
    }
  addLine('}');
  addLine('');
  addLine('#endif');
  console.log('Compiled with output ' + output);
  downloadSource(output);
  document.getElementById('listAlert').innerHTML = '<div class="alert alert-success" id="loadAlert" role="alert">Compilation Successful!</div>';
  $('#loadAlert').first().hide().slideDown(400).delay(2000).slideUp(400, function(){$(this).remove()});
}

function addStepConfirmation(prefix, funcName, stepIndex, timer) {
  addLine(prefix + 'if(autoStep == ' + stepIndex + ') {');
  var timerCondition = '';
  if(timer !== 0) timerCondition = ' && _timer.Get() > ' + timer;
  addLine(prefix + '\tif(_drive->' + funcName + ' == true' + timerCondition + ') {');
  addLine(prefix + '\t\tautoStep++;');
  addLine(prefix + '\t}');
  addLine(prefix + '}');
}

function addLine(content) {
  output = output + content + '\n';
}

function downloadSource(content) {
  var a = document.createElement('a');
  var file = new Blob([content], {type:' text/plain'});
  a.href = URL.createObjectURL(file);
  var name = '';
  if(document.getElementById('modeName').value == '') name = 'AutoMode';
  else {
    nameArray = document.getElementById('modeName').value.split(' ');
    for(var i = 0; i<nameArray.length; i++) {
      name = name + nameArray[i];
    }
  }
  a.download = name + '.h';
  a.click();
}
