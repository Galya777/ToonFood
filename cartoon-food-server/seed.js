
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
        {
          name: "Krusty Burger",
          price: 8.99,
          image: "/images/krusty-burger.jpg",
          description: "Classic fast-food burger from The Simpsons' Krusty Burger.",
          rating: 4,
          restaurant: "The Simpsons",
          categories: ["fast food", "burger"]
        },
        {
          name: "Bob's Burger",
          price: 9.49,
          image: "/images/bobs-burgers.jpg",
          description: "A signature burger from Bob's Burgers—simple, delicious, and punny.",
          rating: 4,
          restaurant: "Bob's Burgers",
          categories: ["fast food", "burger"]
        },
        {
          name: "Pizza Planet Slice",
          price: 3.99,
          image: "/images/pizza-planet.jpg",
          description: "Out-of-this-world slice from Toy Story's Pizza Planet.",
          rating: 4,
          restaurant: "Pizza Planet",
          categories: ["fast food", "pizza"]
        },
        {
          name: "The Grey Stuff",
          price: 4.5,
          image: "/images/gray-stuff-photo-u1.jpg",
          description: "Try the grey stuff—it's delicious! Inspired by Beauty and the Beast.",
          rating: 5,
          restaurant: "Beauty and the Beast",
          categories: ["dessert"]
        },
        {
          name: "Bangarang Pie",
          price: 6.5,
          image: "/images/bangarangpie.jpg",
          description: "A triumphant, sweet pie inspired by Hook.",
          rating: 4,
          restaurant: "Hook",
          categories: ["dessert"]
        },
        {
          name: "Brock's Hearty Stew",
          price: 7.25,
          image: "/images/brock-stew.jpg",
          description: "A comforting stew as seen with Brock on the Pokémon trail.",
          rating: 4,
          restaurant: "Pokémon",
          categories: ["soup", "dish"]
        },
        {
          name: "Chokey Chicken Bucket",
          price: 10.5,
          image: "/images/chokey-chicken.jpg",
          description: "A crispy bucket from Rocko's Modern Life's Chokey Chicken.",
          rating: 3,
          restaurant: "Rocko's Modern Life",
          categories: ["fast food", "chicken"]
        },
        {
          name: "Fudd Beer",
          price: 3.5,
          image: "/images/JoshuaBudich_12up-FuddBeer-915x915.jpg",
          description: "A Springfield classic brew—definitely not Duff.",
          rating: 3,
          restaurant: "The Simpsons",
          categories: ["drink"]
        },
        {
          name: "Malk",
          price: 1.99,
          image: "/images/JoshuaBudich_12up-Malk.jpg",
          description: "Now with vitamin R. A school lunch special from The Simpsons.",
          rating: 2,
          restaurant: "The Simpsons",
          categories: ["drink"]
        },
        {
          name: "Drunken Clam Ale",
          price: 4.25,
          image: "/images/drunken-clam.jpg",
          description: "House ale from the Drunken Clam in Quahog.",
          rating: 3,
          restaurant: "Family Guy",
          categories: ["drink"]
        },
        {
          name: "Frying Dutchman Platter",
          price: 13.99,
          image: "/images/frying-dutchman.jpg",
          description: "All-you-can-eat seafood experience—terms and conditions apply.",
          rating: 3,
          restaurant: "The Simpsons",
          categories: ["dish", "seafood"]
        },
        {
          name: "Gusteau's Ratatouille",
          price: 12.75,
          image: "/images/gusteaus-restaurant.jpg",
          description: "A humble, refined vegetable medley inspired by Remy's masterpiece.",
          rating: 5,
          restaurant: "Gusteau's",
          categories: ["dish", "vegetarian"]
        },
        {
          name: "Flaming Moe",
          price: 6.0,
          image: "/images/moes-tavern.jpg",
          description: "A secret-recipe beverage from Moe's Tavern. Handle with care.",
          rating: 4,
          restaurant: "The Simpsons",
          categories: ["drink"]
        },
      // добави и останалите продукти тук
    ];

    // Добавяне без изтриване: вмъкни само липсващите по име
    for (const p of products) {
      const exists = await Product.findOne({ name: p.name });
      if (!exists) {
        await Product.create(p);
      }
    }

    console.log('✅ Продуктите са добавени/обновени без изтриване!');
    mongoose.disconnect();
  })
  .catch(err => console.error('🔴 Грешка при добавяне:', err));
