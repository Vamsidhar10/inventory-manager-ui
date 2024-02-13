import React, { useState } from 'react';
import kaizntree_logo from '../assets/kaizntree_logo.jpeg';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // const handleEmailSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/password/reset/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email }),
    //         });
    //         const data = await response.json();

    //         if (response.ok) {
    //             setSuccess('Password reset instructions sent to your email.');
    //         } else {
    //             setError(data.detail || 'An error occurred');
    //         }
    //     } catch (error) {
    //         setError('An error occurred');
    //     }
    // };

    // const handleCodeSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/password/reset/verify/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ code, newPassword }),
    //         });
    //         const data = await response.json();

    //         if (response.ok) {
    //             setSuccess('Password successfully reset.');
    //         } else {
    //             setError(data.detail || 'An error occurred');
    //         }
    //     } catch (error) {
    //         setError('An error occurred');

    //     }
    // };

    const handlePasswordReset =async(e) =>{
        if (!username ){
            setError('Username is required');
            return;
        }
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
        e.preventDefault();
            try {
                const response = await fetch('https://inventory-manager-green.vercel.app/api/password/reset/confirm/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password,username }),
                });
                const data = await response.json();
    
                if (response.ok) {
                    setSuccess('Password successfully reset');
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    setError(data.detail || 'An error occurred');
                }
            } catch (error) {
                setError('An error occurred');
    
            }

    }

    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg bg-light">
                <div className="card-body mx-3 ">
                    <div className="d-flex align-items-center mb-5 mx-3">
                        <img src={kaizntree_logo} alt="Kaizntree logo" className="imgfluid mx-2 mt-2" style={{ width: '100px', height: '100px' }} />
                        <h5 className="card-title mb-0">Kaizntree</h5>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    {/* {!code ? (
                        <form onSubmit={handleEmailSubmit}>
                            <div className="mb-3">
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter email" />
                            </div>
                            <button type="submit" className="btn btn-outline-secondary mx-5">Send Code</button>
                        </form>
                    ) : (
                        <form onSubmit={handleCodeSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required placeholder="Enter verification code" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Enter new password" />
                            </div>
                            <button type="submit" className="btn btn-outline-secondary mx-5">Reset Password</button>
                        </form>
                    )} */}
                    <form onSubmit={handlePasswordReset}>
                     <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-outline-secondary mx-5">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
