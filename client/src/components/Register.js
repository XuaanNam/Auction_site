import React from "react";
import styled from "styled-components"
import Header from "./Header";
import { Form, Row, Col, Button } from "react-bootstrap"
import Footer from "./Footer";
import logo from "../images/img-login.png";
//dùng để kết nối tới db
import {useState, useEffect} from "react";
import axios from "../api/axios"; 
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100vw;
    padding-top: 30px;
   
`;
const Main = styled.div`
    min-height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.img`
    width: 100%;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
`;
const Title = styled.h2`
    margin-top: 1vh;
    margin-bottom: 1vh;
`;
const Submit = styled.div`
    // width: 100%;
    padding: 0px 0px 30px 0px;
`;
const Error = styled.span`
    display: inline-block;
    margin-bottom: 10px;
    padding-left: 20px;
    color: red;
`;

const Register = () => {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // const dispatch = useDispatch();
    // const { isFetching, error } = useSelector(state => state.user);

    // useEffect(() => {
    //     dispatch(refresh());
    // }, [dispatch]);

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     const btnSignUp = document.getElementById("btnSignUp");
    //     btnSignUp.disabled = isFetching;
    //     register(dispatch, { firstname, lastname, username, email, password });
    // }

    const [Ho, setHo] = useState("");
    const [Ten, setTen] = useState("");
    const [Email, setEmail] = useState("");
    const [TenDN, setTenDN] = useState("");
    const [MatKhau, setMatKhau] = useState("");

    let navigate = useNavigate();
    
    const handleRegister = (event) => {
        event.preventDefault();
        axios.post("register", {
            Ho, Ten, Email, TenDN, MatKhau
        })
            .then(() =>{
                navigate('/login');               
            })
            .catch(() => {
                alert("Đã có một lỗi bất thường xảy ra, đăng kí tài khoản thất bại!")
            }) 
    };

    return (
        
        <div>
            {/* <Logo src={logo}/> */}
        <Header></Header>   
        <Main className="container">
        
            <Title>Đăng ký</Title>
            <Form action="#" >
                <Row className="mb-3 form-custom">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label className="d-flex">Tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" onChange={(e)=>{setTen(e.target.value);}} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label className="d-flex">Họ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ" onChange={(e)=>{setHo(e.target.value);}} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 form-custom" controlId="formGridEmail">
                    <Form.Label className="d-flex">Địa chỉ email</Form.Label>
                    <Form.Control type="mail" placeholder="Nhập địa chỉ email" onChange={(e)=>{setEmail(e.target.value);}} />
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridUsername">
                    <Form.Label className="d-flex">Tên đăng nhập</Form.Label>
                    <Form.Control type="mail" placeholder="Tên đăng nhập" onChange={(e)=>{setTenDN(e.target.value);}} />
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridPassword">
                    <Form.Label className="d-flex">Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" onChange={(e)=>{setMatKhau(e.target.value);}} />
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridConfirmPassword">
                    <Form.Label className="d-flex">Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập lại mật khẩu" />
                </Form.Group>
                {/* {error && <Error>Something went wrong!</Error>} */}
                <Submit >
                    <Button variant="dark" size="lg" className="w-100 btn-custom" id="btnSignUp"
                        onClick={handleRegister}
                    >
                        Đăng ký
                    </Button>
                </Submit>
            </Form>
        </Main>
        <Footer></Footer>
    </div>
    )
}

export default Register;