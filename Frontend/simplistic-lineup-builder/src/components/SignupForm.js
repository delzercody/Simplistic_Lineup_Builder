// SignupForm.js
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom'

function SignupForm() {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            bio: '',
            first_name: '',
            last_name: '',
            avatar: '',
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            fetch('http://localhost:5555/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
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
        <form class='container' onSubmit={formik.handleSubmit}>
            <div class="form-group">
            <label for="email" class='form-label h3'>Email:</label>
            <input
                id="email"
                class='form-control mb-4'
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter your email"
            />
        </div>

        <div class="form-group">
            <label for="first_name" class='form-label h3'>First Name:</label>
            <input
                id="first_name"
                class='form-control mb-4'
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder="Enter your first name"
            />
        </div>

        <div class="form-group">
            <label for="last_name" class='form-label h3'>Last Name:</label>
            <input
                id="last_name"
                class='form-control mb-4'
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder="Enter your last name"
            />
        </div>

        <div class="form-group">
            <label for="username" class='form-label h3'>Username:</label>
            <input
                id="username"
                class='form-control mb-4'
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Enter your username"
            />
        </div>

        <div class="form-group">
            <label for="password" class='form-label h3'>Password:</label>
            <input
                id="password"
                class='form-control mb-4'
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Enter your password"
            />
        </div>
        
        <div class="form-group">
            <label for="avatar" class='form-label h3'>Profile Picture URL:</label>
            <input
                id="avatar"
                class='form-control mb-4'
                name="avatar"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.avatar}
                placeholder="Enter your profile picture URL"
            />
        </div>
        
        <div class="form-group">
            <label for="bio" class='form-label h3'>Bio:</label>
            <textarea
                id="bio"
                class='form-control mb-4'
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                placeholder="Enter your bio"
            />
        </div>

            <button type="submit" class="btn btn-lg btn-warning btn-block mb-3">Sign Up</button>
        </form>
    );
}

export default SignupForm;
