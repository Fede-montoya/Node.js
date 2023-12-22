class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const isCodeDuplicate = this.products.some(product => product.code === code);
      if (isCodeDuplicate) {
        console.error("El código del producto ya existe");
        return;
      }
  
      // Agregar producto con id autoincrementable
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find(product => product.id === id);
  
      if (foundProduct) {
        return foundProduct;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción 1", 3500.99, "img1.jpg", "P1", 100);
  productManager.addProduct("Producto 2", "Descripción 2", 2600.99, "img2.jpg", "P2", 50);
  
  console.log("Lista de productos:", productManager.getProducts());
  
  const productIdToSearch = 1;
  const foundProduct = productManager.getProductById(productIdToSearch);
  console.log(`Producto con ID ${productIdToSearch}:`, foundProduct);
