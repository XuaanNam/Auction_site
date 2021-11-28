import heart from "../../images/heart.png";

export default function LoveButton (props) {
    return(
        <button className="btn-interest">
            <img
                className="logo-interest pl-2"
                alt=""
                src={heart}
                rounded
                onClick={props.handleLiked}
            />
        </button>
    );
}