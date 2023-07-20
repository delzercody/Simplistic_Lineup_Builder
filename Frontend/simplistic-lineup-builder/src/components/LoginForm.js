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
        <form class='form-signin container ' onSubmit={formik.handleSubmit}>
            <h1 class='h1 mb-3 font-weight-normal'>Please Sign In</h1>
            <div class="form-group mb-4">
                <input
                    id="usernameOrEmail"
                    class='form-control-lg form-field'
                    name="usernameOrEmail"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.usernameOrEmail}
                    placeholder="Enter email or username"
                />
                <label for="usernameOrEmail" class='form-label h3'></label>
            </div>
            <div class="form-group mb-4">
            <label for="password" class='h3'></label>
                <input
                    id="password"
                    class='form-control-lg'
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password"
                />
            </div>
            <button type="submit" class="btn btn-lg btn-info btn-block mb-3">Sign In</button>
        </form>
    );
}

export default LoginForm;
