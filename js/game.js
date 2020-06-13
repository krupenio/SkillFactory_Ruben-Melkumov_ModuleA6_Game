const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}


function round() {
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  if (hits === maxHits) { $(divSelector).text(1) }
  if (hits === 1) { firstHitTime = getTimestamp()}
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#totalScores").text(hits - fails)
  $("#win-message").removeClass("d-none");
  $('#game-rules').addClass("d-none");
}

function handleClick(event) {
  let target = $(event.target)
  if (target.hasClass('target')) {
    hits = hits + 1
    target.text("")
    round();
  } else {
    fails += 1;
    $(event.target).addClass('miss');
  }
  }

function init() {
   round();

  $(".game-field").click(handleClick);
  $("#button-start").click(function() {
    hits = 0;
    fails = 0;
    firstHitTime = 0;
    $(".game-field").removeClass('d-none');
    $("#game-rules").removeClass('d-none');
    $('#win-message').addClass('d-none');
  });
    //location.reload();
  
}

$(document).ready(init);
