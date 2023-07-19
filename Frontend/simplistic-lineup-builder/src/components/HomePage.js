import React, { useState } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm';

function HomePage() {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => setIsLogin(!isLogin);

    return (
        <div class='text-center'>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <button class="btn btn-outline-dark btn-block mb-4" onClick={switchForm}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
}

export default HomePage;
