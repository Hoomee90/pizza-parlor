// Business Logic

// Pre-ES6 this would look like
// function Pizza(size, ...toppings) { etc }
// Pizza.prototype.cost() { etc }
// Pizza.addToppings() { etc }

class Pizza {
  constructor (size, toppings) {
    this.size = parseInt(size);
    this.toppings = Array.from(toppings);
  }
  
  cost(compiled = true) {
    // Price based on size and amount of vowels in toppings, multiplied by their number
    const toppingsCalculated = this.toppings.reduce((accCost, currentTopping, currentToppingNum) => (accCost + ((currentTopping.match(/[euioa]/gi) || []).length + 1) * (currentToppingNum + 1) / 4), 0);
    const sizeCalculated = 2 + this.size;
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

function displayPizza(pizzaObj, additions = null) {
  const displayNum = (num) => {
    // Standardize input into $X.00 format 
    const splitNum = num.toString().split(".");
    if (splitNum.length > 1) {
      return splitNum[1].length < 2 ? `$${num}0` : `$${num}`;
    }
    return `$${num}.00`;
  }

  let pizza = pizzaObj;
  const standardToppings = pizza.toppings;
  const mysteryAdditions = additions;
  const noMysteryPizzaPrices = pizza.cost(false);
  pizza.addToppings(mysteryAdditions);
  const pizzaPrices = pizza.cost(false);
  const lastReceipt = document.querySelector("div.receipt:last-of-type");
  //Clone and modify an invisible receipt template
  let receipt = document.querySelector("div.receipt[id='0']").cloneNode(true);

  receipt.id = parseInt(lastReceipt.id) + 1;
  receipt.classList.remove("d-none")
  receipt.querySelector(".size-display").innerText = {4:"XSML", 8:"SML", 12:"MED", 13: "???", 16:"LRG", 36:"COL"}[pizza.size];
  receipt.querySelector(".size-price").innerText = displayNum(pizzaPrices[1]);

  for (let topping in standardToppings) {
    let li = document.createElement("li");
    li.classList = "stand-topping";
    li.innerText = standardToppings[topping];
    receipt.querySelector(".topping-writeup").classList.remove("d-none");
    receipt.querySelector(".topping-list").append(li);
  }
  receipt.querySelector(".topping-price").innerText = displayNum(noMysteryPizzaPrices[0]);
  
  for (let topping in mysteryAdditions) {
    let li = document.createElement("li");
    li.classList = "mystery-topping";
    li.innerText = mysteryAdditions[topping];
    receipt.querySelector(".mystery-writeup").classList.remove("d-none");
    receipt.querySelector(".mystery-list").append(li);
  }
  receipt.querySelector(".mystery-price").innerText = displayNum(pizzaPrices[0] - noMysteryPizzaPrices[0]);

  receipt.querySelector(".sub-price").innerText = displayNum(pizzaPrices[0] + pizzaPrices[1]);
  receipt.querySelector(".tax-price").innerText = displayNum(pizzaPrices[2]);
  receipt.querySelector(".total-price").innerText = displayNum(pizza.cost());

  lastReceipt.after(receipt);
}

function handleFormSubmission(event) {
  event.preventDefault();

  let toppingArray = Array.from(document.querySelectorAll(`#topping-dropdown input:checked`));
  const toppingValues = toppingArray.map(element => element.id === "custom-check" ? document.querySelector(element.dataset.target).value : element.value);
  const sizeValue = document.querySelector("#size-dropdown input:checked") ? document.querySelector("#size-dropdown input:checked").value : "13";
  const mysteryValue = document.querySelector("#mystery-amount").value;
  
  let orderedPizza = new Pizza(sizeValue, toppingValues);
  const mysteryAdditions = Pizza.getMysteryTopping(mysteryValue);
  
  displayPizza(orderedPizza, mysteryAdditions);

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