import {Edit, DoneAll, AccountCircle, Contacts, VpnKey} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import { mobile } from '../../responsive';
//
import ProfileD from '../assets/Profile.module.css'
import avatar from '../images/img-login.png'
import background from "../images/background.jpg";
//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Container = styled.div`
    min-height: 130vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;
const Main = styled.div`
    flex: 1;
    min-height: 100%;
    margin-top: 60px;
    margin-right: 200px;
    ${mobile({
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    marginRight: "0"
})};
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
    padding: 12px 10px 0;
    text-align: center;
    font-size: 20px;
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
const MenuItem = styled.a`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 10px 10px 16px;
    vertical-align: middle;
    text-decoration: none;
    color: #343a40;
    font-size: 17px;
    font-weight: 500;
    border: 0.5px solid transparent;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    user-select: none;
    &:hover {
        color: #343a40;
        cursor: pointer;
        border-color: rgba(0, 0, 0, 0.2);
        opacity: 0.8;
        background-color: #333;
    }
    &:active {
        box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05) inset;
    }
    
    ${mobile({
    width: "30%",
    padding: "5px 10px",
    fontSize: "15px",
    borderTopRightRadius: "6px",
    borderTopLeftRadius: "6px",
    borderBottomRightRadius: "0",
    borderBottomLeftRadius: "0",
    justifyContent: "center"
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
    padding-bottom: 50px;
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
    margin-right: 90px;
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
const ProfileCard = styled.div`
    text-align: left;
    margin-bottom: 1.5rem;
    ${mobile({
    height: "fit-content",
    width: "33.3333%",
    margin: "0 30px",
    opacity: 0,
    transition: "opacity 0.5s ease"
})}
`;
const Hr = styled.div`
    margin: 0.75rem 0;
    color: inherit;
    border: 0.5px solid currentColor;
    opacity: .25;
`;

const CardHeader = styled.h4`
    padding: 10px 16px;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 0;
    background-color: #f8f9fa;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
`;
const CardBody = styled.div`
    padding: 8px 16px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-top: none;
`;
const UserInfo = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding: 6px 8px 6px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    &:last-child {
        border-bottom: none;
    }
    ${mobile({
    flexDirection: "column",
    flexWrap: "wrap"
})}
`;
const InfoName = styled.div`
    width: calc((100%/12)*5);
    padding: 4px 0;
    font-weight: 600;
    ${mobile({ width: "100%" })}
`;
const CardFooter = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;
const EditButton = styled.button`
    font-size: 18px;
    margin-right: 10px;
    text-transform: uppercase;
    width: 20%;
    ${mobile({ width: "100%" })}
`;
const InfoEdit = styled.input`
    width: calc((100%/12)*7);
    padding: 4px 10px;
    outline: none;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    &:focus {
        border-color: #343a40;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
    ${mobile({ width: "100%", paddingLeft: "8px" })}
`;


const ChangePass = () => {

    const [MkCu, setMatKhauCu] = useState("");
    const [MkMoi, setMatKhauMoi] = useState("");
    const [error, setError] = useState("");
    const userid = cookies.get('userid') ? cookies.get('userid'): null;
    const username = cookies.get('username') ? cookies.get('username'): null;

    let navigate = useNavigate();

    const handleChangePassword = (event) => {
        event.preventDefault();
        if(MkCu === MkMoi) {
            setError('Mật khẩu mới trùng với mật khẩu cũ!')
        }
        axios.patch("update/password", {
            MkCu, MkMoi, userid, username
        })
            .then((Response) =>{
                console.log(Response.data) ;

                if(Response.data.message) {    
                    setError(Response.data.message)        
                } else if(isAuth===false) {
                    navigate('/login');
                } else {
                    setError('Cập nhật mật khẩu thành công!')  
                }                   
            })
            .catch(() => {
                setError("Đã có một lỗi bất thường xảy ra, vui lòng thử lại sau ít phút!")
            }) 
    };

    let isAuth = 0;
    useEffect(()=>{
        axios.get("isAuth")
          .then((Response) => {
            if(Response.data.isAuth){
              isAuth = 1;
            }
          })
          .catch(error => { console.log(error);})
          .then(function () {
            if(isAuth !== 1){
              navigate('/login');
            }       
          });
    }, []);

    return (
        <div>
            <Header isActive={true}/>
            <background style={{ backgroundImage: `url(${background})` }} />
            <Container>
            <div className={`${ProfileD.bodyContainerProfile} pt-5 pl-5 pr-5 body-banner`}>
                {/* check to edit */}
                    <button>
                    <Edit class={`${ProfileD.clickToEdit}`}/>
                    </button>
                    <SideBar>
                        <HeaderBar>
                                    <Avatar src={avatar}></Avatar>
                                    <FullName>Họ và tên</FullName>
                                    <button className="btn btn-dark btn-custom basic mb-4 mt-2" >
                                        <AccountCircle className="mr-1"/>
                                        Đổi ảnh đại diện
                                    </button>
                                </HeaderBar>
                                <Hr />
                                <Menu>
                                    <MenuItems className="menu-items" >
                                        <MenuItem href="/profile" className="item active-menu btn btn-custom bg-white" id="0">
                                            <a style={{ textDecoration: "none", color: "#333", marginRight: "12px" }} >
                                                <Contacts className="mr-2"/>
                                                Thông tin cơ bản
                                                </a>
                                        </MenuItem>
                                        <MenuItem href="/#" className="item active-menu btn-dark btn btn-custom" id="0">
                                            <a style={{ textDecoration: "none", color: "#fff", marginRight: "12px" }} >
                                                <VpnKey className="mr-2 mb-2"/>
                                                Đổi mật khẩu
                                                </a>
                                        </MenuItem>
                                        
                                    </MenuItems>
                                </Menu>
                    </SideBar>
                        <ProfileBar>
                            <ProfileHeader>
                                <Title>Thông tin cá nhân</Title>
                                <SubTitle>Thông tin về cá nhân bạn là hoàn toàn được bảo mật!</SubTitle>
                            </ProfileHeader>
                            <ProfileBody>
                            <ProfileCard className="card-item mobile-active">
                                    <CardHeader>Thay đổi mật khẩu</CardHeader>
                                    <CardBody>
                                        <UserInfo>
                                            <InfoName>Mật khẩu cũ:</InfoName>
                                            <InputText type="password" onChange={(e)=>{setMatKhauCu(e.target.value);}} ></InputText>
                                        </UserInfo>
                                        <UserInfo>
                                            <InfoName>Mật khẩu mới:</InfoName>
                                            <InputText type="password" onChange={(e)=>{setMatKhauMoi(e.target.value);}} ></InputText>
                                        </UserInfo>
                                        <UserInfo>
                                            <InfoName>Xác nhận mật khẩu:</InfoName>
                                            <InputText type="password" onChange={(e)=>{setMatKhauMoi(e.target.value);}} ></InputText>
                                        </UserInfo>
                                    </CardBody>
                                    {error}
                                    <CardFooter>
                                        <EditButton className="btn btn-dark btn-custom basic" onClick={handleChangePassword} >
                                        <DoneAll className="mr-1"/>
                                            Chỉnh sửa</EditButton>
                                            {/*Xử lý*/} 
                                    </CardFooter>
                                </ProfileCard>
                            </ProfileBody>
                        </ProfileBar>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    )
};

const InputText = styled.input`
    width: calc((100%/12)*9);
    padding: 8px 0;
    word-wrap: break-word;
    background-color: rgb(238 206 214);
    border: 1px solid rgb(238 206 214);
    border-radius: 5px;
`;

export default ChangePass