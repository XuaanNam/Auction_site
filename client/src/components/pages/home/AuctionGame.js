import { GpsFixed, Language, Timelapse} from '@material-ui/icons';
import React  from 'react';
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
                const title = res.data.status === "success" ? "Thành công" : "Thất bại";
                props.setToastMessage(res.data.status, title, res.data.message);
            })
    }

    //for chuyen doi tien
    const convertPrice = (price) => { 
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0
        })
          
        return formatter.format(price);
    }


    return(
        <Card className={`card-items ${AuctionG.cartAuctionGame}`}>
            <a className="auction-link" href={props.idRoom}>
                <Card.Img variant="top" className="src" src={props.auc.HinhAnh? props.auc.HinhAnh:banner} />
            </a>
            <Card.Body>
                
                <div className={`ml-2 mb-2 text-danger d-flex ${AuctionG.cartGameWebsite}`}>
                    <Language className="mr-1"/>
                    <div className="ml-1">
                    Website: {props.auc.Website}
                    </div>
                </div>
                <div className={`ml-2 mb-2 ${AuctionG.cartGameTime}`}>
                    🕒 Thời gian: {props.auc.TgBatDau}
                </div>
                <div className={`ml-2 mb-2 d-flex ${AuctionG.cartGameDuration}`}>
                    <Timelapse clasName="mr-1"/>
                    <div className="ml-2">
                    Thời hạn: {props.auc.ThoiHan} tháng
                    </div>
                </div>
                <div className={`ml-2 mb-2 d-flex ${AuctionG.cartGamePosition}`}>
                    <GpsFixed className="mr-1"/>
                    <div className="ml-1">
                    Vị trí: {props.auc.ViTri}
                    </div>
                </div>
                <div className={`ml-4 text-success ${AuctionG.cartGamePriceBegun}`}>
                    💸 Giá khởi điểm: {convertPrice(props.auc.Gia)} VNĐ
                </div>
            </Card.Body>
            {props.handleLiked && <LoveButton handleLiked={handleLiked}/> }
 
        </Card>
    )
}