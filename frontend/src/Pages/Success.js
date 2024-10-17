// src/Pages/Success.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

function Success() {
    return (
        <Container style={{ marginTop: '150px' }}>
            <Alert variant="success">
                Inscription réussie ! Vous pouvez maintenant vous connecter.
            </Alert>
        </Container>
    );
}

export default Success;
