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
