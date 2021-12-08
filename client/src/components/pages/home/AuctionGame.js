import {Gavel,Cancel,BorderHorizontal, GpsFixed,
    VerifiedUserOutlined, Language} from '@material-ui/icons';
import React from 'react';
import banner from "../../images/banner-panther-site.png";
import AuctionG from "../../assets/AuctionGame.module.css"
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
        <Card className={`card-items ${AuctionG.cartAuctionGame}`}>
            <a className="auction-link" href={props.idRoom}>
                <Card.Img variant="top" className="src" src={props.auc.HinhAnh? props.auc.HinhAnh:banner} />
            </a>
            <Card.Body>
                <span className={`ml-5 ${AuctionG.cartGamePosition}`}>
                    <GpsFixed className="mr-1"/>
                    Vị trí: {props.auc.ViTri}
                </span>

                <span className={`ml-5 ${AuctionG.cartGameTime}`}>
                    
                    🕒 Thời gian: {props.auc.TgBatDau}
                </span>

                <span className={`ml-5 text-danger ${AuctionG.cartGameWebsite}`}>
                    <Language className="mr-1"/>
                    Website: {props.auc.Website}
                </span>

                <span className={`ml-5 text-success ${AuctionG.cartGamePriceBegun}`}>
                    
                    💸 Giá khởi điểm: {props.auc.Gia} VNĐ
                </span>
            </Card.Body>
            {props.handleLiked && <LoveButton handleLiked={handleLiked}/> }
            
        </Card>
    )
}