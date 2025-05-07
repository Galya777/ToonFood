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


// Модел за продукт (Schema)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  restaurant: String,
  categories: [String],
});

const Product = mongoose.model('Product', productSchema);
// Статични файлове (например HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // Папката 'public' съдържа HTML файловете

let products = [
  // Примерни продукти, които ще се показват при стартиране на сървъра
  
    {
      id: 1,
      name: 'Krusty Krab Pizza',
      price: 12.99,
      image: '/images/krusty-krab-pizza.jpg',
      description: "The pizza that’s the pizza, for you and me! From the Krusty Krab.",
      rating: 5,
      restaurant: 'Krusty Krab',
      categories: 'fast food',
    },
    {
      id: 2,
      name: 'Butterbeer',
      price: 4.99,
      image: '/images/butterbeer.jpg',
      description: 'Sweet, creamy, and slightly fizzy — a wizard’s favorite drink from the world of Harry Potter.',
      rating: 4,
      restaurant: '',
      categories: 'fast food',
    },
    {
      id: 3,
      name: 'Scooby Snacks',
      price: 6.5,
      image: '/images/scooby-snacks.jpg',
      description: 'Crunchy, fun-shaped treats loved by Scooby-Doo — perfect for mystery-solving breaks!',
      rating: 5,
    },
      {
        id:4,
        name: 'Toon Burger',
        price: 9.99,
        image: '/images/toon-burger.jpg',
        description: 'A wacky burger from Toon Town!',
        rating: 2.5,
      },
      {
        id:5,
        name: "Pink Donut",
        price: "$2.50",
        image: "/images/pink-donut.jpg",
        description: "The iconic donut from Homer Simpson’s favorite place, Lard Lad’s.",
      },
         {
          id:6,
        name: "Turkey Leg",
        price: "$10.99",
        image: "/images/turkey-leg.jpg",
        description: "The Flintstones’ classic feast - a giant turkey leg for the prehistoric foodie.",
      },
      {
        id:7,
        name: "Jellyfish Jelly Sandwich",
        price: "$5.50",
        image: "/images/jellyfish-jelly-sandwich.jpg",
        description: "A tasty treat made with jellyfish jelly, straight from SpongeBob’s kitchen!",
      },
      {
        id:8,
        name: "Cheese",
        price: "$3.99",
        image: "/images/cheese.jpg",
        description: "Tom and Jerry’s favorite snack. Pure, delicious cheese.",
      },
      {
        id:9,
        name: "Bug Juice",
        price: "$2.99",
        image: "/images/bug-juice.jpg",
        description: "The strange but refreshing drink from Camp Lazlo, made from bug juice.",
      },
      {
        id:10,
        name: "Space Sandwich",
        price: "$8.99",
        image: "/images/space-sandwich.jpg",
        description: "A futuristic sandwich from Jimmy Neutron, made with the finest intergalactic ingredients.",
      },
      {
        id:11,
        name: "Triple Gooberberry Sunrise",
        price: "$5.99",
        image: "/images/triple-gooberberry-sunrise.jpg",
        description: "A wild and colorful drink made by the characters from Spongebob. Attention, it contains alcohol (somehow)!",
      },
      {
        id:12,
        name: "Everything Burrito",
        price: "$11.99",
        image: "/images/everything-burrito.jpg",
        description: "The infamous Everything Burrito from Adventure Time, with everything inside it!",
      },
    
  // Можеш да добавиш още продукти тук по подобие на горните
];

// GET заявка за връщане на всички продукти
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// POST заявка за добавяне на нов продукт
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Невалидни данни' });
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
