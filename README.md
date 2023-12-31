# Pizza's Pizza

#### By **Samantha Callie**

#### Customize your own pizza to (not) order

### [See it here](https://hoomee90.github.io/pizza-parlor/)

## Technologies Used

* HTML
* CSS
* BootStrap
* JS

## Description

This browser page is a form which allows users to order a custom pizza via form. They can choose size, toppings (including custom!) and whether to add something mysterious as well. The site will then display a receipt of the pizza, including its price.

## Setup/Installation Requirements

* Clone repository
* Navigate to the top level of the directory
* Open index.html in your browser

## Known Bugs

* There are no known bugs on the site

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

Copyright (c) 2023 Samantha Callie

## Pseudocode Tests Used During Development

Describe: Pizza constructor()

Test: "It should return a Pizza with a size property and toppings property made of array of any number of inputs"
Code: 
const madePizza = new Pizza(4, ["peperoni", "sopor slime"]);
Expected Output: Pizza { size: 4, toppings: ["peperoni", "sopor slime"] }

Describe: .cost()

Test: "It shouldn't return anything if the Pizza has no size"
Code: 
const madePizza = new Pizza();
madePizza.cost();
Expected Output: undefined

Test: "It should return a cost based on the sum of all numbers derived from toppings"
Code: 
const madePizza = new Pizza(4, "peperoni", "sopor slime");
madePizza.cost();
Expected Output: 3.75

Test: "It should factor in the size as well"
Code: 
const madePizza = new Pizza(8, "peperoni", "sopor slime");
madePizza.cost();
Expected Output: 16.75

Test: "It should be able to display the constituent prices based on input"
Code: 
const madePizza = new Pizza(8, "peperoni", "sopor slime");
madePizza.cost(false);
Expected Output: [3.75, 13, 1];

Describe: .getMysteryTopping()

Test: "It should return an empty array if the input is zero" 
Code:
const amount = 0;
const madePizza = new Pizza(8, "peperoni", "sopor slime");
Pizza.getMysteryTopping(amount);
Expected Output: []

Test: "The array should contain a random mystery topping if the input is one" 
Code:
const amount = 1
const madePizza = new Pizza(8, "peperoni", "sopor slime");
Pizza.getMysteryTopping(amount);
Expected Output: ["bone meal"]

Test: "It should be able to return different toppings on each execution" 
Code:
const amount = 1
const madePizza = new Pizza(8, "peperoni", "sopor slime");
Pizza.getMysteryTopping(amount);
Expected Output: ["fairy dust"]

Test: "It should be able to return two different toppings in the array if the input is 2" 
Code:
const amount = 2
const madePizza = new Pizza(8, "peperoni", "sopor slime");
Pizza.getMysteryTopping(amount);
Expected Output: ["bone meal", "fairy dust"]

Describe: .addToppings()

Test: "It should do nothing with falsey input"
Code: 
const madePizza = new Pizza();
madePizza.addToppings();
madePizza.toppings;
Expected Output: []

Test: "It should add non-array input into the object's toppings array"
Code: 
const madePizza = new Pizza();
const topping = "sopor slime"
madePizza.addToppings(topping);
madePizza.toppings;
Expected Output: ["sopor slime"]

Test: "It should add each element of an array into the object's toppings array"
Code: 
const madePizza = new Pizza();
const topping = ["sopor slime", "pink sugar free soda"]
madePizza.addToppings(topping);
madePizza.toppings
Expected Output: ["sopor slime", "pink sugar free soda"]

