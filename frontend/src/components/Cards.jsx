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
    <div className='page'>

    <header className="gallery-header">
    <h1 className="gallery-title">D'Cake House's Gallery</h1>
    <img src="../../images/logo.png" alt="Logo" className="gallery-logo" />
  </header>

    <div className="container">
  {selectedCategory === null ? (
    categories.map((cat, idx) => (
      <div key={idx} className="card-wrapper" onClick={() => setSelectedCategory(cat)}>
        <div
          className="card"
          style={{
            backgroundImage: `url(${API_BASE}/cakes/${cat}/wall.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px"
          }}
        />
        <div className="category-label">{cat}</div>
      </div>
        ))
      ) : (
        
        <div className="container">
            {/* Back Button as a card */}
            <div className="card back-card" onClick={goBack}>
              ← Back
            </div>

            {/* All the cake images */}
            {images.map((img, idx) => (
              <div key={idx} className="image-card-wrapper">
                <img
                  src={`${API_BASE}${img}`}
                  alt={`${selectedCategory}-${idx}`}
                  className="image-card"
                />
              </div>
            ))}
        </div>

        
      )}
    </div></div>
  );
};

export default Cards;

