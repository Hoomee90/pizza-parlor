// Business Logic

class Pizza {
  constructor (size, ...toppings) {
    this.size = size;
    this.toppings = [...toppings];
  }
}