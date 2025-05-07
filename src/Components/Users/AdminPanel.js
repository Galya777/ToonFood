import React, { useState } from 'react';

function AdminPanel() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    rating: 0,
    restaurant: '',
    categories: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      alert('Продуктът е добавен успешно!');
    } catch (error) {
      console.error('Грешка при добавяне:', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Добави нов продукт</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Име" onChange={handleChange} required />
        <input type="text" name="price" placeholder="Цена" onChange={handleChange} required />
        <input type="text" name="image" placeholder="Път до изображение" onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Рейтинг (1-5)" min="1" max="5" onChange={handleChange} />
        <button type="submit">Добави</button>
      </form>
    </div>
  );
}

export default AdminPanel;
