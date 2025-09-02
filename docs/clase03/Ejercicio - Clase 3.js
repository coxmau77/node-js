const prices = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// devuelve un array con todos los precios + el 21%
const IVA = prices.map((price) => (price *= 1.21));

console.log(prices); // [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
console.log(IVA); // [121, 242, 363, 484, 605, 726, 847, 968, 1089, 1210]

// for of Price
for (const price of prices) {
  //   console.log(`El precio sin IVA es: ${price} y con IVA es: ${price * 1.21}`);
  console.log(`El precio sin IVA es: >> ${price.toFixed(2)}`);
}

IVA.forEach((price) => {
  console.log(`El precio con IVA es: >> ${price.toFixed(2)}`);
});

console.log("---------------------------------------------------");

// for of priceIVA
for (const priceIVA of IVA) {
  console.log(
    // `El precio sin IVA es: ${priceIVA / 1.21} y con IVA es: ${priceIVA}`
    `El precio con IVA es: ${priceIVA}`
  );
}

console.log("---------------------------------------------------");

// Filter prices mayores a 500
const filteredPrices = prices.filter((price) => price > 500);
console.log(`Precios sin IVA filtrados mayores a 500: ${filteredPrices}`);

const filteredIVA = IVA.filter((price) => price > 500);
console.log(`Precios con IVA filtrados mayores a 500: ${filteredIVA}`);

console.log("---------------------------------------------------");

// Precios desglosados
const desglosados = prices.map((price, index) => {
  return {
    id: index + 1,
    sinIVA: price,
    conIVA: price * 1.21,
  };
});

console.log(desglosados);

const desglose = desglosados.map((item) => {
  return `ID: ${item.id}, Precio sin IVA: ${item.sinIVA}, Precio con IVA: ${item.conIVA}`;
});

for (const item of prices) {
  console.log(`Precio sin IVA: ${item}, Precio con IVA: ${item * 1.21}`);
}
