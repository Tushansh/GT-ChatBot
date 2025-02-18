import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import styles from "./Auth.module.css";

export function Login({ switchToSignup }) {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add("full-width");
    return () => document.body.classList.remove("full-width");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className={styles.AuthPage}>
      <div className={styles.InfoSection}>
        <div className={styles.AnimatedBackground}></div>
        <h1>GT Chatbot</h1>
        <h3>Your personal AI assistant for smart conversations.</h3>
        <p>Unlock AI-powered interactions to boost creativity, answer questions, and automate tasks effortlessly.</p>
        <ul className={styles.FeaturesList}>
          <li><span className={styles.FeatureIcon}>⚡</span> Instant AI responses</li>
          <li><span className={styles.FeatureIcon}>🔍</span> Deep learning-powered insights</li>
          <li><span className={styles.FeatureIcon}>🌐</span> Multilingual support</li>
          <li><span className={styles.FeatureIcon}>🔄</span> Continuous learning for better results</li>
        </ul>
        <button className={styles.CTAButton} onClick={switchToSignup}>
          Get Started
        </button>
        <img src="/chat-bot.png" alt="AI Chatbot" className={styles.HeroImage} />
      </div>

      <div className={styles.AuthContainer}>
        <h2>Login</h2>
        {error && <p className={styles.Error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className={styles.PasswordContainer}>
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className={styles.TogglePassword} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={loginWithGoogle} className={styles.GoogleButton}>Login with Google</button>
        <p>Don't have an account? <span className={styles.SignupBtn} onClick={switchToSignup}>Sign up</span></p>
      </div>
    </div>
  );
}
