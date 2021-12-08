import heart from "../../images/heart.png";

export default function LoveButton (props) {
    return(
        <button className="btn-interested">
            <img
                className="logo-interested"
                alt=""
                src={heart}
                onClick={props.handleLiked}
            />
        </button>
    );
}