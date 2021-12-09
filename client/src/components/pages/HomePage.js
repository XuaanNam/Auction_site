import {useState, useEffect} from "react";
import axios from "../../api/axios"; 
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/Home.css'
import { useNavigate } from 'react-router-dom';
import background from '../images/background3.png';
import panther from '../images/Image.png';
import panther_img from '../images/a.png';

import {Card} from 'react-bootstrap';
import  IsComing from './home/isComing';


export default function HomePage() {
    const [listAuctionComing, setListAuctionComing] = useState([]);
    let navigate = useNavigate();   

    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
            if(Response.data.isAuth) {            
                navigate('/home');    
            }
        })
        .catch(error => console.error(error));
    }, [navigate]);

    useEffect(() => {
        axios.get("get/auction/iscoming")
        .then((res) => {
            if(res.data !== ""){
                setListAuctionComing(res.data.isComing);
            }
           
        })
    }, []);
    


    return (
    <div>
    <Header isGuest={true}/>
    <div className="background" style={{ backgroundImage: `url(${background})` }}/>
        <div className = "home-container">
            <div className= "home-sologan">
                <span id ="slogan">Đấu giá Panther - Tranh đoạt Banner<span>〽️</span> </span> <br/>
                <span className="homepage-panther">
                    <Card.Img src={panther}></Card.Img>
                </span>
            </div>
            <div src={panther_img} className="body-container pt-5 pl-5 pr-5 body-banner">
                <p className="auction-title">Sắp được đấu giá</p>
                <IsComing listAucC={listAuctionComing} handleLiked={false}/>
            </div>
        </div>
      <Footer/>
    </div>
    )
}




