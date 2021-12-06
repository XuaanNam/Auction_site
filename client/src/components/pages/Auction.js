import React, { useState, useEffect } from "react";
import "../assets/Auction.css";
//page
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import GameControl from './Auction/GameControl';
import HistoryTable from './Auction/HistoryTable';
//ảnh
import background from "../images/background.jpg";
//backend
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
    const [isPrepare, setIsPrepare] = useState(true);
    const [isStart, setIsStart] = useState(false);
    const [isEnding, setIsEnding] = useState(false);

    const [currentPrice, setCurrentPrice] = useState("");
    const [highestPrice, setHighestPrice] = useState("");
    const [priceStep, setPriceStep] = useState("");
    const [userWinner, setUserWinner] = useState("");
    const [website, setWebsite] = useState("");
    const [position, setPosition] = useState("");
    const [bannerSize, setBannerSize] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(() => {
        axios.get("isAuth")
            .then((Response) => {
                if (Response.data.isAuth) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAuth = 1;
                    socket.emit("join_room", params.id);

                    axios.get("auction/info", { params: { id: params.id } })
                        .then((Response) => {
                            if(Response.data.message) {
                                navigate("/login");
                            } else {   
                                setCurrentPrice(convertPrice(Response.data.highestPrice));
                                setHighestPrice(convertPrice(Response.data.highestPrice));
                                setPriceStep(convertPrice(Response.data.priceStep));
                                setWebsite(Response.data.website);
                                setPosition(Response.data.position);
                                setBannerSize(Response.data.bannerSize);
                                setUrlImage(Response.data.urlImage);
                                setCurrentTime(Response.data.dateTime);
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(function () {
                if (isAuth !== 1) {
                navigate("/login");
                } else {
                    socket.emit("get_data_room", {room: params.id});
                }
            });
        
    }, []);

    useEffect(() =>{
        socket.on("receive_data", (data) =>{
            if(data === false) {
            } else {
                const hP = data.dataRoom.highestPrice.split(" ")[0];
                setUserWinner(data.dataRoom.userWinner);
                setHighestPrice(hP);
                setCurrentPrice(hP);
                setListBetHistory(data.listDataRoom);   
            } 
        });

        socket.on("timer", (data) => {
            setCurrentTime(data); 
            if(isStart === false){
                setIsPrepare(false);
                setIsStart(true);
            }
            if(parseInt(data) === 0){      
                setIsStart(false);
                setIsEnding(true);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //co the bug

    const handletime = () => {
        socket.emit('settimer', {room: params.id, time: 20});
    }

    const parseInterger = (intCurrency) => {
        return parseInt(intCurrency.split(',')[0] + intCurrency.split(',')[1] + intCurrency.split(',')[2]);
    }

    const calculatePrice = (currentPrice, step, highestPrice, inc) => {
        const intCurrentPrice = parseInterger(currentPrice);
        const intStep = parseInterger(step);

        if(inc === true) { 
            return intCurrentPrice + intStep;
        } else {
            const intHighestPrice = parseInterger(highestPrice);
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
        if(parseInterger(highestPrice) < parseInterger(currentPrice)){
            const auctionData = {
                room: params.id,
                userWinner: username,
                highestPrice: currentPrice,
                currentTime: new Date(Date.now()).getDate() + '/' 
                            + new Date(Date.now()).getMonth() + '/' 
                            + new Date(Date.now()).getFullYear() + ' - ' 
                            
                            + new Date(Date.now()).getHours() + ':' 
                            + new Date(Date.now()).getMinutes() + ':' 
                            + new Date(Date.now()).getSeconds() 
            }
            await socket.emit('bet_more', auctionData);

            if(parseInt(currentTime) <= 30 ){
                await socket.emit('setHaftMinLast', {room: params.id, time: 30})
            }
            //setListBetHistory( list =>[...list, auctionData]);
        }
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
            
            <Header isActive={true} /> 
            <background style={{ backgroundImage: `url(${background})` }} />
           
            <div className= "auc-layout">
                <div className="auc-game">  
                <button onClick = {handletime}>time</button>
                    <GameControl
                        isPrepare = {isPrepare}
                        isStart = {isStart}
                        isEnding = {isEnding}
                        urlImage = {urlImage}
                        position = {position}
                        bannerSize = {bannerSize}
                        website = {website}
                        currentTime = {currentTime}
                        userWinner = {userWinner}
                        highestPrice = {highestPrice}
                        priceStep = {priceStep}
                        currentPrice = {currentPrice}
                        handleIncrement = {handleIncrement}
                        handleDecrement = {handleDecrement}
                        handleBet = {handleBet}
                    />  
                    <HistoryTable
                        listBetHistory = {listBetHistory}
                    />

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Auction;
