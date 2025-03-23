import { useOutletContext } from "react-router-dom";

const Home = () => {
    const { user } = useOutletContext();
    return (
        <div className="home">
            <div>Home</div>
        </div>

    )
}

export default Home;