import React, { useState,useEffect } from 'react';
import kaizntree_logo from '../assets/kaizntree_logo.jpeg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in local storage
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            // Redirect to dashboard or another page
//navigate('/dashboard');
        }
    }, []);

   
    

    const handleLogin = async () => {
        console.log(email)
        if(!username || !password){
            setError("Enter all fields");
            return;
        }
        try {
            const response = await fetch('https://inventory-manager-green.vercel.app/api/user/authenticate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful!');
                // toast.success("Login successful!", {
                //     position: toast.POSITION.TOP_RIGHT,
                //   });
                //toast.success('Login successful!');
                localStorage.setItem('token', data.token);
                // Redirect to dashboard or another page
                navigate('/dashboard');
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    const handleSignup = async () => {
        
        if (!email) {
            setError('Email is required');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email address');
            return;
        }
    
        // Validate password
        if (!password) {
            setError('Password is required');
            return;
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        } else if (!/\d/.test(password)) {
            setError('Password must contain at least one number');
            return;
        }
           

        try {
            const response = await fetch('https://inventory-manager-green.vercel.app/api/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess('Account created successfully!');
                localStorage.setItem('token', data.token);
                // Optionally, auto-login the user after signup
                navigate('/dashboard');
            } else {
                setError(data.detail || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (showSignup) {
            handleSignup();
        } else {
            handleLogin();
        }
    };

    const handleForgotPassword=(e)=>{
        navigate('/forgot-password');
    }
    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg bg-light">
                <div className="card-body mx-3">
                    <div className="d-flex align-items-center mb-3 mx-3">
                        <img src={kaizntree_logo} alt="Kaizntree logo" className="imgfluid mx-2 mt-2" style={{ width: '100px', height: '100px' }} />
                        <h5 className="card-title mb-0">Kaizntree</h5>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        {showSignup && (
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        )}
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        

                        <div className='d-flex mb-3 justify-content-between'>
                        <div className="mx-4">
                            {showSignup ? (
                                <button type="submit" className="btn btn-outline-secondary mx-5 mt-2">SIGN UP</button>
                            ) : (
                                <button type="submit" className="btn btn-outline-secondary">LOG IN</button>
                            )}
                        </div>

                        <div className="mb-3 mt-2">
                        {!showSignup && <p className="mb-0"><a href="#" onClick={handleForgotPassword}>Forgot Password?</a></p>}
                        </div>
                        </div>
                        <div className="mb-3">
                            {showSignup ? (
                                <p>Already have an account? <button type="button" className="btn btn-link" onClick={() => setShowSignup(false)}>Log in</button></p>
                            ) : (
                                <p>Don't have an account? <button type="button" className="btn btn-link" onClick={() => setShowSignup(true)}>Create one</button></p>
                            )}
                        </div>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        {success && (
                            <div className="alert alert-success">{success}</div>
                        )}
                    </form>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
            );
}

export default Login;
