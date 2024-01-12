const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
        this.filePath = './productos.json'; 
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        // ... (código de la función addProduct, sin cambios)
    }

    async getProducts(limit) {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const allProducts = JSON.parse(data);

            if (limit) {
                return allProducts.slice(0, parseInt(limit));
            } else {
                return allProducts;
            }
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const allProducts = JSON.parse(data);

            const foundProduct = allProducts.find(product => product.id === id);

            if (foundProduct) {
                return foundProduct;
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + error.message);
        }
    }
}

module.exports = ProductManager;
