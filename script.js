const menuData = [
  {
    name: "Spicy Chicken Rice Bowl",
    category: "Rice Bowl",
    price: 16.9,
    desc: "Grilled chicken with hot sauce, vegetables, and rice.",
    tags: ["spicy", "savory"]
  },
  {
    name: "Creamy Carbonara Pasta",
    category: "Pasta",
    price: 18.9,
    desc: "Rich and creamy pasta topped with turkey slices.",
    tags: ["creamy", "cheesy"]
  },
  {
    name: "Korean Chicken Wrap",
    category: "Wrap",
    price: 15.9,
    desc: "Crunchy chicken wrap with fresh lettuce and flavorful sauce.",
    tags: ["crispy", "spicy"]
  },
  {
    name: "Classic Beef Burger",
    category: "Burger",
    price: 17.9,
    desc: "Juicy beef burger served with signature sauce and toasted bun.",
    tags: ["savory", "crispy"]
  },
  {
    name: "Matcha Latte",
    category: "Drink",
    price: 9.9,
    desc: "Smooth iced matcha latte for a refreshing finish.",
    tags: ["sweet", "creamy"]
  },
  {
    name: "Chocolate Waffle",
    category: "Dessert",
    price: 12.9,
    desc: "Golden waffle topped with chocolate drizzle.",
    tags: ["sweet", "crispy"]
  },
  {
    name: "Chicken Alfredo Pasta",
    category: "Pasta",
    price: 19.9,
    desc: "Creamy pasta served with grilled chicken slices.",
    tags: ["creamy", "savory"]
  },
  {
    name: "Aglio Olio Pasta",
    category: "Pasta",
    price: 17.9,
    desc: "Garlic olive oil pasta with chili flakes and herbs.",
    tags: ["savory", "spicy"]
  },
  {
    name: "Double Cheese Burger",
    category: "Burger",
    price: 19.9,
    desc: "Beef burger topped with double cheese and signature sauce.",
    tags: ["cheesy", "savory"]
  },
  {
    name: "Chicken Burger",
    category: "Burger",
    price: 14.9,
    desc: "Grilled chicken burger with lettuce and mayonnaise.",
    tags: ["savory", "crispy"]
  },
  {
    name: "Grilled Salmon Bowl",
    category: "Healthy",
    price: 21.9,
    desc: "Healthy salmon bowl with rice, greens, and light sauce.",
    tags: ["savory"]
  },
  {
    name: "Cheese Fries",
    category: "Snack",
    price: 10.9,
    desc: "Crispy fries topped with melted cheese sauce.",
    tags: ["cheesy", "crispy"]
  },
  {
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    price: 19.9,
    desc: "Pizza topped with BBQ chicken and melted cheese.",
    tags: ["savory", "cheesy"]
  },
  {
    name: "Strawberry Milkshake",
    category: "Drink",
    price: 11.9,
    desc: "Cold and creamy milkshake with strawberry flavor.",
    tags: ["sweet", "creamy"]
  },
  {
    name: "Nasi Lemak Crispy Chicken",
    category: "Local",
    price: 15.9,
    desc: "Coconut rice served with crispy chicken, sambal, egg, and peanuts.",
    tags: ["savory", "crispy"]
  },
  {
    name: "Buttermilk Chicken Rice",
    category: "Rice",
    price: 16.9,
    desc: "Golden chicken pieces served with fragrant rice and creamy buttermilk sauce.",
    tags: ["creamy", "savory"]
  },
  {
    name: "Seafood Tomyam Pasta",
    category: "Pasta",
    price: 19.9,
    desc: "Spicy tomyam pasta with prawns, squid, and herbs.",
    tags: ["spicy", "savory"]
  },
  {
    name: "Mushroom Soup",
    category: "Soup",
    price: 8.9,
    desc: "Warm creamy mushroom soup served with toasted bread.",
    tags: ["creamy", "savory"]
  },
  {
    name: "Mozzarella Chicken Chop",
    category: "Western",
    price: 20.9,
    desc: "Grilled chicken chop topped with mozzarella cheese and black pepper sauce.",
    tags: ["cheesy", "savory"]
  },
  {
    name: "Iced Lemon Tea",
    category: "Drink",
    price: 6.9,
    desc: "Refreshing iced lemon tea that pairs well with any meal.",
    tags: ["sweet"]
  }
];

let cart = [];

const tasteSelect = document.getElementById("taste");
const budgetSelect = document.getElementById("budget");

if (tasteSelect && budgetSelect) {
  tasteSelect.addEventListener("change", recommend);
  budgetSelect.addEventListener("change", recommend);
}

