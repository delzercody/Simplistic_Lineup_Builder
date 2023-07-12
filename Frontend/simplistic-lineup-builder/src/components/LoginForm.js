// LoginForm.js
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            usernameOrEmail: '',
            password: '',
        },
        onSubmit: (values) => {
            fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(user => {
                loginUser(user);
                navigate('/dashboard')
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.usernameOrEmail}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default LoginForm;
