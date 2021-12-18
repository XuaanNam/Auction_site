import {Edit, DeleteForever, PhotoSizeSelectLarge} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import avtpanther from '../images/Logo.png'
import Header from "../layout/Header";
import Footer from '../layout/Footer';
//
import MessageToast from '../pages/ToastMessage/MessageToast' 
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
    const [toasts, setToasts] = useState([]);
    const [remove, setRemove] = useState(null);

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
            .then((res) => {
                if (res.data.message) {
                    setTenDN(username);
                    setHo(res.data.Ho?res.data.Ho:"");
                    setTen(res.data.Ten?res.data.Ten:"");
                    setNgaySinh(res.data.NgaySinh?res.data.NgaySinh:"");
                    setSDT(res.data.SDT?res.data.SDT:"");
                    setEmail(res.data.Email);
                    setAvt(res.data.Avt);                    
                } 
            })
            .catch((err) => {
                console.log(err)
            });
    },[username])

    useEffect(()=>{
        axios.get("isAuth",)
          .then((res) => {
            if(res.data.PQ === 1){
              setIsAdmin(true);
              
            } 
            if(res.data.isAuth){
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

    useEffect(() => {
        const image = new FormData();
        if(file){
            image.append("avatar", file);
            try {
                axios.post('stored/avatar', image)
                    .then((res) => {
                        const title = res.data.status === "success" ? "Thành công" : "Thất bại";
                        setToastMessage(res.data.status, title, res.data.message);
                        setAvt('n');
                    })
            } catch (error) {
                throw error
            }
        }
    }, [file]);

    const deleteAvt = () => {
        axios.patch('/delete/avatar')
            .then((res) => {
                const title = res.data.status === "success" ? "Thành công" : "Thất bại";
                setToastMessage(res.data.status, title, res.data.message);
                setAvt('');
                setFile(null);
            })
    }


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
    //

    return (
        <div>
            {isAdmin ? <Header isAdmin={true}/> : <Header isActive={true}/>}
            <img alt="" className="img-inout" src={background}></img>
            <div className="profile-layout">
                <div className="main-container">   
                    <div className="slide-bar">
                        <div className="avatar">
                            {file ? 
                                
                                <img  alt="not found" src={URL.createObjectURL(file) ||avtpanther} />
                                
                            :
                                <img src={Avt||avtpanther} alt=""/>
                            }
                            
                            <h4>{username}</h4>
                            <div className="d-flex">
                                <input type="file"  style={{display: 'none'}} 
                                    name="avatar" id='avt' 
                                    onChange={ (e)=>{handleFile(e)} }
                                />
                                
                                <button onClick={chooseAvt} className="btn btn-info btn-sm" >
                                    <PhotoSizeSelectLarge className="mr-1"/> 
                                    Chọn ảnh
                                </button> 
                                {Avt &&                                
                                    <button onClick={deleteAvt} className="btn btn-danger btn-sm" >
                                        <DeleteForever className="mr-1"/> 
                                        Xoá ảnh
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
                    
                    <div className="article">
                        <div className="title-art">
                            
                            <Edit className="clickToEdit"/>
                        
                            <h3>Thông tin cá nhân</h3>
                        </div>
                        <div className="input-art">

                            {changePass ? 
                            <ChangePass/> 
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
                {/* TOAST MESSAGE */}
                <MessageToast 
                    toasts={toasts}
                    setToasts={setToasts}
                    handleCloseToast={handleCloseToast}/>
            <Footer/>
        </div>
    )
};

export default Profile;
                