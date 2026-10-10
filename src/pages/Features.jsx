import { useEffect, useState } from "react";
import { ChevronDown, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FEATURES } from "../lib/features.js";
import { supabase } from "../lib/supabase.js";
import "./features.css";

export default function Features() {
    const [profile, setProfile] = useState(null);
    const [openFeature, setOpenFeature] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return navigate("/login", { replace: true });

            const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
            if (error || !data) return navigate("/alterar-palavra-passe", { replace: true });
            if (!data.approved) {
                await supabase.auth.signOut();
                return navigate("/login", { replace: true });
            }
            setProfile(data);
        }
        loadProfile();
    }, [navigate]);

    async function signOut() {
        await supabase.auth.signOut();
        navigate("/login", { replace: true });
    }

    if (!profile) return null;

    return (
        <div className="features-page">
            <header className="features-page__header">
                <div><p className="features-page__eyebrow"><ShieldCheck size={16} /> Área reservada</p><h1>Funcionalidades</h1></div>
                <button className="features-page__logout" type="button" onClick={signOut}><LogOut size={17} /> Sair</button>
            </header>
            <main className="features-page__content">
                <p className="features-page__intro">Escolhe uma funcionalidade para ver os detalhes. As opções a cinzento ainda não estão disponíveis para a tua conta.</p>
                <div className="features-grid">
                    {FEATURES.map(({ key, title, description, icon: Icon }) => {
                        const permitted = Boolean(profile[key]);
                        const expanded = openFeature === key;
                        return <article className={`feature-card ${permitted ? "" : "feature-card--locked"}`} key={key}>
                            <button className="feature-card__trigger" type="button" disabled={!permitted} onClick={() => setOpenFeature(expanded ? null : key)} aria-expanded={expanded}>
                                <span className="feature-card__icon"><Icon size={22} /></span>
                                <span className="feature-card__heading"><strong>{title}</strong><small>Acesso: {permitted ? "1" : "0"}</small></span>
                                <ChevronDown className={expanded ? "feature-card__chevron feature-card__chevron--open" : "feature-card__chevron"} size={20} />
                            </button>
                            {expanded && <div className="feature-card__details"><p>{description}</p><button type="button">Abrir funcionalidade</button></div>}
                            {!permitted && <p className="feature-card__locked-label">Sem acesso</p>}
                        </article>;
                    })}
                </div>
            </main>
        </div>
    );
}
