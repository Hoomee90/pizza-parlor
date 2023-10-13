// Business Logic

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
  static getMysteryTopping(num) {
    let possibilities = ["bone meal", "fairy dust"];
    let toAdd = possibilities.sort(() => Math.random() - 0.5).slice(0, num);
    return toAdd;
  }
}

//[...possibilities[Math.floor(Math.random() * (possibilities.length))]]