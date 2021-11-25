import {Edit, AccountCircle} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import avatar from '../images/img-login.png'
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





const Profile = () => {

    const [changePass, setChangePass] = useState(false);
    
    const username = cookies.get('username') ? cookies.get('username'): null;

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

    const handleSwitchTab = () => {
        setChangePass( changePass ? false : true);
    }

    const chooseAvt = () => {
        const avt = document.getElementById('avt');
        avt.click();
    
        if(avt.files.length === 0 ){
            return
        } else {
            document.getElementById('form-avt').submit();
        }
    }
    return (
        <div>
            <Header isActive={true}/>
            <background style={{ backgroundImage: `url(${background})` }} />
                <div className="profile-Container">
                    {/* sidebar */}
                    <div className="bodyContainerProfile pt-5 pl-5 pr-5 body-banner">   
                    
                        {/* ICON */}
                        <button>
                        <Edit class="clickToEdit"/>
                        </button>
                        <div className="profile-SideBar">
                            <div className="profile-HeaderBar">
                                <img className="profile-Avatar" src={avatar} alt="avatar"/>
                                <h4 className="profile-FullName">{username}</h4>
                                <form id='form-avt' style={{display: 'none'}}  action="/stored/avatar" method="post" enctype="multipart/form-data">
                                    <input type="file" name="avatar" id='avt'/>
                                </form>
                                    <button onClick={chooseAvt} className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                        <AccountCircle className="mr-1"/> 
                                        Đổi ảnh đại diện
                                    </button> 
                                    {/* <span onClick={submitAvt} className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                        <AccountCircle className="mr-1"/> 
                                        Thay đổi ngay
                                    </span> */}
                            </div>
                            <div className="profile-Hr" />
                            <div className="profile-Menu">
                                <div className="profile-MenuItems menu-items" >
                                    {changePass ?
                                        <MenuInfo handleSwitchTab = {handleSwitchTab}/>
                                        :
                                        <MenuChangePass handleSwitchTab = {handleSwitchTab}/>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* profile */}
                        <div className="profile-ProfileBar">
                            <div className="profile-ProfileHeader">
                                <h3 className="profile-Title">Thông tin cá nhân</h3>
                                <p className="profile-SubTitle">Thông tin về cá nhân bạn là hoàn toàn được bảo mật!</p>
                            </div>
                            <div className="profile-ProfileBody">

                                {changePass ? <ChangePass/> : <Information/> }
                                
                            </div>
                        </div>

                    </div>
                    
                </div>
            <Footer/>
        </div>
    )
};

export default Profile;
                