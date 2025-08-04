import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const sampleProducts = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    image: '/Images/product1.avif',
    description: 'Stylish and versatile denim jacket.',
    path: '/product/1',
  },
  {
    id: 2,
    name: 'Leather Boots',
    image: '/Images/product2.avif',
    description: 'Comfortable leather boots for daily wear.',
    path: '/product/2',
  },
  {
    id: 3,
    name: 'Summer Dress',
    image: '/Images/product3.avif',
    description: 'Lightweight summer dress perfect for any outing.',
    path: '/product/3',
  },
  {
    id: 4,
    name: 'Urban Hoodie',
    image: '/Images/product4.avif',
    description: 'Trendy hoodie for a cool streetwear look.',
    path: '/product/4',
  },
  {
    id: 5,
    name: 'Classic Trousers',
    image: '/Images/product5.avif',
    description: 'Smart trousers for casual or formal events.',
    path: '/product/5',
  },
];

const StorePage = () => {
  const navigate = useNavigate();
  const { storeName } = useParams();

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/Images/store-banner.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '350px',
        }}
      >
        <div className="px-4 py-3 rounded">
          <h1 className="display-4 fw-bold text-uppercase">
            {storeName?.replace('-', ' ') || 'Your Store'}
          </h1>
          <p className="lead mt-2 fw-medium text-light">
            Shop curated pieces crafted for style and comfort
          </p>
        </div>
      </div>

      {/* Products */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.2rem' }}>
          Featured Collections
        </h2>
        <Row className="g-4">
          {sampleProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4}>
              <div
                className="bg-white border-0 rounded-4 shadow-lg p-3 h-100 d-flex flex-column justify-content-between"
                style={{
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div style={{ overflow: 'hidden', borderRadius: '0.75rem' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid mb-3"
                    style={{
                      height: '240px',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div>
                  <h5 className="fw-semibold text-dark">{product.name}</h5>
                  <p className="text-muted small">{product.description}</p>
                </div>
                <Button
                  variant="dark"
                  className="rounded-pill mt-3 fw-medium px-4 py-2"
                  onClick={() => navigate(product.path)}
                >
                  Click To Know More
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default StorePage;
