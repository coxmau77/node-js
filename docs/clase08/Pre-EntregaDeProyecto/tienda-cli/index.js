const API_URL = 'https://fakestoreapi.com/products';

// --- 1. Service Functions (Modular Code) ---

const getAllProducts = async () => {
  console.log('Fetching all products...');
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const products = await response.json();
  console.log('All Products:');
  console.log(products);
};

const getProductById = async (id) => {
  console.log(`Fetching product with ID: ${id}...`);
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const product = await response.json();
  console.log('Product Found:');
  console.log(product);
};

const createProduct = async (args) => {
  const [_c, _e, title, price, category] = args;
  if (!title || !price || !category) {
    console.log('Error: Please provide title, price, and category.');
    console.log('Example: npm run start POST products "New T-Shirt" 12.99 clothing');
    return;
  }

  console.log('Creating a new product...');
  const newProduct = { title, price: parseFloat(price), category, description: 'A default description', image: 'https://i.pravatar.cc' };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const createdProduct = await response.json();
  console.log('Product Created Successfully:');
  console.log(createdProduct);
};

const updateProduct = async (id, args) => {
  const [_c, _e, title, price, category] = args;
  if (!title || !price || !category) {
    console.log('Error: Please provide title, price, and category for update.');
    console.log('Example: npm run start PUT products/1 "Updated T-Shirt" 15.99 clothing');
    return;
  }

  console.log(`Updating product with ID: ${id}...`);
  const updatedProduct = { title, price: parseFloat(price), category };

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct)
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result = await response.json();
  console.log('Product Updated Successfully (simulation):');
  console.log(result);
};

const deleteProduct = async (id) => {
  console.log(`Deleting product with ID: ${id}...`);
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const deletedProduct = await response.json();
  console.log('Product Deleted Successfully (simulation):');
  console.log(deletedProduct);
};

const showHelp = () => {
  console.log(`Command not recognized or incomplete.`);
  console.log('Available commands:');
  console.log('  - npm run start GET products');
  console.log('  - npm run start GET products/<id>');
  console.log('  - npm run start POST products <title> <price> <category>');
  console.log('  - npm run start PUT products/<id> <title> <price> <category>');
  console.log('  - npm run start DELETE products/<id>');
};

// --- 2. Main Controller ---

const main = async () => {
  try {
    const args = process.argv.slice(2);
    const [command, entity] = args;
    const [entityName, id] = (entity || '').split('/');

    if (command === 'GET' && entityName === 'products') {
      id ? await getProductById(id) : await getAllProducts();
    } else if (command === 'POST' && entityName === 'products') {
      await createProduct(args);
    } else if (command === 'PUT' && entityName === 'products' && id) {
      await updateProduct(id, args);
    } else if (command === 'DELETE' && entityName === 'products' && id) {
      await deleteProduct(id);
    } else {
      showHelp();
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    console.log('Execution finished.');
  }
};

main();
