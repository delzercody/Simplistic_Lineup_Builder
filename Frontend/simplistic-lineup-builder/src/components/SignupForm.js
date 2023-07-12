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
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <label htmlFor="bio">Bio</label>
            <textarea
                id="bio"
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
            />

            <label htmlFor="first_name">First Name</label>
            <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />

            <label htmlFor="last_name">Last Name</label>
            <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />

            <label htmlFor="avatar">Avatar URL</label>
            <input
                id="avatar"
                name="avatar"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.avatar}
            />

            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
