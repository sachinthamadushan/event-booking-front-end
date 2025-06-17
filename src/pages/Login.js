import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoin = async () => {
        
        try {
            const response = await axios.post('/users/login', {
                username,
                password
            });
            alert(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert("Login Fail");
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <input placeholder='Username' onChange={
                e => setUsername(e.target.value)
            } />
            <input type='password' placeholder='Password' onChange={
                e => setPassword(e.target.value)
            } />
            <button onClick={handleLoin}>Login</button>
        </div>
    );
}

export default Login;