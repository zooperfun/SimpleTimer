var $button = $("#buttonmain");
var $buttonreset = $("#buttonreset");
var $time = $("#time");
var $timeinput = $("#timeinput");
var mytitle = "Simple Timer";
var gettime = 15;

// timer settings
var mytime = new Timer({
  tick: 1,
  onstart: function(millisec){
    var sec = Math.round(millisec / 1000);
    var min = Math.ceil(sec/60);
    $timeinput.val(gettime);
    $(document).attr("title", min + ' Min left');
    $timeinput.prop( "disabled", true );
    alarm.pause();
  },
  ontick: function(millisec){ 
    var sec = Math.round(millisec / 1000);
    var min = Math.ceil(sec/60);
    var secrun = 60-((60 * min) - sec);
    $timeinput.val(min);
    $(document).attr("title", min + ' Min left');
    $("#pie").attr("class", "percent-" + min);
    $("#piesec").attr("class", "percent-" + secrun);
    faviconUpdate();
  },
  onend: function(){    
    resetview();
    setTimeout(function(){$("#pie").attr("class", "percent-0");}, 300);
    setTimeout(function(){$("#piesec").attr("class", "percent-0");}, 300);
    $('link[rel="shortcut icon"]').attr("href","assets/favicon" +0+".png");
    alarm.play();
    setTimeout(function(){alarm.pause();}, 4000);
  }
});
function run(){
  if(mytime.getStatus() === 'initialized' || mytime.getStatus() === 'stopped'){
    if($timeinput.val() > 60) {
      gettime = 60;
    }
    else {
      gettime = $timeinput.val();
    }
  mytime.start(gettime*60);  //convert min input to seconds
  $button.children("img").attr("src", "assets/pause.svg")
  $buttonreset.addClass('show');
  } else if (mytime.getStatus() === 'started'){
  mytime.pause();
  $(document).attr("title", "Paused");
  $button.children("img").attr("src", "assets/play.svg")
  } else if(mytime.getStatus() === 'paused'){
  mytime.start(mytime.getDuration()/1000);
  $button.children("img").attr("src", "assets/pause.svg") 
  }
}

// button
$button.on('click', function(e){
    e.preventDefault();
    run();
});



$(document).keydown(function(e){
  if(e.keyCode == 13 || e.keyCode == 32){
      // enter or space
    run();
  } else if(e.keyCode == 82){
    mytime.stop();
    resetview();
    $("#pie").attr("class", "percent-0");
    $("#piesec").attr("class", "percent-60");
  }
});

function resetview(){
    $timeinput.prop( "disabled", false );
    $button.children("img").attr("src", "assets/play.svg");
    $timeinput.val(gettime); //set to inputed
    $(document).attr("title", mytitle);
    $buttonreset.removeClass('show');
}

//reset
$buttonreset.on('click', function(e){
    e.preventDefault;
    mytime.stop();
    resetview();
    $("#pie").attr("class", "percent-0");
    $("#piesec").attr("class", "percent-60");
});

//sound
var alarm = new Audio("alarm.mp3");

//favicon
function faviconUpdate(){
var position= Math.ceil((mytime.getDuration()/60000) / 5) * 5; 
$('link[rel="shortcut icon"]').attr("href","assets/favicon" +position+".png")
}

