const buttons = document.querySelectorAll('.btn')
const user = document.querySelector('.user-choice')
const computer = document.querySelector('.computer-choice')
const result = document.querySelector('#result')
const userscore = document.querySelector('.userscore')
const computerpoint = document.querySelector('.computerscore')
const reset = document.querySelector('.reset-btn')
const wincard = document.querySelector('.win-card')
const loosecard = document.querySelector('.loose-card')

// اگه فایل صدا پیدا نشه، بازی نباید بشکنه
function safeAudio(path) {
  try {
    const a = new Audio(path)
    a.onerror = () => { }
    return a
  } catch (e) { return { play() { }, currentTime: 0 } }
}

const clickedsound = safeAudio("asset/sounds/select sfx 5.mp3")
const winsound = safeAudio("asset/sounds/level-passed-143039.mp3")
const loosesound = safeAudio("asset/sounds/Losing Sound Effect Game.mp3")

let myscore = 0
let computerscore = 0

buttons.forEach((item) => {
  item.addEventListener('click', () => {
    playgame(item.id)
  })
})

function playgame(userchoice) {
  clickedsound.currentTime = 0
  clickedsound.play().catch(() => { })

  let rand = Math.floor(Math.random() * 3)

  let computerchoice
  switch (rand) {
    case 0:
      computerchoice = 'rock'
      computer.textContent = '✊'
      break;

    case 1:
      computerchoice = 'paper'
      computer.textContent = '🤚'
      break;

    case 2:
      computerchoice = 'scissors'
      computer.textContent = '✌️'
      break;
  }

  //////////////// انتخاب کاربر ///////////////
  switch (userchoice) {
    case 'rock':
      user.textContent = '✊'
      break;

    case 'paper':
      user.textContent = '🤚'
      break;

    case 'scissors':
      user.textContent = '✌️'
      break;
  }

  // انیمیشن ضربان دور آواتار
  computer.classList.remove('pulse-cpu')
  void computer.offsetWidth
  computer.classList.add('pulse-cpu')

  user.classList.remove('pulse-player')
  void user.offsetWidth
  user.classList.add('pulse-player')

  ///////////////////// نتیجه هر دست /////////////////
  result.classList.remove('win', 'lose', 'tie')

  if (userchoice === computerchoice) {
    result.textContent = '🤝 Draw'
    result.classList.add('tie')
  } else if (
    userchoice === 'rock' && computerchoice === 'scissors' ||
    userchoice === 'paper' && computerchoice === 'rock' ||
    userchoice === 'scissors' && computerchoice === 'paper'
  ) {
    myscore++
    userscore.textContent = myscore
    result.textContent = '🎉You won this round.'
    result.classList.add('win')
  } else {
    computerscore++
    computerpoint.textContent = computerscore
    result.textContent = '😵 The robot won this hand.'
    result.classList.add('lose')
  }

  ///////////////////////برد و باخت در کل////////////////////////
  if (computerscore === 3) {
    result.textContent = 'Game over'
    loosecard.classList.remove('scale-0')
    loosesound.play().catch(() => { })

  } else if (myscore === 3) {
    result.textContent = 'You won.🏆'
    wincard.classList.remove('scale-0')
    winsound.play().catch(() => { })
  }
}

function resetgame() {
  myscore = 0
  computerscore = 0
  user.textContent = '❔'
  computer.textContent = '❔'
  result.textContent = 'Waiting for your choice...'
  result.classList.remove('win', 'lose', 'tie')
  userscore.textContent = '0'
  computerpoint.textContent = '0'
  wincard.classList.add('scale-0')
  loosecard.classList.add('scale-0')
  user.classList.remove('pulse-player')
  computer.classList.remove('pulse-cpu')
}

reset.addEventListener('click', resetgame)
loosecard.addEventListener('click', resetgame)
wincard.addEventListener('click', resetgame)