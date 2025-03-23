import { Link } from "react-router-dom";

const Navbar = ()=>{
    return (
        <div className="navbar">
            <Link to="/dashboard">Home</Link>
            <Link to="/dashboard/detect-image">Detect Image</Link>
            <Link to="/dashboard/detect-news">Detect News</Link>
        </div>
    )
}

export default Navbar;