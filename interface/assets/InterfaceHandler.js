function refreshTable() {
  stepList = [];
  var table = document.getElementById('list');
  table.innerHTML = '';
  for(var i = 0; i<ModeSteps.length; i++) {
    addListValue(ModeSteps[i].type, ModeSteps[i].params, ModeSteps[i].comment);
  }
}

function addListValue(type, value, comment) {
  var tempItem = {};

  tempItem.type = type;
  tempItem.value = value;
  tempItem.comment = comment;

  stepList.push(tempItem);

  displayListItem(tempItem);
}

function removeListItem(index) {
  handler.removeStepIndex(index - 1);
}

function moveListItem(index, direction) {
  handler.moveStep(index - 1, direction);
}

function displayListItem(tempItem) {
  var list = document.getElementById('list');
  var node = document.createElement('tr');
  node.setAttribute('id', 'listIndex-' + stepList.length);
  var indexItem = document.createElement('td');
    var bold = document.createElement('b');
    var index = document.createTextNode(stepList.length);
    bold.appendChild(index);
    var upButton = document.createElement('i');
    upButton.setAttribute('class', 'fa fa-angle-up');
    if(stepList.length !== 1) upButton.setAttribute('onclick', "moveListItem('" + stepList.length + "', 'up')");
    var downButton = document.createElement('i');
    downButton.setAttribute('class', 'fa fa-angle-down');
    downButton.setAttribute('onclick', "moveListItem('" + stepList.length + "', 'down')");
    indexItem.appendChild(upButton);
    indexItem.appendChild(bold);
    indexItem.appendChild(downButton);
  var typeItem = document.createElement('td');
    var type = document.createTextNode(tempItem.type);
    typeItem.appendChild(type);
  var valueItem = document.createElement('td');
    var value = document.createTextNode(tempItem.value);
    valueItem.appendChild(value);
  var commentItem = document.createElement('td');
    var comment = document.createTextNode(tempItem.comment);
    commentItem.appendChild(comment);
    var deleteItem = document.createElement('td');
    var index = stepList.length;
      deleteItem.innerHTML = '<i class="fa fa-times" onclick="removeListItem(' + index + ')"></i>';
  node.appendChild(indexItem);
  node.appendChild(typeItem);
  node.appendChild(valueItem);
  node.appendChild(commentItem);
  node.appendChild(deleteItem);
  list.appendChild(node);
}

function animateHideListItem(index) {
  $('#listIndex-' + (index+1)).fadeOut(400, function() {
    refreshTable();
  });
}

function refreshParams() {
  document.getElementById('driveParams').style = 'display:none';
  document.getElementById('gearParams').style = 'display:none';
  document.getElementById('turnParams').style = 'display:none';
  document.getElementById('visionParams').style = 'display:none';
  switch(currentStepType) {
    case 'Drive':
      document.getElementById('driveParams').style = 'display:block';
      break;
    case 'Gear':
      document.getElementById('gearParams').style = 'display:block';
      break;
    case 'Pivot-Turn':
      document.getElementById('turnParams').style = 'display:block';
      break;
    case 'Drive (Vision)':
      document.getElementById('visionParams').style = 'display:block';
      break;
  }
}

$('#stepType').on('change', function(){
  var selected = $(this).find('option:selected').val();
  currentStepType = selected;
  refreshParams();
});

var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('alertNative', function(state) {
  isNative = true;
  becomeNative();
});
