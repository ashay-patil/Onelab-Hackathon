import { useOutletContext } from "react-router-dom";

const DetectNews = ()=>{
    const { user } = useOutletContext();
    return (
        <div>
            <div>Detect News</div>
        </div>
    )
}

export default DetectNews;