import { useOutletContext } from "react-router-dom";

const Home = () => {
    const { user } = useOutletContext();
    return (
        <div className="home">
            <div>Home</div>
            <p>Hello {user.name}</p>
        </div>

    )
}

export default Home;