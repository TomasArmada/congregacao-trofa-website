import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import "./login.css";

export default function SetPassword() {
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAccount() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/login", { replace: true });
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", user.id)
                .maybeSingle();

            if (profile) {
                navigate("/funcionalidades", { replace: true });
                return;
            }
            setChecking(false);
        }

        checkAccount();
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("A palavra-passe tem de ter pelo menos 8 caracteres.");
            return;
        }
        if (password !== confirmation) {
            setError("As palavras-passe não coincidem.");
            return;
        }

        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            setLoading(false);
            setError("A sessão expirou. Entra novamente para continuar.");
            return;
        }

        const { error: passwordError } = await supabase.auth.updateUser({ password });
        if (passwordError) {
            setLoading(false);
            setError("Não foi possível alterar a palavra-passe. Tenta novamente.");
            return;
        }

        const { error: profileError } = await supabase
            .from("profiles")
            .insert({ id: user.id, approved: true });

        setLoading(false);
        if (profileError) {
            setError("A palavra-passe foi alterada, mas não foi possível criar o perfil. Contacta um administrador.");
            return;
        }

        navigate("/login", { replace: true });
    }

    if (checking) return null;

    return (
        <div className="login">
            <div className="login__field"><div className="login__glow login__glow--a" /><div className="login__glow login__glow--b" /><div className="login__grid" /></div>
            <main className="login__content">
                <section className="login__card" aria-labelledby="set-password-title">
                    <div className="login__icon"><KeyRound size={18} /></div>
                    <h1 className="login__title" id="set-password-title">Cria a tua palavra-passe</h1>
                    <p className="login__subtitle">Este é o teu primeiro acesso. Quando terminares, o teu perfil será criado e poderás entrar no sistema.</p>
                    {error && <p className="login__error" role="alert">{error}</p>}
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input className="login__input" type="password" autoComplete="new-password" placeholder="Nova palavra-passe" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <input className="login__input" type="password" autoComplete="new-password" placeholder="Confirma a palavra-passe" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required />
                        <button className="login__submit" type="submit" disabled={loading}>{loading ? "A guardar..." : "Guardar e continuar"}</button>
                    </form>
                </section>
            </main>
        </div>
    );
}
