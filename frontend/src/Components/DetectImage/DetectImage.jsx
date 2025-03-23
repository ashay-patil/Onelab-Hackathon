import { useOutletContext } from "react-router-dom";

const DetectImage = ()=>{
    const { user } = useOutletContext();
    return (
        <div>
            <div>Detect Image</div>
            <p>Hello {user.name}</p>
        </div>
    )
}

export default DetectImage;