//Read JSON file for importing
function readFile(e) {
  var files = e.target.files;
  var file = files[0];
  console.log(file.name);
  var reader = new FileReader();
  reader.onload = function(e) {
    ModeSteps = JSON.parse(e.target.result);
    refreshTable();

    var modeName = file.name.split('.');
    document.getElementById('modeName').value = modeName[0];

    document.getElementById('listAlert').innerHTML = '<div class="alert alert-success" id="loadAlert" role="alert">Auto Mode Imported!</div>';
    $('#loadAlert').first().hide().slideDown(400).delay(2000).slideUp(400, function(){$(this).remove()});
  }
  reader.readAsText(file);
}

window.onkeyup = function(e) {
  var key = e.keyCode;
  if(key == 13) {
    document.getElementById('submitBtn').click();
  }
}

window.onkeydown = function(e) {
  var key = e.keyCode;

  if(key == 66) {
    if(e.ctrlKey) handler.exportList(true);
  }
  if(key == 73) {
    if(e.ctrlKey) handler.importList(true);
  }
}

document.getElementById('closeBtn').addEventListener('click', function() {
  window.close();
});

function processURLParams() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var debug = url.searchParams.get('flag');
  if(debug == 'debug') {
    document.getElementById('debugIndicator').style = 'display:block';
    var elementsToShow = document.getElementsByClassName('ifDebug');
    for(var i = 0; i<elementsToShow.length; i++) {
      elementsToShow[i].style = 'display:block';
    }
  }
  if(debug == 'debug-legacy'){
    document.getElementById('debugIndicator').style = 'display:block';
    var elementsToShow = document.getElementsByClassName('ifDebug');
    for(var i = 0; i<elementsToShow.length; i++) {
      elementsToShow[i].style = 'display:block';
    }
    elementsToShow = document.getElementsByClassName('legacy');
    for(var i = 0; i<elementsToShow.length; i++) {
      elementsToShow[i].style = 'display:block';
    }
  }
  if(debug == 'fill-list') {
    console.log('Filling list');
    ModeSteps = JSON.parse('[{"type":"Drive","direction":"Forward","speed":".62","distance":"58.25","comment":"","params":["Forward",".62","58.25"]},{"type":"Turn","angle":"45","comment":"","params":["45"]},{"type":"Drive","vision":true,"comment":"","params":["Vision"]},{"type":"Drive","direction":"Forward","speed":".4","distance":"35","comment":"","params":["Forward",".4","35"]},{"type":"Gear","action":"Open","comment":"","params":["Open"]},{"type":"Drive","direction":"Reverse","speed":".375","distance":"20","comment":"","params":["Reverse",".375","20"]},{"type":"Gear","action":"Close","comment":"","params":["Close"]}]');
    refreshTable();
  }
  if(debug == 'native') {
    redUI();
  }
}

function redUI() {
  document.body.style.background = '#8D1010';
  document.body.style.color = '#FFFFFF';
  document.getElementsByClassName('modal-body').color = '#000000';
  for(var i = 0; i<=5; i++) {
    var elems = document.getElementsByClassName('text-muted');
    //console.log(elems[0].classList);
    for(var j = 0; j<elems.length; j++) {
      var isModal = false;
      for(var k = 0; k<elems[j].classList.length; k++) {
        if(elems[j].classList[k] == 'modal-text') isModal = true;
      }
      if(isModal == false) elems[j].classList.remove('text-muted');
    }
  }
  var modals = document.getElementsByClassName('modal-body');
  for(var i = 0; i<modals.length; i++) {
    modals[i].style.color = '#000000';
  }
  var modals = document.getElementsByClassName('modal-title');
  for(var i = 0; i<modals.length; i++) {
    modals[i].style.color = '#000000';
  }
  for(var j = 0; j<5; j++) {
    var uiBtns = document.getElementsByClassName('uiBtn');
    for(var i = 0; i<uiBtns.length; i++) {
      uiBtns[i].classList = ['btn'];
    }
  }
  //document.getElementById('footerURL').style = 'text-decoration:none;color:white;';
  document.getElementById('navbar').style = 'background-color: #661010';
}
