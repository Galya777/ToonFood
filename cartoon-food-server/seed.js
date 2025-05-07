
require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Product'); // Пътят до твоя mongoose модел

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🟢 Свързан със база данни.');

    // Примерни продукти
    const products = [
      {
        name: 'Krusty Krab Pizza',
        price: 12.99,
        image: '/images/krusty-krab-pizza.jpg',
        description: 'The pizza that’s the pizza, for you and me! From the Krusty Krab.',
        rating: 5,
        restaurant: 'Krusty Krab',
        categories: ['fast food']
      },
      {
        name: 'Butterbeer',
        price: 4.99,
        image: '/images/butterbeer.jpg',
        description: 'Sweet, creamy, and slightly fizzy — a wizard’s favorite drink.',
        rating: 4,
        restaurant: 'Hogsmeade',
        categories: ['drink']
      },
      {
        name: 'Scooby Snacks',
        price: 6.5,
        image: '/images/scooby-snacks.jpg',
        description: 'Crunchy, fun-shaped treats loved by Scooby-Doo — perfect for mystery-solving breaks!',
        rating: 5,
      },
        {
          name: 'Toon Burger',
          price: 9.99,
          image: '/images/toon-burger.jpg',
          description: 'A wacky burger from Toon Town!',
          rating: 2.5,
        },
        {
          name: "Pink Donut",
          price: 2.50,
          image: "/images/pink-donut.jpg",
          description: "The iconic donut from Homer Simpson’s favorite place, Lard Lad’s.",
        },
           {
          name: "Turkey Leg",
          price: 10.99,
          image: "/images/turkey-leg.jpg",
          description: "The Flintstones’ classic feast - a giant turkey leg for the prehistoric foodie.",
        },
        {
          name: "Jellyfish Jelly Sandwich",
          price: 5.50,
          image: "/images/jellyfish-jelly-sandwich.jpg",
          description: "A tasty treat made with jellyfish jelly, straight from SpongeBob’s kitchen!",
        },
        {
          name: "Cheese",
          price: 3.99,
          image: "/images/cheese.jpg",
          description: "Tom and Jerry’s favorite snack. Pure, delicious cheese.",
        },
        {
          name: "Bug Juice",
          price: 2.99,
          image: "/images/bug-juice.jpg",
          description: "The strange but refreshing drink from Camp Lazlo, made from bug juice.",
        },
        {
          name: "Space Sandwich",
          price: 8.99,
          image: "/images/space-sandwich.jpg",
          description: "A futuristic sandwich from Jimmy Neutron, made with the finest intergalactic ingredients.",
        },
        {
          name: "Triple Gooberberry Sunrise",
          price: 5.99,
          image: "/images/triple-gooberberry-sunrise.jpg",
          description: "A wild and colorful drink made by the characters from Spongebob. Attention, it contains alcohol (somehow)!",
        },
        {
          name: "Everything Burrito",
          price: 11.99,
          image: "/images/everything-burrito.jpg",
          description: "The infamous Everything Burrito from Adventure Time, with everything inside it!",
        },
      // добави и останалите продукти тук
    ];

    // Изтрий старите и вмъкни новите
    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('✅ Продуктите са добавени!');
    mongoose.disconnect();
  })
  .catch(err => console.error('🔴 Грешка при добавяне:', err));
