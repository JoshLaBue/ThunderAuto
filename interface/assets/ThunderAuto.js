//ThunderAuto
//Created by Josh LaBue

/*
To add a new type:
-Add an option for it in the dropdown selector
-Create a type in AutoObject
In addCurrentStep:
  -If it has numerical parameters, add it to the check list
  -Create the object after verification
  -Reset any dropdowns to a default value
Add param toggles in InputHandler
*/

var stepList = [];
var currentStepType = 'Drive';
var handler = new listHandler(stepList);

refreshParams();
refreshTable();

processURLParams();

var isNative = false;

if(isNative == true) {
  becomeNative();
}

function becomeNative() {
  redUI();
  document.getElementById('windowButtonWrapper').style = 'padding-right:15px; display:block';
}

function displayHelp() {
  $('#expandHint').hide();
  $('#help').slideDown();
}
function setModeName() {
  $('#modeName').focus();
}

var checkValues = [];
function addCurrentStep() {
  var verify = true;
  var addedValue = false;
  checkValues = [];

  if(currentStepType == 'Drive') {
    checkValues.push(document.getElementById('driveParamDistance'));
    checkValues.push(document.getElementById('driveParamSpeed'));
  }
  else if(currentStepType == 'Pivot-Turn') {
    checkValues.push(document.getElementById('turnParamAngle'));
  }

  for(var i = 0; i<checkValues.length; i++) {
    if(checkValues[i].value == '' || checkValues[i].value == undefined) {
      verify = false;
      checkValues[i].parentElement.classList.add('has-danger');
    }
    else {
      checkValues[i].parentElement.classList.remove('has-danger');
    }
  }

  if(verify == true) {
    if(currentStepType == 'Drive') {
      var step = new driveType(document.getElementById('driveParamDirection').value, document.getElementById('driveParamSpeed').value,document.getElementById('driveParamDistance').value, document.getElementById('stepComment').value);
      handler.addStep(step);
      addedValue = true;
    }
    else if(currentStepType == 'Gear') {
      var step = new gearType(document.getElementById('gearParamType').value, document.getElementById('stepComment').value);
      handler.addStep(step);
      addedValue = true;
    }
    else if(currentStepType == 'Drive (Vision)') {
      var step = new visionType(document.getElementById('visionParamType').value, document.getElementById('stepComment').value);
      handler.addStep(step);
      addedValue = true;
    }
    else if(currentStepType == 'Pivot-Turn') {
      var step = new turnType(document.getElementById('turnParamAngle').value, document.getElementById('stepComment').value);
      handler.addStep(step);
      addedValue = true;
    }
    if(addedValue == true) {
      var params = document.getElementsByClassName('form-control');
      for(var i = 0; i<params.length; i++) {
        document.getElementsByClassName('form-control')[i].value = '';
      }
      document.getElementById('stepType').value = 'Drive';
      document.getElementById('driveParamDirection').value = 'Forward';
      document.getElementById('gearParamType').value = 'Open';
      document.getElementById('visionParamType').value = 'Forward';
      currentStepType = 'Drive';
      refreshParams();
      $('#submitBtn').focus();
    }
  }
}
