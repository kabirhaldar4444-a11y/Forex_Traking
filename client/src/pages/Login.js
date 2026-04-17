import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/auth';
import '../styles/Login.css';
import logo from '../images/Forexshipping.png';
import loginIllustration from '../images/Login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-inner-container">
        {/* Main Dark Content Area */}
        <div className="main-content-dark">
          {/* Brand Only Header */}
          <div className="dark-header">
            <div className="brand-light">
              <img src={logo} alt="ForexShipping" className="logo" />
              <span className="brand-name">FOREXSHIPPING</span>
            </div>
          </div>

          <div className="login-content-flex">
            {/* Left side: Illustration */}
            <div className="illustration-side">
              <img src={loginIllustration} alt="Login Illustration" className="main-illustration" />
            </div>

            {/* Right side: Login Form Card */}
            <div className="login-card-side">
              <div className="login-card">
                <h1>Welcome Back...</h1>
                <p className="subtitle">Please enter your email and password</p>

                <form onSubmit={handleSubmit} className="modern-login-form">
                  {error && <div className="modern-error">{error}</div>}
                  
                  <div className="modern-input-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="user@gmail.com"
                    />
                    <span className="input-icon">@</span>
                  </div>

                  <div className="modern-input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                    <span 
                      className="input-eye-icon" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🐵' : '👁️'}
                    </span>
                  </div>

                  <div className="agreement-text">
                    By login, you agree to our <span className="link">Terms & Conditions</span>
                  </div>

                  <button type="submit" className="modern-submit-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'login...'}
                    <span className="arrow">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Simple Clean Footer */}
          <div className="dark-footer-bottom">
             <div className="bottom-right" style={{ width: '100%', textAlign: 'center' }}>
                <div className="copyright">©2024 All Rights Reserved ForexShipping.</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
