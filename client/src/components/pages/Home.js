import { Card} from "react-bootstrap";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/Home.css";
import React from "react";
import "../../App.css";
//VIDEO - ANH
import background from "../images/background.jpg";
import panther from "../images/Image.png";
import anh from "../images/a.png";


//
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import  IsHappening from './home/isHappenning'
import  IsComming from './home/isComming'
// import Body from '../body';

function Home() {
  const [happening, setHappening] = useState(true);

  let navigate = useNavigate();
  let isAuth = 0;
  useEffect(() => {
    axios
      .get("isAuth")
      .then((Response) => {
        if (Response.data.isAuth) {
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

  const handleSwitchTab = () => {
    setHappening( happening ? false : true);
  }

  return (
    <div>
      <Header isActive={true} />
      <background style={{ backgroundImage: `url(${background})` }} />
      <Container>
        <Slogan>
          Slogan cho trang đấu giá
          <span className="panner">
            <Card.Img src={panther}></Card.Img>
          </span>
        </Slogan>
        <div src={anh} className="body-container pt-5 pl-5 pr-5 body-banner">   
          {happening? <IsHappening onSwitch={handleSwitchTab}/> : <IsComming onSwitch={handleSwitchTab}/>}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

// CSS
const Container = styled.div`
  width: 100%;
  padding-top: 200px;
  //   padding-bottom: 200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const Slogan = styled.div`
  position: relative;
  color: #fff;
  padding-bottom: 40vh;
  font-size: 2rem;
  padding-left: 5rem;
  width: 100%;
  height: 50px;
  z-index: 1;
`;


export default Home;
