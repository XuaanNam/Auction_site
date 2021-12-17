import {Gavel,Cancel,BorderHorizontal, GpsFixed,
    VerifiedUserOutlined, Language} from '@material-ui/icons';
import { useState, useEffect,React } from 'react';
import MessageToast from '../ToastMessage/MessageToast';
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
                setToastMessage(res.data.status, title, res.data.message);
            })
            .catch((err)=>{})
    }
    
    // State for toast mess
    const [toasts, setToasts] = useState([]);

    function setToastMessage(status, title, message) {
        setToasts(prevToast => [
            ...prevToast,
            {
                id: new Date().getTime(),
                status,
                title,
                message
            }
        ]); 
    }

    //close
    function handleCloseToast(toast) {
        setToasts(prevToast => prevToast.filter(item => item.id !== toast.id));
    };

    // animation
    const [remove, setRemove] = useState(null);

    useEffect(() =>{
        if (remove) {
            setToasts(prevToast => prevToast.filter(toast => toast.id !== remove));
        }
    }, [remove]);

    useEffect(() =>{
        if (toasts.length) {
            setTimeout(() => setRemove(toasts[toasts.length - 1].id), 2000);
        }
    }, [toasts]);

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
             {/* TOAST MESSAGE */}
          <MessageToast 
            toasts={toasts}
            setToasts={setToasts}
            handleCloseToast={handleCloseToast}/>   
        </Card>
    )
}