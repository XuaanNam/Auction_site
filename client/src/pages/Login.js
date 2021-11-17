import React from "react";
import styled from "styled-components"
import { Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from '../components/Footer';
import '../App.css';
import logo from "../images/img-login.png";
//dùng để kết nối tới db
import {useState, useEffect} from "react";
import axios from "../api/axios"; 
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    width: 100vw;
    padding-top: 30px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    
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
    margin-top: 8px;
`;
const Description = styled.p`
    color: #6c757d;
`;
const Submit = styled.div`
    // width: 100%;
    padding: 40px 0px;
`;
const Error = styled.span`
  padding-left: 20px;
  color: red;
`;

const Login = () => {

  const [Email, setEmail] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
    
  const handleLogin = (event) => {
      event.preventDefault();
      axios.post("login", {
        Email, MatKhau
      })
        .then((Response) => {
          if(Response.data.message) {
            setLoginStatus(Response.data.message );                       
          } else {
            setLoginStatus(Response.data[0].Ten+" "+Response.data[0].Ho);
            navigate('/home'); 
            //console.log(Response.data[0].Ten+" "+Response.data[0].Ho );
          }
        })
        .catch(() => {
          setLoginStatus("Đăng nhập thất bại");
        }, []) 
  };
  useEffect(()=>{
    console.log("Effect is run");
    axios.get("islogin")
        .then((Response) => {
            console.log(Response);
  
        if(Response.data.loggedIn===true) {            
          setLoginStatus(Response.data.user[0].Ten+" "+Response.data.user[0].Ho);
          //navigate('/home');    
        }
      })
      .catch(error => console.error(error));
  }, [navigate]);

return (
    <div>
      {/* <Logo src={logo}/> */}
      {/* <Navbar></Navbar> */}
      <Header/>
      <Main className="container">
        <Title>Đăng nhập</Title>
        <Form action="#" style={{ minWidth: "40%", marginBottom: "90px" }}>
          <Form.Group className="mb-3 form-custom" controlId="formGridUsername">
            <Form.Label className="d-flex">Email</Form.Label>
            <Form.Control type="mail" placeholder="Email" onChange={(e)=>{setEmail(e.target.value);}} />
          </Form.Group>
          <Form.Group className="mb-3 form-custom" controlId="formGridPassword">
            <Form.Label className="d-flex">Mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Nhập mật khẩu" onChange={(e)=>{setMatKhau(e.target.value);}} />
          </Form.Group>

          <Error>{loginStatus}</Error>
          <Submit>
            <Button variant="dark" size="lg" className="w-100 btn-custom" id="btnLogin"
              onClick={handleLogin}
            //   disabled={isFetching}
            >
              Đăng nhập
            </Button>
          </Submit>
        </Form>
      </Main>
      <Footer></Footer>
    </div>
  )
}

export default Login
