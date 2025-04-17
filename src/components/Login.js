import { useState } from 'react';
import { auth, provider, database } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import './Login.css';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        uid: user.uid,
      });
    } catch (err) {
      setError('Signup failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      });
    } catch (err) {
      setError('Google login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="site-title">Training.com</h1>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        <div className="form-group">
          <input
            placeholder="Email"
            name="email"
            type="email"
            className="input-field"
            onChange={handleInputs}
            value={data.email}
          />
        </div>
        
        <div className="form-group">
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="input-field"
            onChange={handleInputs}
            value={data.password}
          />
        </div>
        
        <div className="button-group">
          {isLogin ? (
            <button className="primary-button" onClick={handleLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          ) : (
            <button className="primary-button" onClick={handleSignup} disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          )}
          
          <button className="google-button" onClick={handleGoogleLogin} disabled={loading}>
            {loading ? 'Processing...' : 'Continue with Google'}
          </button>
        </div>
        
        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
        
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;