// Productos iniciales (predeterminados)
const defaultProducts = [
  {
    name: "Cuaderno diseño de Gato",
    price: 120,
    image: "img/cuaderno-gato.jpg",
    quantity: 4
  },
  {
    name: "Bolígrafos de gato",
    price: 80,
    image: "img/boligrafo-gato.jpg",
    quantity: 5
  },
  {
    name: "Set de papelería pata de gato",
    price: 210,
    image: "img/set-paw.jpg",
    quantity: 3
  },
  {
    name: "Notas adhesivas",
    price: 45,
    image: "img/notas-adhesivas.jpg",
    quantity: 7
  },
  {
    name: "Resaltadores color pastel",
    price: 120,
    image: "img/marcadores-pastel.jpg",
    quantity: 5
  },
  {
    name: "Set papelería gradiente",
    price: 90,
    image: "img/set-degradado.jpg",
    quantity: 5
  },
  {
    name: "Harry Cat cuaderno",
    price: 200,
    image: "img/harry-cat.jpg",
    quantity: 4
  },
  {
    name: "Termo de acero inoxidable",
    price: 250,
    image: "img/termo-gato.jpg",
    quantity: 3
  },
  {
    name: "Mochila escolar de gato",
    price: 320,
    image: "img/mochila-gato.jpg",
    quantity: 3
  }
];

// Cargar los productos desde localStorage (si existen) o usar los productos predeterminados
function loadProducts() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts); // Si existen productos en localStorage, los devolvemos
  } else {
    // Si no existen productos, devolvemos los productos predeterminados y los guardamos en localStorage
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
  }
}

// Guardar los productos en localStorage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Array de productos iniciales (cargado desde localStorage o con productos predeterminados)
let products = loadProducts(); // Cargamos los productos guardados en localStorage o los predeterminados

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

// Función para agregar un nuevo producto
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

