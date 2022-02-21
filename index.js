
'use strict'

$(function() {

  // precondition
  const $precondition = $('.precondition')
  const $nameInput = $('.precondition .name input')
  const $preconditionBtn = $('.precondition button')
  // description
  const $description = $('.description')
  // remind 
  const $remind = $('.remind')
  const $patternIcon = $('.remind .pattern-title span')
  const $startBtn = $('.remind .start-btn')
  // start
  const $gameStart = $('.start')
  const $gameName = $('.start .information .name')
  const $gameScore = $('.start .information .score')
  const $gameTime = $('.start .information .time')
  const $gameContent = $('.start .content')
  const $timesUp = $('.start .times-up')
  const $scoreBtn = $('.start .show-score .score-btn')
  // score
  const $score = $('main > .score')
  const $scoreTitle = $('.score .score-title')
  const $scoreName = $('.score .score-name')
  const $scoreText = $('.score .score-text')
  const $playAgain = $('.score .play-again')

  let playerName = ''
  let totalScore = ''

  // hide block
  $description.hide()
  $remind.hide()
  $gameStart.hide()
  $score.hide()


  ///// get user name and illustrate rules
  $preconditionBtn.on('click', function (event) {

    const $userNameValue = $nameInput.val()
    const $userNameLength = $userNameValue.trim().length

    // hide precondition, show description
    function enterNextPage() {
      $precondition.hide()
      $description.show().fadeOut(6000, function () {
        // show remind
        $remind.show(function () {
          // pattern title icon
          function hideStyle() {
            $patternIcon.css('display', 'none')
          }
          function showStyle() {
            $patternIcon.css('display', 'inline-block')
          }
          setInterval(hideStyle, 600)
          setInterval(showStyle, 1200)
        })
      })
    }

    if ($userNameLength === 0) {
      // empty name
      alert('請輸入您的大名')
    } else if ($userNameLength > 12) {
      // name word over 15 amount
      alert('字數請控制在 12 字以內, 感謝您的配合 :)')
    } else {
      // get user name and enter next page
      playerName = $userNameValue
      enterNextPage()
    }

  })

  
})