import "./style.css";

let counter: number = Number(0);
document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  `;


function updateText() {
  counterText.innerText = `Spread the Joy: ${counter.toFixed(2)}\n`;
}

const counterText = document.createElement("div");
updateText();
counterText.id = "counter";
document.body.appendChild(counterText);

const button = document.createElement("button");
button.textContent = "💜";
button.id = "clicker";
document.body.appendChild(button);

const buyMe = document.createElement("button");
buyMe.textContent = "💸 Cost 20";
button.id = "bought";
document.body.appendChild(buyMe);

button?.addEventListener("click", () => {
  console.log("it clicked!");
  counter += 1;
  updateText();
});

let autoClicker: number = 0;
const growingAmount: number = 20;

buyMe?.addEventListener("click", () => {
  if (counter < growingAmount) {
    return;
  }
  if (counter >= growingAmount) {
    counter -= growingAmount;
    autoClicker += 1;
    updateText();
    console.log(`this is autoclicker ${autoClicker}`);
  }
});

let lastTime = performance.now();
const rate = 1;

function updateCounter() {
  const dt = (performance.now() - lastTime) / 1000;
  lastTime = performance.now();

  if (autoClicker >= 1) {
    counter += autoClicker * rate * dt;
    updateText();
  }
  requestAnimationFrame(updateCounter);
}

updateCounter();

