// Productos iniciales (predeterminados)
const defaultProducts = [
  {
    name: "Cuaderno diseño de Gato",
    price: 120,
    image: "https://img.ltwebstatic.com/images3/spmp/2023/09/14/7f/16946787308826fccfaba21255965d921aacb1d381_thumbnail_720x.webp",
    quantity: 4
  },
  {
    name: "Bolígrafos de gato",
    price: 80,
    image: "https://img.ltwebstatic.com/images3/spmp/2024/07/14/a9/17209453727251e8321566aee8b75e7a29354abbc6_thumbnail_720x.webp",
    quantity: 5
  },
  {
    name: "Set de papelería pata de gato",
    price: 210,
    image: "https://dreamwithkat.de/cdn/shop/files/9-pcsset-cute-cat-paw-stationery-kawaii-essentials.webp?v=1730275056",
    quantity: 3
  },
  {
    name: "Notas adhesivas",
    price: 45,
    image: "https://ae01.alicdn.com/kf/S83064cea999b487baa21499c9538ca133.jpg_640x640.jpg_.webp",
    quantity: 7
  },
  {
    name: "Resaltadores color pastel",
    price: 120,
    image: "https://img.ltwebstatic.com/images3/spmp/2023/07/07/16887195319fda92c7e624f9feefc8d011834b985c_thumbnail_750x999.webp",
    quantity: 5
  },
  {
    name: "Set papelería gradiente",
    price: 90,
    image: "https://ae01.alicdn.com/kf/S7e824772872c4201aa22ee117b05365eF.jpg?width=750&height=1000&hash=1750",
    quantity: 5
  },
  {
    name: "Harry Cat cuaderno",
    price: 200,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-5lQU9HfLEPlrY9CQHdqLCeB2qE1XPfWK_mX5piBjSSn3bG1N",
    quantity: 4
  },
  {
    name: "Termo de acero inoxidable",
    price: 250,
    image: "https://m.media-amazon.com/images/I/51ThXe+ez5L._AC_UF350,350_QL80_.jpg",
    quantity: 3
  },
  {
    name: "Mochila escolar de gato",
    price: 320,
    image: "https://ae01.alicdn.com/kf/Hc4ea0e39a889453f9d79f21b11c432f1z.jpg_960x960.jpg",
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

