import React from 'react';
import anh from "../../images/a.png";
import heart from "../../images/heart.png";
import { Card} from "react-bootstrap";

export default function AuctionGame (props){
    return(
        <Card className="card-items">
            <a className="auction-link" href="/home">
                <Card.Img variant="top" className="src" src={anh} />
            </a>
            <Card.Body>
                <Card.Title>
                    Vị trí: <strong>Tên banner 1 </strong>
                    <span className="ml-5">Thời gian:</span>
                </Card.Title>
                <div className="d-flex pt-1">
                    <span>Kích thước:</span>
                    <span className="ml-10">Bước giá:</span>
                </div>
            </Card.Body>
            <button className="btn-interest">
                <img
                    className="logo-interest pl-2"
                    alt=""
                    src={heart}
                    rounded
                    onClick={props.handleLiked}
                />
            </button>
        </Card>
    )
}