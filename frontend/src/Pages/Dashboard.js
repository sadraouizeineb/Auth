import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />; // Redirige vers login si non connecté
    }

    return (
        <div>
            Welcome, {localStorage.getItem('user')}
        </div>
    );
}
