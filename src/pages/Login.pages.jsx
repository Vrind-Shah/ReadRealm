import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/firebase.context";
import { NavItem } from "react-bootstrap";

const LoginPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        if(firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase, navigate])


    const registerAcc = () =>  {
        navigate("/register")

    }
    
    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log("Login user with email and pass")

        const result = await firebase.signinUserWithEmailAndPass(email, password)

        console.log("Success and user", result)
    }   
    console.log("firebase", firebase);

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
                    Login
                </Button>
            </Form>

            <h2 className="mt-5 mb-2">Other Methods</h2>
            <Button onClick={firebase.signinWithGoogle} variant="danger" type="submit" >
            Sign in With Google
                </Button>
            
            <h4 className="mt-5 mb-2">Don't have an Account?</h4>
            <Button onClick={registerAcc} variant="primary" type="submit" >
            Register Account
                </Button>
            
        </div>
    );
};

export default LoginPage;