import React from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token
        localStorage.removeItem('user'); // Supprime l'utilisateur
        navigate('/login'); // Redirige vers la page de connexion
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Test app</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                        {isLoggedIn && (
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} /> {/* Route pour les pages non trouvées */}
            </Routes>
        </>
    );
}

export default App;
