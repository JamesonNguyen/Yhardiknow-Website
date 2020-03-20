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
  var player = document.getElementById('player_1');
  var length = player.duration;
  var current_time = player.currentTime;

  // calculate total length of value
  var totalLength = calculateTotalValue_1(length);
  jQuery('.end-time').html(totalLength);

  // calculate current value time
  var currentTime = calculateCurrentValue_1(current_time);
  jQuery('.start-time').html(currentTime);

  var progressbar = document.getElementById('seekObj_1');
  progressbar.value = player.currentTime / player.duration;
  progressbar.addEventListener('click', seek_1);

  if (player.currentTime == player.duration) {
    $('#play-btn_1').removeClass('pause');
  }

  function seek_1(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
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
        player = document.getElementById('player_1'),
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
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
          $('#play-btn_1').removeClass('pause');
        } else {
          player.play();
          $('#play-btn_1').addClass('pause');
          isPlaying = true;
        }
      }
    })();
  }
}

initPlayers_1(jQuery('#player-container_1').length);
