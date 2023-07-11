import React from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm';

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <LoginForm />
            <SignupForm />

        </div>
    );
}

export default HomePage;
