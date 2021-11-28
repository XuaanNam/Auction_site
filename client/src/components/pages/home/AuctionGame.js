import React from 'react';
import banner from "../../images/banner-panther-site.png";
import { Card} from "react-bootstrap";
import LoveButton from './LoveButton';
import axios from "../../../api/axios";


export default function AuctionGame (props){
    let idDG = props.auc.idDG;

    const handleLiked = () =>{
        axios.post('/auction/loved',{idDG})
            .then((res)=>{
                alert(res.data.message);
            })
            .catch((err)=>{})
    }
    return(
        <Card className="card-items">
            <a className="auction-link" href={props.idRoom}>
                <Card.Img variant="top" className="src" src={props.auc.HinhAnh? props.auc.HinhAnh:banner} />
            </a>
            <Card.Body>
                <Card.Title>
                    <span className="ml-5">Vị trí: </span><span>{props.auc.ViTri}</span>
                    <span className="ml-5">Thời gian:</span><span>{props.auc.TgBatDau}</span>
                </Card.Title>
                <div className="d-flex pt-1">
                    <span>Website:</span><span>{props.auc.Website}</span>
                    <span className="ml-10">Giá khởi điểm:</span><span>{props.auc.Gia}</span>
                </div>
            </Card.Body>
            {props.handleLiked && <LoveButton handleLiked={handleLiked}/> }
            
        </Card>
    )
}