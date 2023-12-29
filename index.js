const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = './productos.json';
        
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProducts(products);
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    getProductById(productId) {
        const products = this.getProducts();
        return products.find(product => product.id === productId) || null;
    }

    updateProduct(productId, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            updatedProduct.id = productId;
            products[index] = updatedProduct;
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    generateId(products) {
        if (!products || products.length === 0) {
            return 1;
        }
        return Math.max(...products.map(product => product.id)) + 1;
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

// Ejemplo de uso
const filePath = 'productos.json';
const productManager = new ProductManager(filePath);

const newProduct = {
    title: 'Nuevo Producto',
    description: 'Descripción del nuevo producto',
    price: 24.99,
    thumbnail: 'ruta/imagen/nueva.jpg',
    code: 'ABC123',
    stock: 15
};

productManager.addProduct(newProduct);

const allProducts = productManager.getProducts();
console.log('Todos los productos:');
console.log(allProducts);

const productIdToGet = 1;
const productById = productManager.getProductById(productIdToGet);
console.log(`\nProducto con ID ${productIdToGet}:`);
console.log(productById);

const productIdToUpdate = 1;
const updatedProductInfo = {
    title: 'Producto Actualizado',
    description: 'Descripción actualizada',
    price: 29.99,
    thumbnail: 'ruta/imagen/actualizada.jpg',
    code: 'XYZ456',
    stock: 5
};

const successUpdate = productManager.updateProduct(productIdToUpdate, updatedProductInfo);
if (successUpdate) {
    console.log(`\nProducto con ID ${productIdToUpdate} actualizado:`);
    console.log(productManager.getProductById(productIdToUpdate));
} else {
    console.log(`\nNo se encontró el producto con ID ${productIdToUpdate}.`);
}

const productIdToDelete = 2;
const successDelete = productManager.deleteProduct(productIdToDelete);
if (successDelete) {
    console.log(`\nProducto con ID ${productIdToDelete} eliminado.`);
} else {
    console.log(`\nNo se encontró el producto con ID ${productIdToDelete}.`);
}
