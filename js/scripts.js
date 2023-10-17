// Business Logic

// Pre-ES6 this would look like
// function Pizza(size, ...toppings) { etc }
// Pizza.prototype.cost() { etc }

class Pizza {
  constructor (size, ...toppings) {
    this.size = size;
    this.toppings = [...toppings];
  }

  cost() {
    const toppingsCalculated = this.toppings.reduce((accCost, currentTopping, currentToppingNum) => (accCost + ((currentTopping.match(/[euioa]/gi) || []).length + 1) * (currentToppingNum + 1) / 4), 0);
    const sizeCalculated = 2 + Math.floor(this.size ** 1.5 / 2);
    return toppingsCalculated + sizeCalculated;
  }

  addToppings(newToppings) {
    if (Array.isArray(newToppings)) {
      this.toppings.push(...newToppings);
    } else if (newToppings) {
      this.toppings.push(newToppings);
    }
  }

  static getMysteryTopping(num) {
    let possibilities = ["bone meal", "fairy dust", "mind honey", "iron shavings", "catnip", "mystery eggs", "chalk", "spiders", "curdled milk", "ambiguously red soda", "unknown aquatic vertebrates", "cuttlefish"];
    const toAdd = possibilities.sort(() => Math.random() - 0.5).slice(0, num);
    return toAdd;
  }
}

// User Interface Logic

function handleFormSubmission(event) {
  event.preventDefault();
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
    sizeDropButton.innerText = `${document.querySelector("input[type='radio']:checked + *").innerText} Size Selected`;
  }
}

function handleMysteryInput(event) {
  if (event.target.classList.contains("show")) {
    event.target.innerText = "Yes Mystery Ingredients"
  } else {
    document.querySelector("#mystery-amount").value = null;
    event.target.innerText = "No Mystery Ingredients"
  }
}

window.addEventListener("load", () => {
  document.querySelector("form#pizza-form").addEventListener("submit", handleFormSubmission);
  document.querySelectorAll("input.form-check-input").forEach(element => element.addEventListener("change", updateCheckboxButtons));
  document.querySelector("#mystery-button").addEventListener("click", handleMysteryInput);
});