function calculateTotalValue_2(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds;

  return time;
}

function calculateCurrentValue_2(currentTime) {
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

function initProgressBar_2() {
  var player_2 = document.getElementById('player_2');
  var length_2 = player_2.duration;
  var current_time_2 = player_2.currentTime;

  // calculate total length of value
  var totalLength_2 = calculateTotalValue_2(length_2);
  jQuery('.end-time_2').html(totalLength_2);

  // calculate current value time
  var currentTime_2 = calculateCurrentValue_2(current_time_2);
  jQuery('.start-time_2').html(currentTime_2);

  var progressbar_2 = document.getElementById('seekObj_2');
  progressbar_2.value = player_2.currentTime / player_2.duration;
  progressbar_2.addEventListener('click', seek_2);

  if (player_2.currentTime == player_2.duration) {
    $('#play-btn_2').removeClass('pause');
  }

  function seek_2(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player_2.currentTime = percent * player_2.duration;
    progressbar_2.value = percent / 100;
  }
}

function initPlayers_2(num) {
  // pass num in if there are multiple audio players e.g 'player' + i

  for (var i = 0; i < num; i++) {
    (function() {
      // Variables
      // ----------------------------------------------------------
      // audio embed object
      var playerContainer = document.getElementById('player-container_2'),
        player_2 = document.getElementById('player_2'),
        isPlaying = false,
        playBtn = document.getElementById('play-btn_2');

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
        if (player_2.paused === false) {
          player_2.pause();
          isPlaying = false;
          $('#play-btn_2').removeClass('pause');
        } else {
          player_2.play();
          $('#play-btn_2').addClass('pause');
          isPlaying = true;
        }
      }
    })();
  }
}

initPlayers_2(jQuery('#player-container_2').length);
