// Trending.js or Trending.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ NEW
import './trending.css';

// This is your sample product list
const products = [
  {
    id: 1,
    name: 'Leather Sneakers',
    price: '$89.99',
    sizes: [38, 39, 40, 41, 42, 43],
    image: '/Images/learthersneaker.avif',
    description: 'Stylish and comfortable for daily wear.',
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: '$119.00',
   sizes: ['S', 'M', 'L', 'XL'],
    image: '/Images/denimjacket.avif',
    description: 'A timeless wardrobe essential.',
  },
  {
    id: 3,
    name: 'Smartwatch Pro',
    price: '$199.99',
   sizes: ['S', 'M', 'L', 'XL'],
    image: '/Images/smartwatch.avif',
    description: 'Stay connected and track your health.',
  },
];

const Trending = () => {
  const navigate = useNavigate(); // ✅ For navigation

  // ✅ This runs when a card is clicked
  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <section className="trending-section py-5">
      <Container>
        <h2 className="text-center mb-4 trending-title">Trending</h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={6} md={4} lg={3}>
              <Card
                className="h-100 trending-card"
                onClick={() => handleCardClick(product)} // ✅ send full product
                style={{ cursor: 'pointer' }}
              >
                <Card.Img variant="top" src={product.image} className="trending-img" />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-1">{product.description}</Card.Text>
                  <Card.Text><strong>{product.price}</strong></Card.Text>
                  <Card.Text className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    {product.size}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
