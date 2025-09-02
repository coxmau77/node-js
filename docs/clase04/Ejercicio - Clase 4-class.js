class vehiculo {
  constructor(marca, modelo, año, color) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.color = color;
  }

  mostrarInfo() {
    console.log(
      `Vehículo: ${this.marca} ${this.modelo}, Año: ${this.año}, Color: ${this.color}`
    );
  }
}

const vehiculos = [
  new vehiculo("Toyota", "Corolla", 2020, "Rojo"),
  new vehiculo("Ford", "Focus", 2019, "Azul"),
  new vehiculo("Chevrolet", "Malibu", 2021, "Negro"),
  new vehiculo("Honda", "Civic", 2020, "Rojo"),
  new vehiculo("Nissan", "Sentra", 2018, "Gris"),
  new vehiculo("Volkswagen", "Jetta", 2019, "Plateado"),
  new vehiculo("Hyundai", "Elantra", 2020, "Azul"),
  new vehiculo("Kia", "Forte", 2021, "Amarillo"),
  new vehiculo("Mazda", "3", 2020, "Azul"),
  new vehiculo("Subaru", "Impreza", 2021, "Celeste"),
  new vehiculo("Tesla", "Model 3", 2022, "Blanco"),
  new vehiculo("Mazda", "CX-5", 2021, "Verde"),
];

vehiculos.forEach((vehiculo) => {
  vehiculo.mostrarInfo();
});

// Mostrar mayores al año 2018

function mostrarMayorA2018() {
  const vehiculosFiltrados = vehiculos.filter(
    (vehiculo) => vehiculo.año > 2018
  );
  vehiculosFiltrados.forEach((vehiculo) => {
    vehiculo.mostrarInfo();
  });
}

function mostrarPorColor(color) {
  const vehiculosFiltrados = vehiculos.filter(
    (vehiculo) => vehiculo.color === color
  );
  vehiculosFiltrados.forEach((vehiculo) => {
    vehiculo.mostrarInfo();
  });
}

console.log("-------------- Vehículos mayores al año 2018: ------------");
mostrarMayorA2018();
console.log("-------------- Vehículos de color Rojo: ------------");
mostrarPorColor("Rojo");
console.log("-------------- Vehículos de color Azul: ------------");
mostrarPorColor("Azul");
console.log("-------------- Vehículos de color Negro: ------------");
mostrarPorColor("Negro");

console.log("----------- Contar por color ----------------");
// Crea una función que recorra el array de automóviles
// Usa destructuring dentro de la función para obtener el color de cada automóvil.
// La función debe aceptar un color como parámetro y
// devolver por consola cuántos automóviles tienen ese color.

function contarPorColor(color) {
  const contador = vehiculos.reduce((acc, { color: colorVehiculo }) => {
    if (colorVehiculo === color) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log(`Cantidad de vehículos de color ${color}: ${contador}`);
}

contarPorColor("Rojo");
contarPorColor("Azul");
contarPorColor("Negro");
