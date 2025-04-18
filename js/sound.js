const sounds = {
  marble: new Audio("sounds/marble.mp3"),
  quack: new Audio("sounds/quack.mp3"),
  whistle: new Audio("sounds/whistle.mp3")
};

let soundEnabled = true;

export function setupSoundToggle() {
  const toggle = document.getElementById("sound-toggle");
  if (toggle) {
    soundEnabled = toggle.checked;
    toggle.addEventListener("change", (e) => {
      soundEnabled = e.target.checked;
    });
  }
}

export function playSoundForNumber(number) {
  if (!soundEnabled) return;

  if (number === 2) {
    sounds.quack.play();
  } else if (number === 22) {
    const quack1 = sounds.quack.cloneNode();
    const quack2 = sounds.quack.cloneNode();
    quack1.play();
    setTimeout(() => quack2.play(), 300);
  } else if (number === 11) {
    sounds.whistle.play();
  } else {
    sounds.marble.play();
  }
}
