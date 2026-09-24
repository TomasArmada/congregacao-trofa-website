import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LogIn } from "lucide-react";
import { supabase } from "../lib/supabase.js";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const cleanEmail = username.trim().toLowerCase();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
        });

        if (error) {
            setLoading(false);
            setError("Username ou palavra-passe incorretos.");
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("approved")
            .eq("id", data.user.id)
            .single();

        setLoading(false);

        if (profileError || !profile) {
            setError("Não foi possível verificar a conta. Tenta novamente.");
            await supabase.auth.signOut();
            return;
        }

        if (!profile.approved) {
            setError("A tua conta ainda não foi aprovada por um administrador.");
            await supabase.auth.signOut();
            return;
        }

        navigate("/");
    }

    return (
        <div className="login">
            <div className="login__field">
                <div className="login__glow login__glow--a" />
                <div className="login__glow login__glow--b" />
                <div className="login__grid" />
            </div>

            <div className="login__content">
                <div className="login__card">
                    <div className="login__icon">
                        <LogIn size={18} />
                    </div>

                    <h1 className="login__title">Bem-vindo!</h1>
                    <p className="login__subtitle">Entra para aceder às funcionalidades do sistema.</p>

                    {error && <p className="login__error">{error}</p>}

                    <form className="login__form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="login__input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            className="login__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading} className="login__submit">
                            {loading ? "A entrar..." : "Entrar"}
                        </button>
                    </form>

                    <p className="login__footer">
                        Ainda não tens conta? <NavLink to="/criar-conta">Cria uma</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}