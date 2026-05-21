import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Página home</h1>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
        </>
    )
}
export default Home