import "./style.css";
//narrative throughout whole thing is hearts <3
let heartCount: number = Number(0);
let heartsPerSec: number = 0;

document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  <div id="description-panel">
        <p class="text" id="description-text"><span id="description">Get Clicking!</span></p>
      </div>
  `;
//container creation
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
  heartCount: number;
  id: string;
  description: string;
  headerDescription: string;
}

//hearts and their attributes
const availableHearts: Heart[] = [
  {
    name: "yellowHeart",
    emoji: "💛",
    price: 10,
    rate: 0.1,
    heartCount: 0,
    id: "yheart",
    description: "Golden like the sun, sure to brighten your day!",
    headerDescription: "You added a yellow Heart!",
  },
  {
    name: "pinkHeart",
    emoji: "🩷",
    price: 100,
    rate: 2,
    heartCount: 0,
    id: "pheart",
    description: "Sweet and Innocent, and lovely too!",
    headerDescription: "You added a pink Heart!",
  },
  {
    name: "blueHeart",
    emoji: "🩵",
    price: 1000,
    rate: 50,
    heartCount: 0,
    id: "bheart",
    description: "Cool like the ocean, and cool like you!",
    headerDescription: "You added a blue Heart!",
  },
  {
    name: "redHeart",
    emoji: "❤️",
    price: 15000,
    rate: 130,
    heartCount: 0,
    id: "rHeart",
    description: "Classic red. Theres passion in the air!",
    headerDescription: "You added a red Heart!",
  },
  {
    name: "whiteHeart",
    emoji: "🤍",
    price: 50000,
    rate: 300,
    heartCount: 0,
    id: "wHeart",
    description: "Between friends, I still love you!",
    headerDescription: "You added a white Heart!",
  },
];

function updateText() {
  heartCountText.innerText = `Spread the Joy: ${heartCount.toFixed(2)}\n
  Current hearts/second: ${heartsPerSec.toFixed(2)}`;
  availableHearts.forEach((heart) => {
    const button = document.getElementById(heart.id) as HTMLButtonElement;
    button.disabled = heartCount < heart.price ? true : false;
    button.textContent = `${heart.heartCount} ${heart.emoji} Cost ${
      heart.price.toFixed(2)
    } ${heart.description}`;
  });
}

//button and text creation
const heartCountText = document.createElement("div");
//updateText();
heartCountText.id = "heartCount";
heartCountText.style.textAlign = "center";
heartCountText.style.marginTop = "10px";
heartCountText.style.fontSize = "1.4em";
heartCountText.style.fontWeight = "bold";
mainArea.appendChild(heartCountText);

//main clicker
const purpleHeart = document.createElement("button");
purpleHeart.textContent = "💜";
purpleHeart.id = "clicker";
purpleHeart.className = "pheart-button";
document.body.appendChild(purpleHeart);

mainArea.appendChild(purpleHeart);

const descriptionElement = document.getElementById("description")!;
//sub clicker buttons
availableHearts.forEach((heart) => {
  const button = document.createElement("button");
  button.className = "resource-button";
  button.id = heart.id;
  button.textContent = `${heart.heartCount} ${heart.emoji} Cost ${
    heart.price.toFixed(2)
  }  ${heart.description}`;
  button.addEventListener("click", () => {
    if (heartCount >= heart.price) {
      heartCount -= heart.price;
      heart.heartCount += 1;
      heartsPerSec += heart.rate;
      heart.price *= FIXED_RATE;
      updateText();
    }
    //added a header description element like Kaitlyn does here https://github.com/kaitlyn-png/cmpm-121-f25-d1/blob/main/src/main.ts
    descriptionElement.textContent = heart.headerDescription;
  });

  sidePanel.appendChild(button);
});
//first text call, makes buttons disabled and updates their text
updateText();

//Game Loop//
//main purple heart clicker
purpleHeart?.addEventListener("click", () => {
  console.log("it clicked!");
  heartCount += 1;
});

//check to see how much time has passed and calculates how much the autoclicker should go up
let lastTime = performance.now();
const rate = 1;

function updateheartCount() {
  const dt = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();
  if (heartsPerSec >= 0) {
    heartCount += heartsPerSec * rate * dt;
    updateText();
  }
  requestAnimationFrame(updateheartCount);
}

updateheartCount();
