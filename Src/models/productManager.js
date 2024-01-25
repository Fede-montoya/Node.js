const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]', { encoding: 'utf-8' });
        }
    }

    getProducts() {
        try {
            const fileData = fs.readFileSync(this.path, { encoding: 'utf-8' });
            return JSON.parse(fileData);
        } catch (error) {
            console.log(`Error al leer el archivo: ${error}`);
            return [];
        }
    }

    getProductById(id) {
        let products = this.getProducts();
        const existeLaId = products.find((product) => product.id === id);
        if (existeLaId) {
            return existeLaId;
        } else {
            return false;
        }
    }

    addProduct({ title, description, price, code, status, stock, category, thumbnail }) {
        let products = this.getProducts();

        if (!products.some((product) => product.code === code)) {
            const nuevaId = products.length + 1; // Usar un contador incremental como ID
            const nuevoProducto = { id: nuevaId, title, description, price, code, status, stock, category, thumbnails: [thumbnail] || [] };

            products.push(nuevoProducto);
            this.saveProduct(products);

            return true;
        } else {
            return false;
        }
    }

    saveProduct(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2), { encoding: 'utf-8' });
    }

    updateProduct(id, updatedFields) {
        let products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            this.saveProduct(products);
            return true;
        } else {
            return false;
        }
    }

    deleteProduct(id) {
        let products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            this.saveProduct(products);
            return true;
        } else {
            return false;
        }
    }
}

const productManager = new ProductManager('../json/products.json');

const newProducts = [
    {
        "title": "Hamburguesa de carne",
        "description": "Jugosa hamburguesa de carne de res a la parrilla",
        "price": 5000.99,
        "thumbnail": "carne_thumbnail.jpg",
        "code": "XYZ456",
        "stock": 25
    },
    {
        "title": "Hamburguesa de Cerdo",
        "description": "Sabrosa hamburguesa de carne de cerdo",
        "price": 4200.99,
        "thumbnail": "cerdo_thumbnail.jpg",
        "code": "CER001",
        "stock": 30
    },
    {
        
        "title": "Hamburguesa Vegana",
        "description": "Hamburguesa vegana con ingredientes frescos",
        "price": 4700.99,
        "thumbnail": "vegana_thumbnail.jpg",
        "code": "VEG001",
        "stock": 20
      },
      {
        "id": 4,
        "title": "Hamburguesa de pollo",
        "description": "La mejor hamburguesa de pollo",
        "price": 4500.99,
        "thumbnail": "pollo_thumbnail.jpg",
        "code": "POL123",
        "stock": 15
        
      },
      {
       
        "title": "Hamburguesa de pollo",
        "description": "La mejor hamburguesa de pollo",
        "price": 4500.99,
        "thumbnail": "pollo_thumbnail.jpg",
        "code": "POL123",
        "stock": 15   
      },
      {
    
       "title": "Hamburguesa 4 quesos",
       "description": "Exquisita hamburguesa con una mezcla decadente de quesos cheddar, suizo, pepper jack y queso azul.",
       "price": 5100.99,
       "thumbnail": "4quesos_thumbnail.jpg",
       "code": "ABC123",
       "stock": 15   
     },
     {
         "title": "Hamburguesa blue cheese",
         "description": "Hamburguesa gourmet con queso azul crujiente",
         "price": 4800.99,
         "thumbnail": "Bcheese_thumbnail.jpg",
         "code": "ABC123",
         "stock": 15   
       },
       {
       
       "title": "Hamburguesa hawaiana",
       "description": "Hamburguesa tropical con jugosa carne con piña asada",
       "price": 5000.99,
       "thumbnail": "hawaiana_thumbnail.jpg",
       "code": "ABC123",
       "stock": 15   
      },
      {
       "title": "Hamburguesa picante",
       "description": "Hamburguesa con un toque picante",
       "price": 5000.99,
       "thumbnail": "picante_thumbnail.jpg",
       "code": "ABC123",
       "stock": 15   
      },
      {
       "title": "Hamburguesa ahumada",
       "description": "Hamburguesa con un sutil sabor ahumado",
       "price": 5000.99,
       "thumbnail": "ahumada_thumbnail.jpg",
       "code": "ABC123",
       "stock": 15   
      },
      {
       "title": "Hamburguesa de pescado",
       "description": "Delicada hamburguesa de pescado, con una textura ligera y un sabor fresco del mar.",
       "price": 5500.99,
       "thumbnail": "pescado_thumbnail.jpg",
       "code": "ABC123",
       "stock": 10   
      }
      
];

try {
    newProducts.forEach(product => {
        productManager.addProduct(product);
    });

    console.log('Productos:', productManager.getProducts());
    console.log("--------------------------");
    console.log('Producto con ID 2:', productManager.getProductById(2));
    console.log("--------------------------");

    console.log('Se editó el precio del producto con ID 2:', productManager.updateProduct(2, { price: 200 }));
    console.log("--------------------------");

    console.log('Se eliminó el producto con ID 3');
    productManager.deleteProduct(3);
} catch (error) {
    console.error(error.message);
}

module.exports = ProductManager;
