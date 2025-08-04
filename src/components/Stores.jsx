import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './stores.css';

const stores = [
  {
    id: 1,
    name: 'Fashion Forward',
    image: '/Images/store11.avif',
    description: 'Premium clothing for modern professionals',
    path: '/store-details',
  },
  {
    id: 2,
    name: 'Urban Kicks',
    image: '/Images/store2.avif',
    description: 'Trendy footwear for all occasions',
    path: '/store-details',
  },
  {
    id: 3,
    name: 'Elegance',
    image: '/Images/store3.avif',
    description: "Elegant women's clothing and accessories",
    path: '/store-details',
  },
  {
    id: 4,
    name: 'Street Style',
    image: '/Images/store4.avif',
    description: 'Urban streetwear and casual footwear',
    path: '/store-details',
  },
  {
    id: 5,
    name: 'Comfort Steps',
    image: '/Images/store5.avif',
    description: 'Comfortable and stylish shoes',
    path: '/store-details',
  },
  {
    id: 6,
    name: 'Trendsetter',
    image: '/Images/store6.avif',
    description: 'Latest fashion trends for all',
    path: '/store-details',
  },
];

const Store = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold">🌟 Explore Our Stores</h2>
      <Row className="g-4">
        {stores.map((store) => (
          <Col key={store.id} xs={12} sm={6} md={4} lg={4}>
            <div className="store-card-modern" onClick={() => navigate(store.path)}>
              <div
                className="store-image"
                style={{ backgroundImage: `url(${store.image})` }}
              />
              <div className="store-content">
                <h5>{store.name}</h5>
                <p className="store-description">{store.description}</p>
                <Button className="visit-btn-modern" variant="outline-dark">
                  Visit Store
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Store;
