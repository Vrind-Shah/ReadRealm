import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useFirebase } from "../context/firebase.context";

const BookCard = (props) => {
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null)

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [])
    console.log("url", url)
    return (

        
        <Card style={{ width: '18rem', margin: "20px" }}>
            <Card.Img style={{ width: '18rem' }} variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    Title of Book: {props.name}<br />
                    Sold By: {props.displayName}<br />
                    Price is: {props.price}


                </Card.Text>
                <Button onClick={(e) => navigate(props.link)} variant="primary">View</Button>
            </Card.Body>
        </Card>
    )
}

export default BookCard;