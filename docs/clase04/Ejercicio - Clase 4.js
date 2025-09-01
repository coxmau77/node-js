const automoviles = [
  { marca: "Toyota", modelo: "Corolla", año: 2020, color: "red" },
  { marca: "Ford", modelo: "Focus", año: 2019, color: "blue" },
  { marca: "Chevrolet", modelo: "Malibu", año: 2021, color: "black" },
  { marca: "Honda", modelo: "Civic", año: 2020, color: "red" },
  { marca: "Nissan", modelo: "Sentra", año: 2018, color: "gray" },
  { marca: "Volkswagen", modelo: "Jetta", año: 2019, color: "silver" },
  { marca: "Hyundai", modelo: "Elantra", año: 2020, color: "blue" },
  { marca: "Kia", modelo: "Forte", año: 2021, color: "yellow" },
  { marca: "Mazda", modelo: "3", año: 2020, color: "blue" },
  { marca: "Subaru", modelo: "Impreza", año: 2021, color: "light blue" },
  { marca: "Tesla", modelo: "Model 3", año: 2022, color: "white" },
  { marca: "Mazda", modelo: "CX-5", año: 2021, color: "green" },
];

// automóviles cuyo año sea mayor a 2018
const automovilesFiltrados = automoviles.filter((auto) => auto.año > 2018);
// console.log(automovilesFiltrados);

// 1. Crea una función que recorra el array de automóviles.
// 2. Usa destructuring dentro de la función para obtener el color de cada automóvil.
// 3. La función debe aceptar un color como parámetro y devolver por consola cuántos automóviles tienen ese color.
function contarAutomovilesPorColor(color) {
  const automovilesFiltrados = automoviles.filter(
    (auto) => auto.color === color
  );
  console.log(
    `Hay ${automovilesFiltrados.length} automóviles de color ${color}.`
  );
}

// contarAutomovilesPorColor("red");
// contarAutomovilesPorColor("blue");
// contarAutomovilesPorColor("green");

// Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
      console.log(`Hola, me llamo ${this.name} y tengo ${this.age} años.`);
    };
  }
}

// Creación de instancias
const person1 = new Person("María", 30);
const person2 = new Person("Juan", 25);

// Llamado a la clase
// person1.sayHi(); // Hola, me llamo María y tengo 30 años.
// person2.sayHi(); // Hola, me llamo Juan y tengo 25 años.

// Veamos algunos ejemplos de cómo declarar y trabajar con clases:
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  login(inputEmail, inputPassword) {
    return this.email === inputEmail && this.password === inputPassword
      ? "Login exitoso"
      : "Credenciales incorrectas";
  }
}

class Seller extends User {
  constructor(name, email, password, storeName, sells, incomes) {
    super(name, email, password);
    this.storeName = storeName;
    this.sells = sells;
    this.incomes = incomes;
  }

  sellProduct(product) {
    console.log(
      `${this.name} ha vendido ${product} en su tienda ${this.storeName}.`
    );
  }

  addNewSale(amount) {
    this.sells += 1; // Incrementa el contador de ventas
    this.incomes += amount; // Agrega el monto al total de ingresos

    return `Sale added! total sales: ${this.sells}, total incomes: $${this.incomes}`;
  }
}

class Buyer extends User {
  constructor(
    name,
    email,
    password,
    purchaseHistory,
    address,
    purchases,
    balance
  ) {
    super(name, email, password);
    this.purchaseHistory = purchaseHistory;
    this.address = address;
    this.purchases = purchases;
    this.balance = balance;
  }

  makePurchase(amount) {
    if (this.balance >= amount) {
      this.balance -= amount; // Resta el monto del balance
      this.purchases += 1; // Incrementa el contador de compras
      return `Compra realizada por $${this.balance}, total compras: ${this.purchases}`;
    } else {
      return "Fondos insuficientes";
    }
  }

  addPurchase(product, amount) {
    this.purchaseHistory.push({ product, amount });
    return `Purchase added: ${product} for $${amount}`;
  }

  getTotalSpent() {
    return this.purchaseHistory.reduce((total, item) => total + item.amount, 0);
  }
}

const user1 = new User("John", "j@correo.com", "jhon123");
const seller1 = new Seller("Juan", "j@correo.com", "juan123", "centro", 0, 0);
const buyer1 = new Buyer("Caro", "c@correo.com", "caro123", "Calle 123", 0, 0);

seller1.login("j@correo.com", "juan123");
buyer1.login("c@correo.com", "caro123");

// console.log(seller1.addNewSale(500)); // Sale added! total sales: 1, total incomes: $500
