import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db, setDoc, doc } from "./firebase";
import styles from "./Auth.module.css";

export function Signup({ switchToLogin }) {
  const { registerWithEmail } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("full-width");
    return () => document.body.classList.remove("full-width");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError("Please enter your first and last name.");
      return;
    }
    try {
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

    } catch (err) {
      setError("Could not sign up. Try again.");
    }
  };

  return (
    <div className={styles.AuthPage}>
      <div className={styles.InfoSection}>
        <h1>Unlock the Power of AI</h1>
        <h3>Transform the way you interact with technology.</h3>
        <p>
          Our AI-powered assistant is designed to enhance your workflow, provide instant answers, and help 
          you stay ahead in an ever-evolving digital world. Whether you're looking for quick insights, 
          automated solutions, or intelligent discussions, our chatbot has got you covered.
        </p>
        <ul className={styles.FeaturesList}>
          <li><span className={styles.FeatureIcon}>🚀</span> AI-powered assistance at your fingertips</li>
          <li><span className={styles.FeatureIcon}>🧠</span> Smart, context-aware conversations</li>
          <li><span className={styles.FeatureIcon}>🌍</span> Multilingual support for global users</li>
          <li><span className={styles.FeatureIcon}>📈</span> Productivity-boosting automation</li>
        </ul>
        <p>Join today and experience AI like never before.</p>
        <button className={styles.CTAButton} onClick={switchToLogin}>
          Get Started for Free
        </button>
        <img src="/chat-bot.png" alt="AI Chatbot" className={styles.HeroImageSign} />
      </div>

      <div className={styles.AuthContainer}>
        <h2>Sign Up</h2>
        {error && <p className={styles.Error}>{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <span className={styles.SignupBtn} onClick={switchToLogin}>Login</span></p>
      </div>
    </div>
  );
}
