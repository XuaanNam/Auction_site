import {Edit, AccountCircle} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/Profile.css'
import ChangePass from './Profile/ChangePass';
import Information from './Profile/Infomation'
import MenuInfo from './Profile/MenuInfo'
import MenuChangePass from './Profile/MenuChangePass'
//
import background from "../images/background.jpg";
// import
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Profile() {

    let navigate = useNavigate();
    let isAuth = 0;
    const [changePass, setChangePass] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasImg, setHasImg] = useState(false);

    const [Ho, setHo] = useState("");
    const [Ten, setTen] = useState("");
    const [TenDN, setTenDN] = useState("");
    const [NgaySinh, setNgaySinh] = useState("");
    const [SDT, setSDT] = useState("");
    const [Email, setEmail] = useState("");
    const [Avt, setAvt] = useState("");
    const username = cookies.get('username') ? cookies.get('username'): null;
    const avt = "/image/AVT/Avatar_24-10-2021_406043921.jpg"
    useEffect(()=>{
        axios.get("get/user")
            .then((Response) => {
                if (Response.data.message) {
                    setTenDN(username);
                    setHo(Response.data.Ho);
                    setTen(Response.data.Ten);
                    setNgaySinh(Response.data.NgaySinh);
                    setSDT(Response.data.SDT);
                    setEmail(Response.data.Email);
                    setAvt(Response.data.Avt);
                } 
            })
            .catch((err) => {
                console.log(err)
            });
    },[])

    useEffect(()=>{
        axios.get("isAuth",)
          .then((Response) => {
            if(Response.data.PQ === 1){
              setIsAdmin(true);
              
            } 
            if(Response.data.isAuth){
              console.log(isAuth);
              isAuth = 1;
            }
          })
          .catch(error => { console.log(error);})
          .then(function () {
            if(isAuth !== 1){
              navigate('/');
            }       
          });
    }, []);

    const handleSwitchTab = () => {
        setChangePass( changePass ? false : true);
    }

    const chooseAvt = () => {
        const avt = document.getElementById('avt');
        avt.click();
    }

    const submitAvt = async() => {
        var formData = new FormData();
        formData.append("avatar", avt.files[0]);
        if(hasImg){
            await axios.post('/stored/avatar', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then((Response) => {
                    alert(Response.data.message);
                })
                .catch((err) => {}) 
        }    
    }
    return (
        <div>
            {isAdmin?
                <Header isAdmin={true}/> 
            :
                <Header isActive={true}/> 
            }
            <background style={{ backgroundImage: `url(${background})` }} />

            <div className="profile-layout">
                <div className="main-container">   
                    <div className="slide-bar">
                        <div className="avatar">
                            <img src={avt} alt=""/>
                            <h4>{username}</h4>
                            
                            <input type="file" style={{display: 'none'}} 
                                name="avatar" id='avt' 
                                onChange={(e) => {setHasImg(true);}}
                            />
                            <div className="d-flex">
                                <button onClick={chooseAvt} className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                    <AccountCircle className="mr-1"/> 
                                    Đổi ảnh đại diện
                                </button> 
                                <span onClick={submitAvt} className="ml-4 mr-4 mt-3 mb-4" >
                                    <AccountCircle /> 
                                    
                                </span> 
                            </div>
                            
                             
                        </div>
                        <div className="btn-switch" >
                            {changePass ?
                                <MenuInfo handleSwitchTab = {handleSwitchTab}/>
                                :
                                <MenuChangePass handleSwitchTab = {handleSwitchTab}/>
                            }
                        </div>
                        
                    </div>
                    {/* profile */}
                    <div className="article">
                        <div className="title-art">
                         
                            <Edit class="clickToEdit"/>
                        
                            <h3>Thông tin cá nhân</h3>
                            <h6>Thông tin về cá nhân bạn là hoàn toàn được bảo mật!</h6>
                        </div>
                        <div className="input-art">

                            {changePass ? <ChangePass/> 
                            :
                            <Information
                                Ho={Ho}
                                Ten={Ten}
                                Email={Email}
                                TenDN={TenDN}
                                NgaySinh={NgaySinh}
                                SDT={SDT}

                            /> 
                            }
                            
                        </div>
                    </div>

                </div>
                
            </div>

            <Footer/>
        </div>
    )
};

export default Profile;
                