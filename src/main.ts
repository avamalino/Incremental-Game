import "./style.css";

let counter: number = 0;
document.body.innerHTML = `
  <h2> Have some LOVE!<br></h2>
  `;

function counterOverTime() {
  console.log("function called");
  if (autoClicker < 1) {
    return;
  }
  counter += autoClicker;
  updateText();
}
function updateText() {
  counterText.innerText = `Spread the Joy: ${counter}\n`;
}

const counterText = document.createElement("amount");
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

//console.log("did this run");
setInterval(counterOverTime, 1000);
