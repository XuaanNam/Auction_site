import React from 'react';
import '../../App.css';
import {Card,Row,Col,Button, Table } from 'react-bootstrap';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import AuctionD from '../assets/AuctionDetail.module.css';
//Ảnh
import background from '../images/background.jpg';
import banner1 from '../images/img-1.png'
import { useEffect} from "react";
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';

function Auction() {



    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(()=>{
        axios.get("isAuth",)
          .then((Response) => {
            if(Response.data.isAuth){
              isAuth = 1;
            }
          })
          .catch(error => { console.log(error);})
          .then(function () {
            if(isAuth !== 1){
              navigate('/')
            }       
          });
    }, []);

    return (
        <div>
            <Header isActive={true}/>
            <background style={{ backgroundImage: `url(${background})` }}/>
                <div className={AuctionD.container}>
                    <div className={`body-container pt-2 pl-5 pr-5 ${AuctionD.bodyBanner}`}>
                        <div className={`body-container pt-2 pl-5 pr-5 ${AuctionD.detailCard}`}>
                            <Card.Img variant="top" src={banner1} className={AuctionD.imgCard}/>
                            <Card.Body>
                                {/* vị trí */}
                                <Card.Title className={AuctionD.auctionTitle}>Vị trí: Top Banner</Card.Title>
                                {/* kích thước */}
                                
                                <span className={AuctionD.auctionSize}>Kích thước: 900x80</span>
                                
                                <div className="pt-4">
                                    <span><strong> Thời gian: 15:00</strong> </span>
                                </div>
                                <div className="d-flex pt-4">
                                    <div>
                                        <b className={AuctionD.priceCurrent}>Giá đấu hiện tại:</b> <br/>
                                        <span className={AuctionD.priceShow}>10.000.000 vnđ</span>
                                    </div>
                                    <div>
                                        <b className="player-name">Người chơi:</b> <br/>
                                        {/* ICON */}
                                        <span className="player-name pt-2 ">
                                            <strong>
                                            User
                                            </strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex pt-5">
                                    <div>
                                        <Button variant="info" style={{ minWidth: "3vw"}}><b>-</b></Button>
                                        <span className="ml-3 mr-3">
                                            <b className={AuctionD.priceTurn}>
                                                2.000.000 vnđ
                                            </b>
                                        </span>
                                        <Button variant="info" style={{ minWidth: "3vw"}}><b>+</b></Button>
                                    </div>
                                    <Button variant={`info ${AuctionD.mglButton}`} style={{ minWidth: "12vw"}}><b>Đặt giá thầu</b></Button>
                                </div>
                            </Card.Body>
                        </div>
                        <Table responsive className="auction-table">
                            <thead>
                            <tr className={AuctionD.lineTable}>
                                <th>Người chơi</th>
                                <th>Giá thầu</th>
                                <th>Ngày giờ</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Unknow</td>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <td key={index}> test {index}</td>
                                ))}
                                </tr>

                            </tbody>
                        </Table>

                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Auction;