var $button = $("#buttonmain");
var $buttonreset = $("#buttonreset");
var $time = $("#time");
var $timeinput = $("#timeinput");
var mytitle = "Simple Timer";
var gettime;

// timer settings
var mytime = new Timer({
  tick: 1,
  onstart: function(millisec){
    var sec = Math.round(millisec / 1000);
    $timeinput.val(sec);
    $(document).attr("title", sec + ' mins');
    $timeinput.prop( "disabled", true );
    alarm.pause();
  },
  ontick: function(millisec){ 
    var sec = Math.round(millisec / 1000);
    $timeinput.val(sec);
    $(document).attr("title", sec + ' mins');
    var increment = 100/gettime;
    var per2 = Math.floor((gettime-sec)*increment);
    $("#pie").attr("class", "percent-" + per2);
  },
  onend: function(){    
    resetview();
    alarm.play();
    $("#pie").attr("class", "percent-100");
    setTimeout(function(){alarm.pause();}, 2800);
    setTimeout(function(){$("#pie").attr("class", "percent-0");}, 2000);
  }
});


// button
$button.on('click', function(e){
    e.preventDefault();
    if(mytime.getStatus() === 'initialized' || mytime.getStatus() === 'stopped'){
    gettime = $timeinput.val();
    mytime.start(gettime);
    $button.children("img").attr("src", "assets/pause.svg")
    $buttonreset.addClass('show');
    } else if (mytime.getStatus() === 'started'){
    mytime.pause();
    $button.children("img").attr("src", "assets/play.svg")
    } else if(mytime.getStatus() === 'paused'){
    mytime.start(mytime.getDuration()/1000);
    $button.children("img").attr("src", "assets/pause.svg")
    }
});

function resetview(){
    $timeinput.prop( "disabled", false );
    $button.children("img").attr("src", "assets/play.svg");
    $timeinput.val('10'); //set to default
    $(document).attr("title", mytitle);
    $buttonreset.removeClass('show');
}

//reset
$buttonreset.on('click', function(e){
    e.preventDefault;
    mytime.stop();
    resetview();
    $("#pie").attr("class", "percent-00");
});

//sound
var alarm = new Audio("alarm.mp3");