function recommend() {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;

  const taste = tasteSelect.value;
  const budget = budgetSelect.value;

  let filtered = menuData.filter(item => item.tags.includes(taste));

  if (budget === "below16") {
    filtered = filtered.filter(item => item.price < 16);
  } else if (budget === "16above") {
    filtered = filtered.filter(item => item.price >= 16);
  }

  displayResults(filtered);
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (items.length === 0) {
    resultsDiv.innerHTML = `
      <div class="recommend-card">
        <p style="margin:0;">No matching items found. Try another taste or budget.</p>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const tagsHtml = item.tags.map(tag => `<span>${tag}</span>`).join("");

    const card = document.createElement("div");
    card.className = "recommend-card";
    card.innerHTML = `
      <div class="recommend-top">
        <div>
          <p class="recommend-name">${item.name}</p>
          <p style="margin:6px 0 0;color:#6b7280;font-size:14px;">${item.desc}</p>
        </div>
        <div class="recommend-price">RM${item.price.toFixed(2)}</div>
      </div>
      <div class="recommend-tags">${tagsHtml}</div>
      <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">Add to Cart</button>
    `;

    resultsDiv.appendChild(card);
  });
}

function addToCart(name, price) {
  const selectedOptions = Array.from(document.querySelectorAll(".custom-option:checked"))
    .map(option => option.value);

  cart.push({ name, price, options: selectedOptions });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "No items added yet.";
    cartTotal.innerHTML = "RM0.00";
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const optionsText = item.options.length ? ` <br><small>Custom: ${item.options.join(", ")}</small>` : "";
    return `<div style="margin-bottom:10px;">${item.name} - RM${item.price.toFixed(2)}${optionsText}</div>`;
  }).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerHTML = "RM" + total.toFixed(2);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Order placed successfully!");
    cart = [];
    document.querySelectorAll(".custom-option").forEach(option => {
      option.checked = false;
    });
    updateCart();
  }
}

function addChatMessage(text, type = "bot") {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const msg = document.createElement("div");
  msg.className = type === "user" ? "user-msg" : "bot-msg";
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatEnter(event) {
  if (event.key === "Enter") {
    sendChat();
  }
}

function askQuickQuestion(question) {
  const input = document.getElementById("chatInput");
  if (!input) return;
  input.value = question;
  sendChat();
}

function sendChat() {
  const input = document.getElementById("chatInput");
  if (!input) return;

  const userText = input.value.trim();
  if (!userText) return;

  addChatMessage(userText, "user");
  input.value = "";

  setTimeout(() => {
    const reply = generateBotReply(userText);
    addChatMessage(reply, "bot");
  }, 400);
}

function generateBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes("best seller") || text.includes("popular")) {
    return "Our popular items are Spicy Chicken Rice Bowl, Classic Beef Burger, and Nasi Lemak Crispy Chicken.";
  }

  if (text.includes("below rm16") || text.includes("cheap") || text.includes("budget")) {
    const cheapItems = menuData.filter(item => item.price < 16).map(item => item.name);
    return "Here are good choices below RM16: " + cheapItems.slice(0, 6).join(", ") + ".";
  }

  if (text.includes("spicy")) {
    const items = menuData.filter(item => item.tags.includes("spicy")).map(item => item.name);
    return "For spicy food, I recommend: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("savory")) {
    const items = menuData.filter(item => item.tags.includes("savory")).map(item => item.name);
    return "If you like savory meals, try: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("creamy")) {
    const items = menuData.filter(item => item.tags.includes("creamy")).map(item => item.name);
    return "For creamy options, you can choose: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("crispy")) {
    const items = menuData.filter(item => item.tags.includes("crispy")).map(item => item.name);
    return "For crispy food, I suggest: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("sweet") || text.includes("dessert")) {
    const items = menuData.filter(item => item.tags.includes("sweet")).map(item => item.name);
    return "For sweet choices, try: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("cheesy")) {
    const items = menuData.filter(item => item.tags.includes("cheesy")).map(item => item.name);
    return "For cheesy meals, I recommend: " + items.slice(0, 5).join(", ") + ".";
  }

  if (text.includes("drink")) {
    const items = menuData.filter(item => item.category.toLowerCase() === "drink").map(item => item.name);
    return "We have these drinks: " + items.join(", ") + ".";
  }

  if (text.includes("recommend")) {
    return "You can use the Smart Recommendation section to choose your taste and budget. It will instantly suggest suitable meals for you.";
  }

  if (text.includes("checkout") || text.includes("payment")) {
    return "To continue your order, add items to cart and click Proceed to Checkout. Payment can be made by online banking, e-wallet, card, or cash.";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! I can help you with menu suggestions, prices, and ordering information.";
  }

  return "I can help with menu recommendations, taste preference, budget range, drinks, desserts, and checkout information.";
}

window.addEventListener("load", () => {
  recommend();
  updateCart();
});
