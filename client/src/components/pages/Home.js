import { Card} from "react-bootstrap";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/Home.css";
import React from "react";
import "../../App.css";
import MessageToast from "./ToastMessage/MessageToast";
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

function Home(props) {
  const [happening, setHappening] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [listAuctionComing, setListAuctionComing] = useState([]);
  const [listAuctionHappening, setListAuctionHappening] = useState([]);
  const [listAuctionSearching, setListAuctionSearching] = useState([]);
  const [search, setSearch] = useState('');
  

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
        const title = res.data.status === "info" ? "Thành công" : "Thất bại";
        setToastMessage(res.data.status, title, res.data.message);
        setListAuctionComing(res.data.isComing);
        setListAuctionHappening(res.data.isHappening);
      })
  }, []);

  const handleSwitchTab = () => {
    setHappening( happening ? false : true);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get('search', {params: {search}})
      .then((res)=>{
        if(res.data.isSearching){
          setListAuctionSearching(res.data.isSearching);
          setIsSearching(true);
        }
        const title = res.data.status === "info" ? "Thành công" : "Thất bại";
                setToastMessage(res.data.status, title, res.data.message);
      })
      .catch(err => {console.log(err)})
  }
  const onChange = search => setSearch(search);


  //TOAST FOR SEARCH
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

  return (
    <div>
      <Header coudldSearch={true} onChange={onChange} handleSearch={handleSearch} isActive={true} />
      <div className="background" style={{ backgroundImage: `url(${background})` }} />
      <div className = "home-container">
        <div className= "home-sologan">
          <span className="home-panther">
            <Card.Img src={panther}></Card.Img>
          </span>
        </div>
        <div className="body-container pt-5 pl-5 pr-5 body-banner">   
          {isSearching?
            <span>
              <p className="auction-title">Sắp được đấu giá</p>
              <IsComing handleLiked={true} listAucC={listAuctionSearching}/>
            </span>
            :
            <span>
              {happening? 
                <span>
                  <TabHappening handleSwitchTab = {handleSwitchTab}/>
                  <IsHappening listAucH={listAuctionHappening}/> 
                </span>
              : 
                <span>
                  <TabComing handleSwitchTab = {handleSwitchTab}/>
                  <IsComing handleLiked={true} listAucC={listAuctionComing}/>
                </span>
              }
            </span>
          }
        </div>
      </div>
         {/* TOAST MESSAGE */}
         <MessageToast 
            toasts={toasts}
            setToasts={setToasts}
            handleCloseToast={handleCloseToast}/>   
      <Footer />
    </div>
  );
}

export default Home;
