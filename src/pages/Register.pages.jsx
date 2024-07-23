import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/firebase.context";

const RegisterPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase, navigate])

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log("Signin user with email and pass")

        const result = await firebase.signUpUserWithEmailAndPass(email, password)

        console.log("Success", result)
    }   
    console.log(firebase);

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>

                <Button  variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage