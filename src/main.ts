import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("herro");
console.log(":3");
const button = document.createElement("button");
button.textContent = "💜"; //place your emoji
button.id = "clicker"; //for the next step, i think
//<div id="clicker"></div>
document.body.appendChild(button);

//let counter: number = 0;

//button.addEventListener('click', () =&gt; {
//  console.log('Button clicked');
//});
//ello
