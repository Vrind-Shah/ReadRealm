import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase.context";
import BookCard from "../components/Card.components";
import { CardGroup, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { NavLink } from "react-router-dom";
import HeroSection from "../components/Hero.components";


const OrdersPage = () => {

    const firebase = useFirebase();
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs))
        }
    }, [firebase])

    if (!firebase.isLoggedIn) {
        return (
            <div>
                <HeroSection />
            <h1>You are Not logged in!</h1>
            <h2>Please log in</h2>
            <NavLink to = "/login">
            <Button variant="primary">Login</Button>
            </NavLink>
            </div>
        )
    }

    console.log("books", books)

    return (
        <div>
            <CardGroup>
                <Row>
                {books.map((books) => (
                <Col key={books.id} sm={12} md={6} lg={4}>
                    <BookCard link={`/books/order/${books.id}`} key={books.id} id={books.id} {...books.data()} />
                </Col>
                ))}
                </Row>
            </ CardGroup>
        </div>
    )
}

export default OrdersPage;

