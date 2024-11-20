// Cargar los productos desde localStorage (si existen)
function loadProducts() {
  // Intentamos obtener los productos desde localStorage
  const storedProducts = localStorage.getItem('products');

  // Si existen productos guardados, los parseamos de JSON a un objeto de JavaScript
  if (storedProducts) {
    return JSON.parse(storedProducts);
  } else {
    // Si no hay productos guardados, devolvemos un array vacío
    return [];
  }
}

// Guardar los productos en localStorage
function saveProducts() {
  // Convertimos el array de productos a formato JSON
  localStorage.setItem('products', JSON.stringify(products));
}

// Array de productos iniciales (cargado desde localStorage)
let products = loadProducts(); // Cargamos los productos guardados en localStorage

// Función para renderizar los productos en la página
function renderProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Limpiamos el contenido del contenedor antes de agregar nuevos productos

  // Iteramos sobre el array de productos y generamos una tarjeta para cada uno
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price}</div>
      <div class="product-quantity">
        <label for="quantity-${index}">Cantidad:</label>
        <input type="number" id="quantity-${index}" value="${product.quantity}" min="0" onchange="updateQuantity(${index})">
      </div>
      <button class="delete-btn" onclick="deleteProduct(${index})">X</button>
    `;
    productList.appendChild(productCard);
  });
}

// Función para actualizar la cantidad de un producto
function updateQuantity(index) {
  const newQuantity = document.getElementById(`quantity-${index}`).value;
  products[index].quantity = parseInt(newQuantity, 10);
  
  saveProducts(); // Guardamos los productos actualizados en localStorage
  renderProducts(); // Volvemos a renderizar los productos para reflejar el cambio
}

// Función para eliminar un producto
function deleteProduct(index) {
  products.splice(index, 1); // Elimina el producto del array

  saveProducts(); // Guardamos los productos actualizados en localStorage
  renderProducts(); // Volvemos a renderizar los productos
}

// Función para agregar un nuevo producto al inventario mediante el formulario
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene el envío del formulario

  // Obtiene los valores ingresados en el formulario
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productImage = document.getElementById('productImage').value;
  const productQuantity = document.getElementById('productQuantity').value;

  // Si todos los campos están llenos, agregamos el nuevo producto
  if (productName && productPrice && productImage && productQuantity) {
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: parseInt(productQuantity, 10)
    };

    products.push(newProduct); // Agregamos el nuevo producto al array

    saveProducts(); // Guardamos los productos actualizados en localStorage
    renderProducts(); // Volvemos a renderizar los productos
    productForm.reset(); // Limpiamos el formulario después de agregar el producto
  }
});

// Llamamos a la función renderProducts cuando la página se carga
renderProducts();
