import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase.context";
import Notify from "../components/Notify.components";

const OrderDetails = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([])

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        fetchOrders();
    }, [params.bookID, firebase]);

    const fetchOrders = async () => {
        const orders = await firebase.getOrders(params.bookID)
        setOrders(orders.docs)
    }

    const handleSubmit = async (bookID, orderID) => {
        await firebase.deleteOrders(params.bookID, orderID).then(
            () => {
                setNotificationMessage("Order Deleted")
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000)
            })
            .catch(() => {
                setNotificationMessage("Sorry, Try Again")
                setShowNotification(true);
            })

        fetchOrders();
    }
    console.log("paramsss", params)

    return (
        <div className="container mt-5">
            <Notify variant={"danger"} show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />
            <h1>Order Details</h1>
            {
                orders.map((order) => {
                    const data = order.data();

                    return (
                        <div
                            key={order.id}
                            className="container mt-5"
                            style=
                            {{
                                border: "2px solid blue",
                                borderRadius: "20px",
                                padding: "20px"
                            }}>
                            <h4>Order By: {data.displayName}</h4>
                            <h4>Order id: {order.id}</h4>
                            <h5>Quantity: {data.quantity}</h5>
                            <h6>Email: {data.userEmail}</h6>
                            <Button onClick={() => handleSubmit(params.bookID, order.id)} style={{ margin: "10px 0 5px " }} variant="danger">Delete</Button>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default OrderDetails;