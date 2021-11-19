import React from 'react';
import '../../App.css';
import {Card,Row,Col,Button, Table } from 'react-bootstrap';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
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
            <Card className="body-container pt-2 pl-5 pr-5">
                <Card.Img variant="top" src='/imp.jpg' />
                <Card.Body>
                    <Card.Title>Tên banner</Card.Title>
                    <div className="pt-4">
                        <span> Thời gian </span>
                    </div>
                    <div className="d-flex pt-4">
                        <div>
                            <b className="">Giá đấu hiện tại</b> <br/>
                            <span className="">giá trị</span>
                        </div>
                        <div>
                            <b className="player-name">Người chơi</b> <br/>
                            <span className="player-name pt-2">tên người chơi</span>
                        </div>
                    </div>
                    <div className="d-flex pt-5">
                        <div>
                            <Button variant="info" style={{ minWidth: "3vw"}}><b>-</b></Button>
                            <span className="ml-3 mr-3"><b>giá đấu</b></span>
                            <Button variant="info" style={{ minWidth: "3vw"}}><b>+</b></Button>
                        </div>
                        <Button variant="info ml-4" style={{ minWidth: "12vw"}}><b>Đặt giá thầu</b></Button>
                    </div>
                </Card.Body>
            </Card>
            <Table responsive className="auction-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Người chơi</th>
                    <th>Giá thầu</th>
                    <th>Ngày giờ</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <td key={index}>cc {index}</td>
                    ))}
                    </tr>

                </tbody>
            </Table>
            <div className="description">
                Mô tả banner
            </div>
            <div className="descript">Mô tả</div>
            <Footer/>
        </div>
    )
}
export default Auction;