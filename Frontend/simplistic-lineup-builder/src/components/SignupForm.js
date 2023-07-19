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
            <div class="form-group mb-4">
            <label for="email" class='form-label h3'>Email: </label>
            <input
                id="email"
                class='form-control-lg'
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            </div>

            <div class="form-group mb-4">
            <label for="bio" class='form-label h3'>Bio:</label>
            <textarea
                id="bio"
                class='form-control-lg'
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
            />
            </div>

            <div class="form-group mb-4">
            <label for="first_name" class='form-label h3'>First Name: </label>
            <input
                id="first_name"
                class='form-control-lg'
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />
            </div>

            <div class="form-group mb-4">
            <label for="last_name" class='form-label h3'>Last Name: </label>
            <input
                id="last_name"
                class='form-control-lg'
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />
            </div>

            <div class="form-group mb-4">
            <label for="avatar" class='form-label h3'>Profile Picture URL: </label>
            <input
                id="avatar"
                class='form-control-lg'
                name="avatar"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.avatar}
            />
            </div>

            <div class="form-group mb-4">
            <label for="username" class='form-label h3'>Username: </label>
            <input
                id="username"
                class='form-control-lg'
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            </div>

            <div class="form-group mb-4">
            <label for="password" class='form-label h3'>Password: </label>
            <input
                id="password"
                class='form-control-lg'
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            </div>

            <button type="submit" class="btn btn-lg btn-info btn-block mb-3">Sign Up</button>
        </form>
    );
}

export default SignupForm;
