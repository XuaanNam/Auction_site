import { Card} from "react-bootstrap";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/Home.css";
import React from "react";
import "../../App.css";
//VIDEO - ANH
import background from "../images/background3.png";
import panther from "../images/Image.png";


//
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import  IsHappening from './home/isHappening'
import  IsComing from './home/isComing'
import TabComing from "./home/tabComing";
import TabHappening from "./home/tabHappening"
// import Body from '../body';

function Home() {
  const [happening, setHappening] = useState(true);
  const [listAuctionGame, setListAuctionGame] = useState([]);
  

  let navigate = useNavigate();
  let isAuth = 0;
  useEffect(() => {
    axios
      .get("isAuth")
      .then((res) => {
        if (res.data.isAuth) {
          isAuth = 1;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then( () => {
        if (isAuth !== 1) {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    axios.get("get/all/auction")
      .then((res) => {
        setListAuctionGame(res.data);
      })
  }, []);


  const handleSwitchTab = () => {
    setHappening( happening ? false : true);
  }

  const handleLiked = () => {
        
  }
  return (
    <div>
      <Header isActive={true} />
      <background style={{ backgroundImage: `url(${background})` }} />
      <div className = "home-container">
        <div className= "home-sologan">
          Slogan cho trang đấu giá
          <span className="panner">
            <Card.Img src={panther}></Card.Img>
          </span>
        </div>
        <div className="body-container pt-5 pl-5 pr-5 body-banner">   
                 {/* TABS SẮP ĐƯỢC ĐẤU GIÁ*/}
                
          {happening? 
            <TabHappening handleSwitchTab = {handleSwitchTab}/>

          : 
            <TabComing handleSwitchTab = {handleSwitchTab}/>

          }
          {happening? 
            <IsHappening listAuc={listAuctionGame} handleLiked={handleLiked}/> 
          : 
            <IsComing listAuc={listAuctionGame} handleLiked={handleLiked}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
