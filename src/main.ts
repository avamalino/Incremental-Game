import "./style.css";

let counter: number = Number(0);
let autoClicker: number = 0;

let yHeartAmt: number = 10;
let yhCounter: number = 0;
let pHeartAmt: number = 100;
let phCounter: number = 0;
let bHeartAmt: number = 1000;
let bhCounter: number = 0;

document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  `;

function updateText() {
  counterText.innerText = `Spread the Joy: ${counter.toFixed(2)}\n
  Current hearts/second: ${autoClicker.toFixed(2)}`;
  yellowHeart.textContent = `${yhCounter} 💛 Cost ${yHeartAmt.toFixed(2)}`;
  pinkHeart.textContent = `${phCounter} ❤️ Cost ${pHeartAmt.toFixed(2)}`;
  blueHeart.textContent = `${bhCounter} 🩵 cost ${bHeartAmt.toFixed(2)}`;
}

const counterText = document.createElement("div");
//updateText();
counterText.id = "counter";
document.body.appendChild(counterText);

const purpleHeart = document.createElement("button");
purpleHeart.textContent = "💜";
purpleHeart.id = "clicker";
purpleHeart.className = "pheart-button";
document.body.appendChild(purpleHeart);

const yellowHeart = document.createElement("button");
yellowHeart.textContent = "💛 Cost 10";
yellowHeart.id = "yheart";
yellowHeart.className = "resource-button";
document.body.appendChild(yellowHeart);

const pinkHeart = document.createElement("button");
pinkHeart.textContent = "❤️ Cost 100";
pinkHeart.id = "pheart";
pinkHeart.className = "resource-button";
document.body.appendChild(pinkHeart);

const blueHeart = document.createElement("button");
blueHeart.textContent = "🩵 cost 1000";
blueHeart.id = "bheart";
blueHeart.className = "resource-button";
document.body.appendChild(blueHeart);

updateText();

yellowHeart.disabled = true;
pinkHeart.disabled = true;
blueHeart.disabled = true;

purpleHeart?.addEventListener("click", () => {
  console.log("it clicked!");
  counter += 1;
});

yellowHeart?.addEventListener("click", () => {
  if (counter >= yHeartAmt) {
    counter -= yHeartAmt;
    autoClicker += 0.1;
    yhCounter += 1;
    yHeartAmt *= 1.15;
    updateText();
    console.log(`this is autoclicker ${autoClicker}`);
  }
});

pinkHeart?.addEventListener("click", () => {
  if (counter >= pHeartAmt) {
    counter -= pHeartAmt;
    autoClicker += 2;
    phCounter += 1;
    pHeartAmt *= 1.15;
    updateText();
  }
});

blueHeart?.addEventListener("click", () => {
  if (counter >= bHeartAmt) {
    counter -= bHeartAmt;
    autoClicker += 50;
    bhCounter += 1;
    bHeartAmt *= 1.15;
    updateText();
  }
});

let lastTime = performance.now();
const rate = 1;

function updateCounter() {
  const dt = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();

  yellowHeart.disabled = counter < yHeartAmt ? true : false;
  pinkHeart.disabled = counter < pHeartAmt ? true : false;
  blueHeart.disabled = counter < bHeartAmt ? true : false;

  if (autoClicker >= 0) {
    counter += autoClicker * rate * dt;
    updateText();
  }
  requestAnimationFrame(updateCounter);
}

updateCounter();
