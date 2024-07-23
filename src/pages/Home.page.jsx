import React, { useEffect, useState } from "react";

import BookCard from "../components/Card.components";
import HeroSection from "../components/Hero.components"

import { useFirebase } from "../context/firebase.context";
import { CardGroup, Row, Col } from "react-bootstrap";


const HomePage = () => {

    const firebase = useFirebase();

    const [books, setBooks] = useState([])

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    }, [])

    return (
        <>
            <HeroSection />
            <div className="container mt-5">
                <CardGroup>
                    <Row>
                        {books.map((book, index) => (
                            <Col key={book.id} sm={12} md={6} lg={4} className="mb-4">
                                <BookCard link={`/books/view/${book.id}`} id={book.id} {...book.data()} />
                            </Col>
                        ))}
                    </Row>
                </CardGroup>

            </div>
        </>

    )
}

export default HomePage