import { Outlet } from "react-router-dom"

const SharedLayout = ()=>{
    return (
        <>
        <div>navbar</div>
        <Outlet/>
        </>
    )
}
export default SharedLayout;