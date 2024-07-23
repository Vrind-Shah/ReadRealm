import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <Container fluid>
                <Row>
                    <Col md={6} className="text-center text-md-left">
                        <h5>Bookify</h5>
                        <p>Your ultimate destination for books</p>
                    </Col>
                    <Col md={6} className="text-center text-md-right">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p>&copy; 2024 Bokify. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px 0',
    width: "100%",
    left: "0"
};

const iconStyle = {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none'
};

export default Footer;
