import { useState } from "react";
import supabase from "../supabase-client.js";

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        if (isSignUp) {
            const {error} = await supabase.auth.signUp({email, password});
            if (error) {
                console.error('Signup error: ', error);
            }

        } else {
            const {error} = await supabase.auth.signInWithPassword({email, password});
            if (error) {
                console.error('Sign in error: ', error);
            }
        }

    }
    return (
        <div style={{maxWidth: "400px", margin: "0 auto", padding: "1rem"}}>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
                />
                <button type="submit" style={{padding: "0.5rem 1rem", marginRight: "0.5rem"}}>{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            <button onClick={() => {
                setIsSignUp(!isSignUp);
            }} style={{
                padding: "0.5rem 1rem",
                backgroundColor: isSignUp ? "#f0f0f0" : "#007bff",
                color: isSignUp ? "#333" : "#fff",
                border: "none",
                borderRadius: "4px"
            }}>
                {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
            </button>
        </div>
    );
}

