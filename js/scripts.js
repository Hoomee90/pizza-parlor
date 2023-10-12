// Business Logic

class Pizza {
  constructor (size, ...toppings) {
    this.size = size;
    this.toppings = [...toppings];
  }
  cost() {
    const toppingsCalculated = this.toppings.reduce((accCost, currentTopping, currentToppingNum) => (accCost + ((currentTopping.match(/[euioa]/gi)).length + 1) * (currentToppingNum + 1) / 4), 0);
    return toppingsCalculated;
  }
}