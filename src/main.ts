import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <h2> Have some LOVE!<br></h2>
  `;

function counterOverTime() {
  console.log("function called");
  counter += autoClicker;
  counterText.innerText = `Spread the Joy: ${counter}`;
}

const counterText = document.createElement("amount");
counterText.innerText = `Spread the Joy: ${counter}`;
counterText.id = "counter";
document.body.appendChild(counterText);

const button = document.createElement("button");
button.textContent = "💜"; //place your emoji
button.id = "clicker"; //for the next step, i think
//<div id="clicker"></div>
document.body.appendChild(button);

const buyMe = document.createElement("button");
buyMe.textContent = "💸";
button.id = "bought";
document.body.appendChild(buyMe);

button?.addEventListener("click", () => {
  console.log("it clicked!");
  counter += 1;
  counterText.innerText = `Spread the Joy: ${counter}`;
});

let autoClicker: number = 0;
let growingAmount: number = 20;

buyMe?.addEventListener("click", () => {
  if (counter < growingAmount) {
    return;
  }
  if (counter >= growingAmount) {
    console.log("its been bought");
    counter -= growingAmount;
    autoClicker += 1;
    counterText.innerText = `Spread the Joy:${counter}`;
    console.log(`this is autoclicker ${autoClicker}`);
  }
  console.log("its been bought");
});

if (autoClicker != 0) {
  console.log("did this run");
  setInterval(counterOverTime, 1000);
}
