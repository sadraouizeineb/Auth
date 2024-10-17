import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirection si l'utilisateur est déjà connecté
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/'); // Redirige vers le tableau de bord
        }
    }, [navigate]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/token/', {
                username: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', formData.email);
            navigate('/'); // Redirige vers le tableau de bord après connexion
        } catch (err) {
            setError('Erreur de connexion. Vérifiez vos informations d\'identification.');
        }
    };

    return (
        <Container style={{ marginTop: '150px' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-block" style={{ maxWidth: '300px' }}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
