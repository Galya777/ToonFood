require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');
const path = require('path'); // за работа със статични файлове
const app = express();

// Потребителски CORS настройки
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Свързано с MongoDB!'))
  .catch((err) => console.error('🔴 Грешка при връзка с MongoDB:', err));


 const Product = require('./models/Product');

// Статични файлове (например HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // Папката 'public' съдържа HTML файловете

// Най-популярните 10 продукта (сортирани по rating)
app.get('/api/products/popular', async (req, res) => {
  try {
    const topProducts = await Product.find().sort({ rating: -1 }).limit(10);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при зареждане на популярните продукти.' });
  }
});

// GET заявка за връщане на всички продукти
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Проблем при зареждане на продуктите.' });
  }
});

// Продукти по ресторант
app.get('/api/products/restaurant/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.find({
      restaurant: { $regex: new RegExp(`^${name}$`, 'i') } // case-insensitive
    });

    if (products.length === 0) {
      return res.status(404).json({ message: `Няма продукти от ресторанта "${name}".` });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при търсене на ресторант продукти.' });
  }
});

// Продукти по категория
app.get('/api/products/categories/:name', async (req, res) => {
  const { name } = req.params;

  try {
    let products;

    if (name.toLowerCase() === 'other') {
      // Find products with no categories or empty category arrays
      products = await Product.find({
        $or: [
          { categories: { $exists: false } },
          { categories: { $size: 0 } },
        ]
      });
    } else {
      products = await Product.find({ categories: name });
    }

    if (products.length === 0) {
      return res.status(404).json({ message: 'Няма продукти!' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при търсене на продукти.' });
  }
});




// POST заявка за добавяне на нов продукт
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Път за главната страница (ако искаш да връщаш HTML файл)
app.get('/', (req, res) => {
  res.send('Добре дошли в сайта за анимационни храни!');
});

// Стартиране на сървъра
app.listen(3001, () => {
  console.log('Сървърът работи на http://localhost:3001');
});
