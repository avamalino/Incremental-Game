import "./style.css";

let counter: number = Number(0);
let autoClicker: number = 0;
document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  `;

function updateText() {
  counterText.innerText = `Spread the Joy: ${counter.toFixed(2)}\n
  Current hearts/second: ${autoClicker.toFixed(2)}`;
}

const counterText = document.createElement("div");
updateText();
counterText.id = "counter";
document.body.appendChild(counterText);

const purpleHeart = document.createElement("button");
purpleHeart.textContent = "💜";
purpleHeart.id = "clicker";
document.body.appendChild(purpleHeart);

const buyMe = document.createElement("button");
buyMe.textContent = "💸 Cost 10";
buyMe.id = "bought";
document.body.appendChild(buyMe);

const pinkHeart = document.createElement("button");
pinkHeart.textContent = "❤️ Cost 100";
pinkHeart.id = "heart";
document.body.appendChild(pinkHeart);

const blueHeart = document.createElement("button");
blueHeart.textContent = "🩵 cost 1000";
blueHeart.id = "bHeart";
document.body.appendChild(blueHeart);

const growingAmount: number = 10;
const pHeartAmt: number = 100;
const bHeartAmt: number = 1000;

buyMe.disabled = true;
pinkHeart.disabled = true;
blueHeart.disabled = true;

purpleHeart?.addEventListener("click", () => {
  console.log("it clicked!");
  counter += 1; //later add specific rates for each button and then add
  //the cash button rate to the normal counter like cookie clicker with the cursors
  updateText();
});

buyMe?.addEventListener("click", () => {
  if (counter >= growingAmount) {
    counter -= growingAmount;
    autoClicker += 0.1;
    updateText();
    console.log(`this is autoclicker ${autoClicker}`);
  }
});

pinkHeart?.addEventListener("click", () => {
  if (counter >= pHeartAmt) {
    counter -= pHeartAmt;
    autoClicker += 2;
    updateText();
  }
});

blueHeart?.addEventListener("click", () => {
  if (counter >= bHeartAmt) {
    counter -= bHeartAmt;
    autoClicker += 50;
    updateText();
  }
});

let lastTime = performance.now();
const rate = 1;

function updateCounter() {
  const dt = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();

  buyMe.disabled = counter < growingAmount ? true : false;
  pinkHeart.disabled = counter < pHeartAmt ? true : false;
  blueHeart.disabled = counter < bHeartAmt ? true : false;

  if (autoClicker >= 0) {
    counter += autoClicker * rate * dt;
    updateText();
  }
  requestAnimationFrame(updateCounter);
}

updateCounter();
