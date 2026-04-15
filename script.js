const foods = [
  {name:"Spicy Chicken", taste:"spicy"},
  {name:"Cheese Burger", taste:"cheesy"},
  {name:"Chocolate Cake", taste:"sweet"},
  {name:"Tom Yum", taste:"spicy"},
  {name:"Ice Cream", taste:"sweet"}
];

let currentFilter = "all";

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";

  foods
    .filter(f => currentFilter === "all" || f.taste === currentFilter)
    .forEach(food => {
      grid.innerHTML += `<div class="card"><h3>${food.name}</h3><p>${food.taste}</p></div>`;
    });
}

function filterMenu(type) {
  currentFilter = type;
  renderMenu();
}

function sendMessage() {
  let input = document.getElementById("chatInput").value.toLowerCase();
  let chat = document.getElementById("chatBody");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;
   let reply = "Try something!";
  if(input.includes("spicy")) reply = "Try Spicy Chicken 🌶️";
  if(input.includes("sweet")) reply = "Try Ice Cream 🍦";

  chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
}

renderMenu();
