import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
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
            const res = await axios.post('http://localhost:8000/account/api/register', {
                username: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
            });
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', formData.email);
            navigate('/login'); // Redirige vers la page de connexion après succès
        } catch (err) {
            setError('Erreur lors de l\'enregistrement. Vérifiez vos informations.');
        }
    };

    return (
        <Container style={{ marginTop: '150px' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicFirstName" style={{ width: '300px' }}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name="first_name" value={formData.first_name} onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicLastName" style={{ width: '300px' }}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" name="last_name" value={formData.last_name} onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-block" style={{ maxWidth: '300px' }}>
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
