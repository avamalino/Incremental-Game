import "./style.css";
//narrative throughout whole thing is hearts <3
let counter: number = Number(0);
let autoClicker: number = 0;

document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  `;

const gameContainer = document.createElement("div");
gameContainer.className = "game-container";

const mainArea = document.createElement("div");
mainArea.className = "main-area";

const sidePanel = document.createElement("div");
sidePanel.className = "side-panel";


gameContainer.appendChild(mainArea);
gameContainer.appendChild(sidePanel);
document.body.appendChild(gameContainer);

const FIXED_RATE: number = 1.15;  


interface Heart {
  name: string;
  emoji: string;
  price: number;
  rate: number;
  counter: number;
  id: string;
}

const availableHearts: Heart[] = [
  { name: "yellowHeart", emoji: "💛", price: 10, rate: 0.1, counter: 0, id: "yheart" },
  { name: "pinkHeart", emoji: "❤️", price: 100, rate: 2, counter: 0, id: "pheart" },
  { name: "blueHeart", emoji: "🩵", price: 1000, rate: 50, counter: 0, id: "bheart" },
];

function updateText() {
  counterText.innerText = `Spread the Joy: ${counter.toFixed(2)}\n
  Current hearts/second: ${autoClicker.toFixed(2)}`;
  availableHearts.forEach((heart) => {
    const button = document.getElementById(heart.id) as HTMLButtonElement;
    button.disabled = counter < heart.price ? true : false;
    button.textContent = `${heart.counter} ${heart.emoji} Cost ${heart.price.toFixed(2)}`;
  });
}


availableHearts.forEach((heart) => {
  const button = document.createElement("button");
  button.className = "resource-button";
  button.id = heart.id;
  button.textContent = `${heart.counter} ${heart.emoji} Cost ${heart.price.toFixed(2)}`;
  button.addEventListener("click", () => {
    if (counter >= heart.price) {
      counter -= heart.price;
      heart.counter += 1;
      autoClicker += heart.rate
      heart.price *= FIXED_RATE;
      updateText();
    }
  });
  
  sidePanel.appendChild(button);
});

//button and text creation
const counterText = document.createElement("div");
//updateText();
counterText.id = "counter";
counterText.style.textAlign = "center";
counterText.style.marginTop = "10px";
counterText.style.fontSize = "1.4em";
counterText.style.fontWeight = "bold";
mainArea.appendChild(counterText);


//main clicker
const purpleHeart = document.createElement("button");
purpleHeart.textContent = "💜";
purpleHeart.id = "clicker";
purpleHeart.className = "pheart-button";
document.body.appendChild(purpleHeart);

mainArea.appendChild(purpleHeart);


//first text call, makes buttons disabled and updates their text
updateText();

//main purple heart clicker
purpleHeart?.addEventListener("click", () => {
  console.log("it clicked!");
  counter += 1;
});

let lastTime = performance.now();
const rate = 1;

function updateCounter() {
  const dt = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();
  if (autoClicker >= 0) {
    counter += autoClicker * rate * dt;
    updateText();
  }
  requestAnimationFrame(updateCounter);
}

updateCounter();
