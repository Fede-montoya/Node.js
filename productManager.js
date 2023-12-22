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
  
  // Exportar la clase utilizando module.exports
  module.exports = ProductManager;
  