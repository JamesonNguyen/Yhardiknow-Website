function calculateTotalValue_1(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds;

  return time;
}

function calculateCurrentValue_1(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time =
      (current_minute < 10 ? '0' + current_minute : current_minute) +
      ':' +
      (current_seconds < 10 ? '0' + current_seconds : current_seconds);

  return current_time;
}

function initProgressBar_1() {
  var player_1 = document.getElementById('player_1');
  var length_1 = player_1.duration;
  var current_time_1 = player_1.currentTime;

  // calculate total length of value
  var totalLength_1 = calculateTotalValue_1(length_1);
  jQuery('.end-time_1').html(totalLength_1);

  // calculate current value time
  var currentTime_1 = calculateCurrentValue_1(current_time_1);
  jQuery('.start-time_1').html(currentTime_1);

  var progressbar_1 = document.getElementById('seekObj_1');
  progressbar_1.value = player_1.currentTime / player_1.duration;
  progressbar_1.addEventListener('click', seek_1);

  if (player_1.currentTime == player_1.duration) {
    $('#play-btn_1').removeClass('pause');
  }

  function seek_1(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player_1.currentTime = percent * player_1.duration;
    progressbar_1.value = percent / 100;
  }
}

function initPlayers_1(num) {
  // pass num in if there are multiple audio players e.g 'player' + i

  for (var i = 0; i < num; i++) {
    (function() {
      // Variables
      // ----------------------------------------------------------
      // audio embed object
      var playerContainer = document.getElementById('player-container_1'),
        player_1 = document.getElementById('player_1'),
        isPlaying = false,
        playBtn = document.getElementById('play-btn_1');

      // Controls Listeners
      // ----------------------------------------------------------
      if (playBtn != null) {
        playBtn.addEventListener('click', function() {
          togglePlay();
        });
      }

      // Controls & Sounds Methods
      // ----------------------------------------------------------
      function togglePlay() {
        if (player_1.paused === false) {
          player_1.pause();
          isPlaying = false;
          $('#play-btn_1').removeClass('pause');
        } else {
          player_1.play();
          $('#play-btn_1').addClass('pause');
          isPlaying = true;
        }
      }
    })();
  }
}

initPlayers_1(jQuery('#player-container_1').length);
