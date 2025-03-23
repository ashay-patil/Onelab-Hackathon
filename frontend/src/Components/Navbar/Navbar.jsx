import { Link } from "react-router-dom";
import './Navbar.css';
const Navbar = ({user})=>{
    return (
        <div className="navbar">
            <Link to="/dashboard">Home</Link>
            <Link to="/dashboard/detect-image">Detect Image</Link>
            <Link to="/dashboard/detect-news">Detect News</Link>
            <p>Hello {user.name}</p>
        </div>
    )
}

export default Navbar;