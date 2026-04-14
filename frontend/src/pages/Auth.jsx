import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = ({ isLogin }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', gender: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if(login(formData.email, formData.password)) navigate('/dashboard');
    } else {
      if(register(formData)) navigate('/dashboard');
    }
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', position: 'relative', zIndex: 1 }}>
        <h2 className="text-center mb-1">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="text-center text-secondary mb-4">
          {isLogin ? 'Login to continue tracking your progress.' : 'Join to start your cognitive assessment journey.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" placeholder="John Doe" onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="hello@example.com" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" placeholder="••••••••" onChange={handleChange} required />
          </div>

          {!isLogin && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">Age</label>
                <input type="number" name="age" className="form-input" placeholder="65" onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">Gender</label>
                <select name="gender" className="form-input" onChange={handleChange} required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary pulse-glow" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login Securely' : 'Complete Registration'}
          </button>
        </form>

        <p className="text-center text-secondary" style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <Link to={isLogin ? '/register' : '/login'} style={{ color: 'var(--colorPrimary)', textDecoration: 'none', fontWeight: 600 }}>
            {isLogin ? 'Sign up' : 'Login here'}
          </Link>
        </p>
      </div>

      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'var(--colorPrimary)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', top: '10%', left: '20%', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '250px', height: '250px', background: 'var(--colorSecondary)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%', bottom: '10%', right: '25%', zIndex: 0, pointerEvents: 'none' }}></div>
    </div>
  );
};

export default Auth;
