import {Edit, AccountCircle} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import avtpanther from '../images/Logo.png'
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/Profile.css'
import ChangePass from './Profile/ChangePass';
import Information from './Profile/Infomation'
import MenuInfo from './Profile/MenuInfo'
import MenuChangePass from './Profile/MenuChangePass'
import background from "../images/background.jpg";
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Profile() {

    let navigate = useNavigate();
    let isAuth = 0;
    const [changePass, setChangePass] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [file, setFile] = useState(null);

    const [Ho, setHo] = useState("");
    const [Ten, setTen] = useState("");
    const [TenDN, setTenDN] = useState("");
    const [NgaySinh, setNgaySinh] = useState("");
    const [SDT, setSDT] = useState("");
    const [Email, setEmail] = useState("");
    const [Avt, setAvt] = useState("");
    const username = cookies.get('username') ? cookies.get('username'): null;
   
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
    },[username])

    useEffect(()=>{
        axios.get("isAuth",)
          .then((Response) => {
            if(Response.data.PQ === 1){
              setIsAdmin(true);
              
            } 
            if(Response.data.isAuth){
              console.log(isAuth);
              // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const chooseAvt = () => {
        const avt = document.getElementById('avt');
        avt.click();
    }

    const submitAvt = async() => {
        const image = new FormData();
        image.append("avatar", file);
        try {
            await axios.post('stored/avatar', image)
                    .then((res) => {
                        alert(res.data.message);
                    })
                    .catch(err => {console.log(err)})
                    .then(() => {
                        window.location.reload(false);
                    })
        } catch (error) {
            throw error
        }
    }

    const deleteAvt = () => {
        axios.patch('/delete/avatar')
            .then((res) => {
                alert(res.data.message);
            })
            .catch(err => {console.log(err)})
            .then(() => {
                window.location.reload(false);
            })
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
                            <img src={Avt||avtpanther} alt=""/>
                            <h4>{username}</h4>
                            
                            <div className="d-flex">
                                <input type="file"  style={{display: 'none'}} name="avatar" id='avt' onChange={ (e)=>{handleFile(e)} }/>
                                
                                <button onClick={chooseAvt} className="btn btn-info btn-sm" >
                                    {/* <AccountCircle className="mr-1"/>  */}
                                    Chọn ảnh
                                </button> 
                                {file ?
                                    <button onClick={submitAvt} className="btn btn-dark btn-sm" >
                                        <AccountCircle className="mr-1"/> 
                                        Đổi ảnh đại diện
                                    </button>
                                :
                                    <button onClick={deleteAvt} className="btn btn-danger btn-sm" >
                                        <AccountCircle className="mr-1"/> 
                                        Xóa ảnh
                                    </button>
                                }
                            </div>
                            <div className="btn-switch" >
                                {changePass ?
                                    <MenuInfo handleSwitchTab = {handleSwitchTab}/>
                                    :
                                    <MenuChangePass handleSwitchTab = {handleSwitchTab}/>
                                }
                            </div>
                        </div>
                        
                        
                    </div>
                    {/* profile */}
                    <div className="article">
                        <div className="title-art">
                         
                            <Edit class="clickToEdit"/>
                        
                            <h3>Thông tin cá nhân</h3>
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
                