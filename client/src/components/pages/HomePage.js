import {useState, useEffect} from "react";
import axios from "../../api/axios"; 
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/Home.css'
import { useNavigate } from 'react-router-dom';
import background from '../images/background3.png';
import panther from '../images/Image.png';
import MessageToast from "./ToastMessage/MessageToast";
import {Card} from 'react-bootstrap';
import  IsComing from './home/isComing';


export default function HomePage() {
    const [listAuctionComing, setListAuctionComing] = useState([]);
    const [search, setSearch] = useState('');
    const [listAuctionSearching, setListAuctionSearching] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
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
    
    const handleSearch = (e) => {
        e.preventDefault();
        if(search.trim() !== "")
        {
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
    <Header isGuest={true} onChange={onChange} handleSearch={handleSearch}/>
    <div className="background" style={{ backgroundImage: `url(${background})` }}/>
        <div className = "home-container">
            <div className= "home-sologan">
                <span id ="slogan">Đấu giá Panther - Tranh đoạt Banner<span>〽️</span> </span> <br/>
                <span className="homepage-panther">
                    <Card.Img src={panther}></Card.Img>
                </span>
            </div>
            <div  className="body-container pt-5 pl-5 pr-5 body-banner">
                <p className="auction-title">Sắp được đấu giá</p>
                {isSearching ?
                 <IsComing listAucC={listAuctionSearching} handleLiked={false}/>
                 :
                 <IsComing listAucC={listAuctionComing} handleLiked={false}/>
                }
               
            </div>
        </div>
        <MessageToast 
            toasts={toasts}
            setToasts={setToasts}
            handleCloseToast={handleCloseToast}/> 
      <Footer/>
    </div>
    )
}




