import { Outlet } from "react-router-dom"
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
const SharedLayout = ({user})=>{
    if(!user){
        alert('You Need to login first');
        return <Navigate to="/"/>
    }
    return (
        <>
        <Navbar/>
        <Outlet context={{user}}/>
        <Footer/>
        </>
    )
}
export default SharedLayout;