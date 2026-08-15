import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";

export default function AuthSwitch({ defaultMode = 'signin', isModal = false }) {
  const navigate = useNavigate();
  const { user, login, signup } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup');
  const [loading, setLoading] = useState(false);

  // Form states
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ name: '', businessName: 'VeltaZ Business', email: '', phone: '', password: '' });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Client-side instant guest check
  useEffect(() => {
    if (user && !isModal) {
      navigate('/', { replace: true });
    }
  }, [user, navigate, isModal]);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isModal]);

  useEffect(() => {
    setIsSignUp(defaultMode === 'signup');
  }, [defaultMode]);

  const handleToggleMode = (signUp) => {
    setIsSignUp(signUp);
    window.history.pushState(null, '', signUp ? '/signup' : '/signin');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInForm.email.trim() || !signInForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(signInForm);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.userMessage || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // 1. Basic empty check
    if (!signUpForm.name.trim() || !signUpForm.email.trim() || !signUpForm.phone.trim() || !signUpForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // 2. Username length validation
    if (signUpForm.name.trim().length < 3) {
      toast.error('Username must be at least 3 characters long');
      return;
    }
    
    // 3. Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpForm.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // 4. Phone number regex validation (at least 7 to 15 digits)
    const phoneRegex = /^[0-9+\s\-]{7,15}$/;
    if (!phoneRegex.test(signUpForm.phone.trim())) {
      toast.error('Please enter a valid phone number (7-15 digits)');
      return;
    }
    
    // 5. Password length validation
    if (signUpForm.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await signup(signUpForm);
      toast.success('Account created! Let\'s choose a plan.');
      navigate('/plan');
    } catch (err) {
      toast.error(err.userMessage || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .auth-page-wrapper {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: radial-gradient(circle at center, var(--bg2) 0%, var(--bg) 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          width: 100vw;
          transition: background 0.2s ease;
        }

        .auth-page-wrapper.is-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 99999;
          background: rgba(5, 5, 5, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: fadeInOverlay 0.4s ease forwards;
        }

        :global([data-theme="light"]) .auth-page-wrapper.is-modal-overlay {
          background: rgba(255, 255, 255, 0.45);
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .auth-container {
          position: relative;
          width: 100%;
          max-width: 580px;
          height: 350px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .forms-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .signin-signup {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.7s ease-in-out;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 1.5rem;
          transition: all 0.2s 0.7s;
          overflow: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          background: transparent;
        }

        form.sign-up-form {
          opacity: 0;
          z-index: 1;
        }

        form.sign-in-form {
          z-index: 2;
        }

        .title {
          font-size: 1.35rem;
          color: #111111;
          margin-bottom: 6px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .input-field {
          max-width: 250px;
          width: 100%;
          background-color: #f3f4f6;
          border: 1px solid transparent;
          margin: 4px 0;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          position: relative;
          transition: 0.3s;
        }

        .input-field:focus-within {
          border-color: #C9A227;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
        }

        .input-field i {
          color: #666666;
          transition: 0.5s;
          font-size: 1rem;
          font-style: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .input-field input {
          background: none;
          outline: none;
          border: none;
          height: 100%;
          flex: 1;
          font-weight: 500;
          font-size: 0.95rem;
          color: #111111;
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .password-toggle-btn {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          outline: none;
          color: #666666;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          z-index: 10;
        }

        .password-toggle-btn:hover {
          color: #C9A227;
        }

        .input-field input::-ms-reveal,
        .input-field input::-ms-clear {
          display: none !important;
        }

        .input-field input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .btn {
          width: 100%;
          max-width: 250px;
          background: #C9A227;
          color: #ffffff;
          border: none;
          outline: none;
          height: 34px;
          border-radius: 10px;
          text-transform: uppercase;
          font-weight: 700;
          margin: 8px 0 0 0;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.2);
        }

        .btn:hover {
          background-color: #b5901e;
          transform: translateY(-1px);
        }

        .panels-container {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .panel {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 15px;
          text-align: center;
          z-index: 6;
        }

        .left-panel {
          pointer-events: all;
          padding: 2rem 12% 1.5rem 8%;
        }

        .right-panel {
          pointer-events: none;
          padding: 2rem 8% 1.5rem 12%;
        }

        .panel .content {
          color: #fff;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.6s;
        }

        .panel h3 {
          font-weight: 600;
          line-height: 1;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .panel p {
          font-size: 0.95rem;
          padding: 0.7rem 0;
        }

        .btn.transparent {
          margin: 0;
          background: none;
          border: 2px solid #fff;
          width: 130px;
          height: 41px;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .btn.transparent:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .right-panel .content {
          transform: translateX(800px);
        }

        .auth-container.sign-up-mode:before {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .auth-container.sign-up-mode .left-panel .content {
          transform: translateX(-800px);
        }

        .auth-container.sign-up-mode .signin-signup {
          left: 25%;
        }

        .auth-container.sign-up-mode form.sign-up-form {
          opacity: 1;
          z-index: 2;
        }

        .auth-container.sign-up-mode form.sign-in-form {
          opacity: 0;
          z-index: 1;
        }

        .auth-container.sign-up-mode .right-panel .content {
          transform: translateX(0%);
        }

        .auth-container.sign-up-mode .left-panel {
          pointer-events: none;
        }

        .auth-container.sign-up-mode .right-panel {
          pointer-events: all;
        }

        .auth-container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -10%;
          right: 48%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #C9A227 0%, #E6C653 100%);
          transition: 1.8s ease-in-out;
          border-radius: 50%;
          z-index: 6;
        }

        .social-text {
          padding: 0.7rem 0;
          font-size: 1rem;
          color: #666666;
        }

        .social-media {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .social-icon {
          height: 46px;
          width: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 50%;
          color: #4b5563;
          background: #ffffff;
          font-size: 1.2rem;
          transition: 0.3s;
          cursor: pointer;
        }

        .social-icon:hover {
          border-color: #C9A227;
          color: #C9A227;
          transform: translateY(-2px);
        }

        .social-icon svg {
          transition: 0.3s;
        }

        /* Back Button */
        .back-btn {
          position: absolute;
          top: 30px;
          left: 30px;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 50%;
          z-index: 1000;
        }

        .back-btn:hover {
          background: var(--bg3);
          border-color: var(--accent);
          color: var(--accent);
          transform: translateX(-3px);
        }

        @media (max-width: 870px) {
          .auth-container {
            min-height: auto;
            height: 630px;
            width: 90%;
            max-width: 420px;
            margin: 20px auto;
            border-radius: 20px;
          }
          .signin-signup {
            width: 100%;
            top: 60%;
            transform: translate(-50%, -50%);
            transition: 1s 0.8s ease-in-out;
          }
          .signin-signup,
          .auth-container.sign-up-mode .signin-signup {
            left: 50%;
          }
          .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }
          .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
          }
          .right-panel {
            grid-row: 3 / 4;
          }
          .left-panel {
            grid-row: 1 / 2;
          }
          .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
          }
          .panel h3 {
            font-size: 1.2rem;
          }
          .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
          }
          .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
          }
          .auth-container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
          }
          .auth-container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
          }
          .auth-container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
          }
          .auth-container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
          }
          .right-panel .content {
            transform: translateY(300px);
          }
          .auth-container.sign-up-mode .signin-signup {
            top: 34%;
            transform: translate(-50%, -50%);
          }
        }

        @media (max-width: 570px) {
          form {
            padding: 0 1.5rem;
          }
          .panel .content {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>

      <div className={`auth-page-wrapper ${isModal ? 'is-modal-overlay' : ''}`}>
        <button onClick={() => navigate('/')} className="back-btn" aria-label="Go back">
          <FaArrowLeft />
        </button>

        <div className={`auth-container ${isSignUp ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              {/* Sign In Form */}
              <form className="sign-in-form" onSubmit={handleSignIn}>
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i><FaEnvelope /></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-field" style={{ position: 'relative' }}>
                  <i><FaLock /></i>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    required
                    style={{ paddingRight: '45px' }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <input type="submit" value={loading ? "Loading..." : "Login"} className="btn solid" disabled={loading} />
              </form>

              {/* Sign Up Form */}
              <form className="sign-up-form" onSubmit={handleSignUp}>
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i><FaUser /></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="input-field">
                  <i><FaEnvelope /></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-field">
                  <i><FaPhone /></i>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={signUpForm.phone}
                    onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="input-field" style={{ position: 'relative' }}>
                  <i><FaLock /></i>
                  <input
                    type={showSignUpPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    required
                    style={{ paddingRight: '45px' }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showSignUpPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <input type="submit" value={loading ? "Loading..." : "Sign up"} className="btn" disabled={loading} />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here?</h3>
                <p>Join us today and discover a world of possibilities. Create your account in seconds!</p>
                <button className="btn transparent" type="button" onClick={() => handleToggleMode(true)}>
                  Sign up
                </button>
              </div>
            </div>

            <div className="panel right-panel">
              <div className="content">
                <h3>One of us?</h3>
                <p>Welcome back! Sign in to continue your journey with us.</p>
                <button className="btn transparent" type="button" onClick={() => handleToggleMode(false)}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


