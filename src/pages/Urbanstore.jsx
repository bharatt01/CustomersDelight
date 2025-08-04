import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import  Navbar from '../components/Navbar'
import './urbanstore.css';
import { useNavigate } from 'react-router-dom';
const products = [
  {
    id: 1,
    name: 'T-shirt',
    description:"Good Looking fashion",
    image: '/Images/women.jpg',
  },
  {
    id: 2,
    name: 'Jeans',
   
    image: '/Images/jeansu.jpg',
     description:"Good Looking",
  },
  {
    id: 3,
    name: 'Shorts',
    image: '/Images/shorts.webp',
     description:"Good Looking",
  },
  {
    id: 4,
    name: 'Sneakers',
    image: '/Images/store5.avif',
     description:"Good Looking",
  },
];

const StorePage = () => {
      const navigate = useNavigate(); 


 const handleCardClick = (product) => {
  const storeName = 'Urban Store';
  const phoneNumber = '919717024896'
  navigate(`/product/${product.id}`, {
    state: { ...product, storeName, phoneNumber }, 
  });
};

  return (
    <>
    <Navbar/>
   <img src="/Images/urbanstore.png" className="urban-banner" alt="Fashion Banner" />

   <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Welcome to Urban Store</h2>
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={3}>
            <Card className="product-card h-100" onClick={() => handleCardClick(product)} // ✅ send full product
                style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={product.image} className="product-img" />
              <Card.Body>
                <Card.Title className="fw-semibold">{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
   </Container>
    </>
  );
};

export default StorePage;
