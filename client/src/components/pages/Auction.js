import React from "react";
import "../../App.css";
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AuctionD from "../assets/AuctionDetail.module.css";
//Ảnh
import background from "../images/background.jpg";
import banner1 from "../images/img-1.png";
//backend
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const socket = io.connect("http://localhost:4000");
const username = cookies.get('username') ? cookies.get('username'): null;

function Auction() {
    let params = useParams();

    const [listBetHistory, setListBetHistory] = useState([]);

    const [currentPrice, setCurrentPrice] = useState("");
    const [highestPrice, setHighestPrice] = useState("");
    const [priceStep, setPriceStep] = useState("");
    const [userWinner, setUserWinner] = useState("");
    const [website, setWebsite] = useState("");
    const [position, setPosition] = useState("");
    const [bannerSize, setBannerSize] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [time, setTime] = useState("");

    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(() => {
        axios
            .get("isAuth")
            .then((Response) => {
                if (Response.data.isAuth) {
                    isAuth = 1;
                    socket.emit("join_room", params.id);

                    axios.get("auction/info", { params: { id: params.id } })
                        .then((Response) => {
                            if(Response.data.message) {
                                navigate("/");
                            } else {   
                                setCurrentPrice(convertPrice(Response.data.highestPrice));
                                setHighestPrice(convertPrice(Response.data.highestPrice));
                                setPriceStep(convertPrice(Response.data.priceStep));
                                setWebsite(Response.data.website);
                                setPosition(Response.data.position);
                                setBannerSize(Response.data.bannerSize);
                                setUrlImage(Response.data.urlImage);
                                setTime(Response.data.time);
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(function () {
                if (isAuth !== 1) {
                navigate("/");
                } else {
                    socket.emit("get_data_room", {room: params.id});
                }
            });
        
    }, []);

    useEffect(() =>{
        socket.on("receive_data", (data) =>{
            const i = parseInt(params.id)-1;
            if(data === false) {
            } else {
                setUserWinner(data.userWinner);
                setHighestPrice(data.highestPrice);
                setCurrentPrice(data.highestPrice);
                setListBetHistory( list =>[...list, data]);
            }

        });
  
    }, [socket ])

    const calculatePrice = (currentPrice, step, highestPrice, inc) => {
        const intCurrentPrice = parseInt(currentPrice.split(',')[0] + currentPrice.split(',')[1] 
                                + currentPrice.split(',')[2]);
        const intStep = parseInt(step.split(',')[0] + step.split(',')[1] + step.split(',')[2]);

        if(inc === true) { 
            return intCurrentPrice + intStep;
        } else {
            const intHighestPrice = parseInt(highestPrice.split(',')[0] + highestPrice.split(',')[1] 
                                    + highestPrice.split(',')[2]);
            const rs = intCurrentPrice - intStep;
            if(rs > intHighestPrice){
                return rs;
            } else {
                return false;
            }
        }
    }

    const convertPrice = (price) => { 
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0
        })
          
        return formatter.format(price);
    }

    const handleBet = async () => {    
        const auctionData = {
            room: params.id,
            userWinner: username,
            highestPrice: currentPrice,
            currentTime: new Date(Date.now()).getHours() + ':' 
            + new Date(Date.now()).getMinutes()
        }
        await socket.volatile.emit('bet_more', auctionData);
        setListBetHistory( list =>[...list, auctionData]);
    };

   
    const handleIncrement = () => {

        const cal = calculatePrice(currentPrice, priceStep, highestPrice, true);
        const result = convertPrice(cal);
        setCurrentPrice(result);
    };

    const handleDecrement = () => {

        const cal = calculatePrice(currentPrice, priceStep, highestPrice, false);
        if(cal === false) {
            return 
        } else {
            const result = convertPrice(cal); 
            setCurrentPrice(result);
        }
    };

    return (
        <div>
            {/* <Header isActive={true} /> */}
            <background style={{ backgroundImage: `url(${background})` }} />

            <div className={AuctionD.container}>
                <div className={`body-container pt-2 pl-5 pr-5 ${AuctionD.bodyBanner}`}>
                    <div
                        className={`body-container pt-2 pl-5 pr-5 ${AuctionD.detailCard}`}
                    >
                        <Card.Img
                            variant="top"
                            src={banner1}
                            className={AuctionD.imgCard}
                        />
                        <Card.Body>
                            {/* vị trí */}
                            <Card.Title className={AuctionD.auctionTitle}>
                                Vị trí: {position}
                            </Card.Title>
                            {/* kích thước */}

                            <span className={AuctionD.auctionSize}>Kích thước: {bannerSize}</span>
                            <span className={AuctionD.auctionWebsite}>
                                Trang web: {website}
                            </span>

                            <div className="d-flex pt-4">
                                <span>
                                <strong> Thời gian: {time}</strong>{" "}
                                </span>
                                <span className={AuctionD.auctionWinCurrent}>
                                <strong>Người thắng hiện tại: </strong>
                                <span>{userWinner}</span>
                                </span>
                            </div>

                            <div className="d-flex pt-4">
                                {/* Giá bắt đầu */}
                                <div>
                                    <b className={AuctionD.priceCurrent}>Giá đấu hiện tại:</b>{" "}
                                    <br />
                                   <b className={AuctionD.priceShow}  ><span id="highest-price">{highestPrice}</span> VNĐ</b>
                                </div>

                                {/* Giá nhảy mỗi lượt */}
                                <div className={AuctionD.jumpPriceInfo}>
                                    <b className={AuctionD.priceJump}>Bước giá:</b> <br />
                                    <b className={AuctionD.priceJumpShow}><span id = "price-step">{priceStep}</span> VNĐ</b>
                                </div>
                            </div>
                            <div className="d-flex pt-5">
                                <div>
                                    <Button
                                        onClick={handleDecrement}
                                        variant="info"
                                        style={{ minWidth: "3vw" }}
                                    >
                                        <b>-</b>
                                    </Button>
                                    <span className="ml-3 mr-3">
                                        <b className={AuctionD.priceTurn}><span id="current-price" >{currentPrice}</span> VNĐ</b>
                                    </span>
                                    <Button
                                        onClick={handleIncrement}
                                        variant="info"
                                        style={{ minWidth: "3vw" }}
                                    >
                                        <b>+</b>
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleBet}
                                    variant={`info ${AuctionD.mglButton}`}
                                    style={{ minWidth: "12vw" }}
                                >
                                    <b>Đặt giá thầu</b>
                                </Button>
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
                        {/* BINDING DANH SÁCH NGƯỜI ĐANG ĐẤU GIÁ */}
                        {/* Người chơi 1 */}
                        <tr>
                            <td>Unknow</td>
                            {Array.from({ length: 2 }).map((_, index) => (
                            <td key={index}> Info {index}</td>
                            ))}
                        </tr>
                        {/* Người chơi 2 */}
                        <tr>
                            <td>User</td>
                            {Array.from({ length: 2 }).map((_, index) => (
                            <td key={index}> Info {index}</td>
                            ))}
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Auction;
