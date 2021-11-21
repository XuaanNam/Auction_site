import {DoneAll} from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../../../responsive';
//
import ProfileD from '../../assets/Profile.module.css';
//
import axios from "../../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();



const Infomation = () => {

    const [error, setError] = useState("");
    const userid = cookies.get('userid') ? cookies.get('userid'): null;
    const username = cookies.get('username') ? cookies.get('username'): null;

    let navigate = useNavigate();
    let isAuth = 0;

    const handleEdit = () => {

    }
    return (
        <div>
            <ProfileBody>
                <ProfileCard className="card-item fade-card mobile-active">
                <CardHeader>Thông tin cơ bản</CardHeader>
                <CardBody>
                    <UserInfo>
                        <InfoName className="basic">Tên người dùng:</InfoName>
                        <InputText className="basic" ></InputText>
                        {/* <InfoName className="edit-basic display-none">First Name</InfoName> */}
                        {/* Xử lý */}
                        {/* <InfoName className="edit-basic display-none">Last Name</InfoName> */}
                        {/* Xử lý */}
                    </UserInfo>
                    <UserInfo>
                        <InfoName>Họ & tên</InfoName>
                        <InputTextDouble className="basic"/>
                        <InputTextDouble className={`basic ${ProfileD.marginforDouble}`}/>
                        {/* Xử lý */}
                    </UserInfo>
                    <UserInfo>
                        <InfoName>Ngày sinh:</InfoName>
                        <InputText className="basic"/>
                        {/* Xử lý */}
                    </UserInfo>
                    <UserInfo>
                        <InfoName>Giới tính:</InfoName>
                        <InputText className="basic"/>
                        {/* Xử lý */}
                    </UserInfo>
                </CardBody>
                </ProfileCard>
            </ProfileBody>
            <ProfileBody className="pt-3">
                    <ProfileCard>
                    <CardHeader>Thông tin liên lạc</CardHeader>
                    <CardBody>
                        <UserInfo>
                            <InfoName>Email:</InfoName>
                            <InputText className="contact"/>
                            {/* xử lý*/}
                        </UserInfo>
                        <UserInfo>
                            <InfoName>Phone:</InfoName>
                            <InputText className="contact"></InputText>
                            {/* xỬ LÝ */}
                        </UserInfo>
                    </CardBody>
                    <CardFooter>
                    
                    </CardFooter>
                    <CardFooter>
                        <EditButton
                            onClick={handleEdit}
                            className="btn btn-dark btn-custom basic"      
                        >
                            <DoneAll className="mr-1"/>
                            Chỉnh sửa
                            </EditButton>
                        {/* xử lý */}
                    </CardFooter>  
                </ProfileCard>
            </ProfileBody>
        </div>
    )
};

const InputTextDouble = styled.input`
    width: calc((100%/12)*4);
    padding: 8px 0;
    word-wrap: break-word;
    background-color: rgb(238 206 214);
    border: 1px solid rgb(238 206 214);
    border-radius: 5px;
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

const InputText = styled.input`
    width: calc((100%/12)*9);
    padding: 8px 0;
    word-wrap: break-word;
    background-color: rgb(238 206 214);
    border: 1px solid rgb(238 206 214);
    border-radius: 5px;
`;

export default Infomation;