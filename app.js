let gameSeq = [];
let userSeq = [];
let btns = ['orange', 'pink', 'blue', 'green'];
let allBtns = document.querySelectorAll('.btn');

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener('keypress', function () {
  if (started == false) {
    console.log('Game started');
    started = true;
    levelUp();
  }
});

function levelUp() {
  level++;
  userSeq = [];
  h2.innerText = `Level ${level}`;
  let randomInd = Math.floor(Math.random() * 3);
  let randomColor = btns[randomInd];
  gameSeq.push(randomColor);
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameFlash(randomBtn);
  console.log(`Game Seq= ${gameSeq}`);
}

function gameFlash(btn) {
  btn.classList.add('gameFlash');
  setTimeout(function () {
    btn.classList.remove('gameFlash');
  }, 250);
}

function btnPress() {
  let btn = this; // this is current calling btn and not the color
  btn.classList.add('userFlash');
  setTimeout(function () {
    btn.classList.remove('userFlash');
  }, 250);
  let userColor = btn.getAttribute('id');
  userSeq.push(userColor);

  if (userSeq[userSeq.length - 1] != gameSeq[userSeq.length - 1]) {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start`;
    btn.classList.add('redFlash');
    setTimeout(function () {
      btn.classList.remove('redFlash');
    }, 500);
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
    console.log('Game Over');
  } else {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 100);
      console.log(`User Seq= ${userSeq}`);
    }
  }
}

for (btn of allBtns) {
  btn.addEventListener('click', btnPress);
}
