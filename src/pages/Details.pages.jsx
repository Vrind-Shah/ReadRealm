import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase.context";
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Notify from "../components/Notify.components";


const BookDetailsPage = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [quantity, setQuantity] = useState(1);

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");


    console.log("params", params)
    console.log("data firestore", data)

    useEffect(() => {
        firebase.getBooksByID(params.bookID).then((bookVal) => setData(bookVal.data()))
    }, [])

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL
            firebase.getImageURL(imageURL).then((url) => setURL(url))
        }
    }, [data])

    const placeOrder = async () => {
        try {
            
            const result = await firebase.placeOrder(params.bookID, quantity)
            console.log("order", result)

            setNotificationMessage("Order Placed")
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000)
        } catch (error) {
            setNotificationMessage("Sorry, Try Again")
            setShowNotification(true);
        }
        
    }

    if (data == null) return <h1>Loading....</h1>

    return (
        <div className="container mt-5">
            <Notify show={showNotification} message={notificationMessage} onClose={()=> setShowNotification(false)} />
            <h1>{data.name}</h1>
            <img src={url} width="50%" style={{ borderRadius: "20px" }} alt="img" />
            <h1>Details</h1>
            <h3>Price: Rs. {data.price}</h3>
            <h4>Name: {data.displayName}</h4>
            <h4>Email: {data.userEmail}</h4>
            <h5>ISBN: {data.isbn}</h5>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Order</Form.Label>
                <Form.Control onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder="Quantity" />
            </Form.Group>

            <Button onClick={placeOrder} variant="success">Buy Now </Button>
            
            

        </div>
    )
}

export default BookDetailsPage;