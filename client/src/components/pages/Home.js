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
import  IsHappening from './home/isHappening';
import  IsComing from './home/isComing';
import TabComing from "./home/tabComing";
import TabHappening from "./home/tabHappening"
// import Body from '../body';

function Home() {
  const [happening, setHappening] = useState(true);
  const [listAuctionComing, setListAuctionComing] = useState([]);
  const [listAuctionHappening, setListAuctionHappening] = useState([]);
  

  let navigate = useNavigate();
  let isAuth = 0;
  useEffect(() => {
    axios
      .get("isAuth")
      .then((res) => {
        if (res.data.isAuth) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setListAuctionComing(res.data.isComing);
        setListAuctionHappening(res.data.isHappening);
      })
  }, []);


  const handleSwitchTab = () => {
    setHappening( happening ? false : true);
  }

  return (
    <div>
      <Header isActive={true} />
      <div className="background" style={{ backgroundImage: `url(${background})` }} />
      <div className = "home-container">
        <div className= "home-sologan">
          <span className="home-panther">
            <Card.Img src={panther}></Card.Img>
          </span>
        </div>
        <div className="body-container pt-5 pl-5 pr-5 body-banner">   
          {happening? 
            <TabHappening handleSwitchTab = {handleSwitchTab}/>

          : 
            <TabComing handleSwitchTab = {handleSwitchTab}/>

          }
          {happening? 
            <IsHappening listAucH={listAuctionHappening}/> 
          : 
            <IsComing handleLiked={true} listAucC={listAuctionComing}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
