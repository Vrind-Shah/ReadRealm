import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import bookImage from "../Assests/book2.png";

const HeroSection = () => {
    const heroStyle = {
        background: `linear-gradient(to bottom, rgba(128, 128, 128, 0.7), rgba(0, 0, 255, 0.7)), url(${bookImage}) no-repeat center center/cover`,
        color: 'white',
        height: '100vh',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const textStyle = {
        textAlign: 'center'
    };

    return (
        <div style={heroStyle}>
            <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                <Row>
                    <Col style={textStyle}>
                        <h1 className="display-3">Welcome to ReadRealm</h1>
                        <p className="lead">Your ultimate destination for books</p>
                        <NavLink to = "/book/list">
                        <Button variant="primary" size="lg" className="mt-3">Add Books</Button>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeroSection;
