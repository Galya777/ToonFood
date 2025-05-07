let products = require('./data/products');

app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price || !newProduct.image) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  newProduct.id = products.length + 1;
  products.push(newProduct);

  res.status(201).json({ message: 'Product added', product: newProduct });
});
