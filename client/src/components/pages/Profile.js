import {Edit, AccountCircle} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import { mobile } from '../../responsive';
import avatar from '../images/img-login.png'
import ProfileD from '../assets/Profile.module.css'
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
    
    const userid = cookies.get('userid') ? cookies.get('userid'): null;
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
    }
    const submitAvt = () => {
        const avt = document.getElementById('avt');

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
                <Container>
                    {/* sidebar */}
                    <div className={`${ProfileD.bodyContainerProfile} pt-5 pl-5 pr-5 body-banner`}>   
                    
                        {/* ICON */}
                        <button>
                        <Edit class={`${ProfileD.clickToEdit}`}/>
                        </button>
                        <SideBar>
                            <HeaderBar>
                                <Avatar src={avatar}></Avatar>
                                <FullName>{username}</FullName>
                                <form id='form-avt' style={{display: 'none'}} hiden action="/stored/avatar" method="post" enctype="multipart/form-data">
                                    <input type="file" name="avatar" id='avt'/>
                                </form>
                                    <button onClick={chooseAvt} className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                        <AccountCircle className="mr-1"/> 
                                        Đổi ảnh đại diện
                                    </button> 
                                    <span onClick={submitAvt} className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                        <AccountCircle className="mr-1"/> 
                                        Thay đổi ngay
                                    </span>
                            </HeaderBar>
                            <Hr />
                            <Menu>
                                <MenuItems className="menu-items" >
                                    {changePass ?
                                        <MenuInfo handleSwitchTab = {handleSwitchTab}/>
                                        :
                                        <MenuChangePass handleSwitchTab = {handleSwitchTab}/>
                                    }
                                </MenuItems>
                            </Menu>
                        </SideBar>
                        {/* profile */}
                        <ProfileBar>
                            <ProfileHeader>
                                <Title>Thông tin cá nhân</Title>
                                <SubTitle>Thông tin về cá nhân bạn là hoàn toàn được bảo mật!</SubTitle>
                            </ProfileHeader>
                            <ProfileBody>
                                {changePass ? <ChangePass/> : <Information/> }
                            </ProfileBody>
                        </ProfileBar>

                    </div>
                    
                </Container>
            <Footer/>
        </div>
    )
};
const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const SideBar = styled.div`
    position: absolute;
    border-right: 1px solid rgba(0, 0, 0, 0.91);
    border-radius: 5px;
    top: 0px;
    bottom: 0;
    left: 0;
    width: 20vw;
    background-color: #f8f9fa;
    padding: 30px 8px 0 0;
    flex: 1;
    flex-direction: column;
    ${mobile({
    position: "unset",
    top: "50px",
    width: "100%",
    padding: "10px 10px 0 10px"
})};
`;
const HeaderBar = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;
const Avatar = styled.img`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 3px solid rgb(53, 209, 217);
    ${mobile({
    width: "120px",
    height: "120px"
})}
`;
const FullName = styled.h4`
    padding: 20px 10px 0;
    text-align: center;
    font-size: 17px;
    font-weight: 601;
    ${mobile({
    fontSize: "18px"
})}
`;

const Menu = styled.div`
    ${mobile({
    overflowX: "scroll",
})}
`;
const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    ${mobile({
    flexDirection: "row",
    width: "120%",
    whiteSpace: "nowrap"
})}
`;

const ProfileBar = styled.div`
    width: calc(100% - 24vw);
    // margin-left: 24vw;
    padding: 60px 30px;
    outline: none;
    flex: 3;
    position: absolute;
top: 0;
bottom: 0;
right: 0;
    ${mobile({
    width: "100%",
    marginLeft: "0",
    padding: "20px 0"
})}
    @media only screen and (max-width: 414px) {
        transform: translateX(${props => props.tabIndex * -100}%);
    }
`;
const ProfileHeader = styled.div`
    padding-left: 100px;
    ${mobile({
    display: "none"
})}
`;
const Title = styled.h3`
    text-align: center;
    margin-right: 100px;
    font-weight: 400;
`;
const SubTitle = styled.p`
    text-align: center;
    margin-right: 80px;
`;

const ProfileBody = styled.div`
    text-align: center;
    ${mobile({
    height: "60vh",
    overflowY: "scroll",
    display: "flex",
    width: "300%"
})}
`;

const Hr = styled.div`
    margin: 0.75rem 0;
    color: inherit;
    border: 0.5px solid currentColor;
    opacity: .25;
`;



export default Profile;
                