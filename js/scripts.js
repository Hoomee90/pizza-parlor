// Business Logic

// Pre-ES6 this would look like
// function Pizza(size, ...toppings) { etc }
// Pizza.prototype.cost() { etc }

class Pizza {
  constructor (size, toppings) {
    this.size = size;
    this.toppings = Array.from(toppings);
  }
  
  cost(compiled = true) {
    const toppingsCalculated = this.toppings.reduce((accCost, currentTopping, currentToppingNum) => (accCost + ((currentTopping.match(/[euioa]/gi) || []).length + 1) * (currentToppingNum + 1) / 4), 0);
    const sizeCalculated = 2 + Math.floor(this.size ** 1.5 / 2);
    const taxCalculated = Math.floor((toppingsCalculated + sizeCalculated) * 0.1025);
    return compiled ? toppingsCalculated + sizeCalculated + taxCalculated : [toppingsCalculated, sizeCalculated, taxCalculated];
  }
  
  addToppings(newToppings) {
    this.toppings = this.toppings.concat(newToppings);
  }
  
  static getMysteryTopping(num) {
    let possibilities = ["bone meal", "fairy dust", "mind honey", "iron shavings", "catnip", "mystery eggs", "chalk", "spiders", "curdled milk", "whimsical red soda", "foreign aquatic vertebrates", "cuttlefish"];
    const toppings = possibilities.sort(() => Math.random() - 0.5).slice(0, num);
    return toppings;
  }
}

// User Interface Logic

function displayPizza(location, pizzaObj, additions = null) {
  let pizza = pizzaObj;
  const standardToppings = pizza.toppings;
  const mysteryAdditions = additions;
  const noMysteryPizzaPrices = pizza.cost(false);
  pizza.addToppings(mysteryAdditions);
  const pizzaPrices = pizza.cost(false);

  let receipt = document.querySelector("div.card#receipt-template").cloneNode(true);

  receipt.id = parseInt(receipt.id) + 1;
  receipt.querySelector(".size-display").innerText = {4:"XSML", 8:"SML", 12:"MED", 16:"LRG", 36:"COL"}[pizza.size];
  receipt.querySelector(".size-price").innerText = `$${pizzaPrices[1]}.00`;
  for (let topping in standardToppings) {
    let li = document.createElement("li");
    li.classList = "stand-topping";
    li.innerText = standardToppings[topping];
    receipt.querySelector(".topping-list").append(li);
  }
  receipt.querySelector(".topping-price").innerText = `$${noMysteryPizzaPrices[0]}`

  for (let topping in mysteryAdditions) {
    let li = document.createElement("li");
    li.classList = "mystery-topping";
    li.innerText = mysteryAdditions[topping];
    receipt.querySelector(".mystery-list").append(li);
  }
  receipt.querySelector(".mystery-price").innerText = `$${pizzaPrices[0] - noMysteryPizzaPrices[0]}`

  receipt.querySelector(".sub-price").innerText = `$${pizzaPrices[0] + pizzaPrices[1]}`
  receipt.querySelector(".tax-price").innerText = `$${pizzaPrices[2]}`
  receipt.querySelector(".total-price").innerText = `$${pizza.cost()}`

  document.querySelector("div.card:last-of-type").after(receipt);
  console.log(receipt);
}

function handleFormSubmission(event) {
  event.preventDefault();

  let toppingArray = Array.from(document.querySelectorAll(`#topping-dropdown input:checked`));
  const toppingValues = toppingArray.map(element => element.id === "custom-check" ? document.querySelector(element.dataset.target).value : element.value);
  const sizeValue = document.querySelector("#size-dropdown input:checked").value;
  const mysteryValue = document.querySelector("#mystery-amount").value;
  
  let orderedPizza = new Pizza(sizeValue, toppingValues);
  const mysteryAdditions = Pizza.getMysteryTopping(mysteryValue);
  
  displayPizza(event.target, orderedPizza, mysteryAdditions);

  document.querySelector("#toppings-button").innerText = "0 Selected";
  document.querySelector("#size-button").innerText = "Size";
  document.querySelector("#text-ingredient").classList.remove("show");

  event.target.reset();
}

function updateCheckboxButtons(event) {
  const sizeDropButton = document.querySelector("#size-button");
  const topDropButton = document.querySelector("#toppings-button");
  if (event.target.type === "checkbox") {
    topDropButton.innerText = `${document.querySelectorAll("input[type='checkbox']:checked").length} Selected`;
    if (event.target.id === "custom-check" && !event.target.classList.contains("show")) {
      document.querySelector("#text-ingredient").value = null;
    }
  } else if (event.target.type === "radio") {
    sizeDropButton.innerText = `${document.querySelector("input[type='radio']:checked + *").innerText} Size`;
  }
}

function handleMysteryInput(event) {
  if (event.target.classList.contains("show")) {
    event.target.innerText = "Yes Mystery Ingredients";
  } else {
    document.querySelector("#mystery-amount").value = null;
    event.target.innerText = "No Mystery Ingredients";
  }
}

window.addEventListener("load", () => {
  document.querySelector("form#pizza-form").addEventListener("submit", handleFormSubmission);
  document.querySelectorAll("input.form-check-input").forEach(element => element.addEventListener("change", updateCheckboxButtons));
  document.querySelector("#mystery-button").addEventListener("click", handleMysteryInput);
});