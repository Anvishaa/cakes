import React, { useEffect, useState } from 'react';
import '../styles/card.css';

const API_BASE = 'http://localhost:5000';

const Cards = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`${API_BASE}/api/categories/${selectedCategory}/images`)
        .then(res => res.json())
        .then(setImages)
        .catch(err => console.error('Error fetching images:', err));
    }
  }, [selectedCategory]);

  const goBack = () => {
    setSelectedCategory(null);
    setImages([]);
  };

  return (
    <div className="container">
      {selectedCategory === null ? (
        categories.map((cat, idx) => (
          <div key={idx} className="card" onClick={() => setSelectedCategory(cat)} style={{
            backgroundImage: `url(${API_BASE}/cakes/${cat}/wall.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
            <div className="category-label">{cat}</div>
          </div>
        ))
      ) : (
        <>
          <button className="back-btn" onClick={goBack}>← Back</button>
          <div className="container">
            {images.map((img, idx) => (
              <div key={idx} className="card">
                <img
                  src={`${API_BASE}${img}`}
                  alt={`${selectedCategory}-${idx}`}
                  className="image-card"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;

