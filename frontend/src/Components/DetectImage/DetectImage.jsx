import { useOutletContext } from "react-router-dom";

const DetectImage = ()=>{
    const { user } = useOutletContext();
    return (
        <div>
            <div>Detect Image</div>
        </div>
    )
}

export default DetectImage;