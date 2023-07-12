import React, { useState } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm';

function HomePage() {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => setIsLogin(!isLogin);

    return (
        <div>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <button onClick={switchForm}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
}

export default HomePage;
