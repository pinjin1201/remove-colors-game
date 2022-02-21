
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

  ///// game start
  $startBtn.on('click', function (event) {

    // hide remind
    $remind.hide()

    /// show game and run countdown time
    $gameStart.show(function () {

      // hide times-up, score-btn
      $timesUp.hide()
      $scoreBtn.hide()

      let time = ''
      let minute = ''
      let second = ''

      // get countdown time
      function getCountDownTime() {
        time = `${minute} : ${second}`
        $gameTime.text(`Time: ${time}`)
      }
      // game over: time's up
      function gameOver() {
        $gameName.hide()
        $gameScore.hide()
        $gameTime.hide()
        clearInterval(newTime)
        clearInterval(displayGameAgain)
        $timesUp.show()
        $scoreBtn.show()
        $gameContent.off('click')
      }

      // name
      $gameName.html(`<span>♞</span> ${playerName}`)
      // score
      totalScore = 0
      $gameScore.text(`Score: ${totalScore}`)
      // time
      minute = '02'
      second = '00'
      getCountDownTime()

      // run countdown time
      function countDownTime() {

        // second = 00
        if (second === '00') {

          // second = 00, minute = 02 ~ 01
          if (minute !== '00') {
            // minute
            minute = Number(minute) - 1
            minute = `0${minute}`
            //second (60 - 1)
            second = 59
            getCountDownTime()

            // time = 00:00 (time's up)
          } else if (minute === '00') {
            minute = '00'
            second = '00'
            getCountDownTime()
            gameOver()
            return
          }

          // second = 10
        } else if (second === '10') {
          second = '09'
          getCountDownTime()

          // second = 01
        } else if (second === '01') {
          second = '00'
          getCountDownTime()

          // second = 09 ~ 02
        } else if (second[0] === '0') {
          second = Number(second) - 1
          second = `0${second}`
          getCountDownTime()

        } else {
          second = Number(second) - 1
          second = String(second)
          getCountDownTime()
        }
      }
      let newTime = setInterval(countDownTime, 1000)
    })

    /// make and display colors square
    function renderSquareElement() {
      $gameContent.html(function () {

        let content = ``
        let contentArray = []

        for (let i = 0; i < 40; i++) {
          contentArray.push(`<div class="green"></div>`)
          contentArray.push(`<div class="blue"></div>`)
          contentArray.push(`<div class="white"></div>`)
          contentArray.push(`<div class="yellow"></div>`)
          contentArray.push(`<div class="red"></div>`)
        }

        for (let n = 0; n < contentArray.length; n++) {
          let number = Math.floor(Math.random() * (contentArray.length))
          const item = contentArray[number]
          content += item
          contentArray.splice(number, 1)
        }
        return contentArray

      })
    }
    renderSquareElement()
    const displayGameAgain = setInterval(renderSquareElement, 9000)

    
  })
})