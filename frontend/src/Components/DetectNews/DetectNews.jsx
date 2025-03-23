import { useOutletContext } from "react-router-dom";

const DetectNews = ()=>{
    const { user } = useOutletContext();
    return (
        <div>
            <div>Detect News</div>
            <p>Hello {user.name}</p>
        </div>
    )
}

export default DetectNews;