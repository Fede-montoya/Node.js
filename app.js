const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = 8080; 

const productManager = new ProductManager(); // Instancia de la clase ProductManager

// Endpoint para obtener todos los productos con un límite opcional
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
