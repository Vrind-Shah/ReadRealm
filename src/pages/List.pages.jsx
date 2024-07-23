import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Notify from "../components/Notify.components";

import { useFirebase } from "../context/firebase.context";

const ListingPage = () => {

    const firebase = useFirebase();

    const [name, setName] = useState("")
    const [isbnNum, setIsbnNum] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setCoverPic] = useState("")

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleSubmit = async (e) => {
        setNotificationMessage("Adding....")
        setShowNotification(true);
        e.preventDefault();
        await firebase.handleCreateNewListing(name, isbnNum, price, coverPic)
            .then(
                () => {
                    setNotificationMessage("Book Added")
                    setShowNotification(true);
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 3000)
                })
            .catch(() => {
                setNotificationMessage("Sorry, Try Again")
                setShowNotification(true);
            })


    }

    return (
        <div className="container mt-5">
            <Notify show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Book Name" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control onChange={(e) => setIsbnNum(e.target.value)} value={isbnNum} type="text" placeholder="ISBN Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Price" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cover Pic</Form.Label>
                    <Form.Control onChange={(e) => setCoverPic(e.target.files[0])} type="file" />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-4 mt-4">
                    Add Book
                </Button>
            </Form>
        </div>
    )
}
export default ListingPage;