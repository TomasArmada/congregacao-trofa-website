// import { Link } from "react-router-dom";
import "./home.css";
import {Link} from "react-router-dom";

export default function Home() {
    return (

        <div className="home">
            <div className="home__field" aria-hidden="true">
                <span className="home__glow home__glow--a" />
                <span className="home__glow home__glow--b" />
                <span className="home__glow home__glow--c" />
                <div className="home__grid" />
            </div>

            <main className="home__content">
                <img
                    className="home__logo"
                    src="/logos/svg/JW_TROFA_FINAL.svg"
                    alt="Congregação Trofa"
                    width="200"
                    height="200"
                />

                <h1 className="home__title">Bem-vindo</h1>

                <p className="home__notice">
                    O acesso a este site está reservado a contas atribuídas pelos
                    administradores da congregação. Se ainda não tens uma conta,
                    contacta um administrador para a receberes.
                </p>

                {/*Descomentar, quando o login estiver implementado.
                Apenas vai assim nesta versão, pq vai ser puxado para o main*/}
                <Link to="/login" className="home__cta">
                    Entrar
                </Link>

                {/*Pop-up temporário*/}

                {/*<button
                    type="button"
                    className="home__cta"
                    onClick={() =>
                        alert(
                            "Sistema ainda em implementação. Pedimos desde já desculpa. O acesso ainda está a ser preparado. Volte a tentar mais tarde."
                        )
                    }
                >
                    Entrar
                </button>*/}
            </main>
        </div>
    );
}