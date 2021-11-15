import React from "react";
import styled from "styled-components"
import { Form, Button } from "react-bootstrap";
import Footer from "../Footer";
//import Navbar from "../Navbar";
import '../../App.css';
import logo from "../../images/img-login.png";


const Container = styled.div`
    width: 100vw;
    padding-top: 60px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    
`;
const Main = styled.div`
    margin-top: 60px;
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

return (
    <div>
      {/* <Logo src={logo}/> */}
      {/* <Navbar></Navbar> */}
      <Main className="container">
        
        <Title>Login</Title>
        <Description>If they have a positive experience, they'll want to tell their friends too.</Description>
        <Form action="#" style={{ minWidth: "40%", marginBottom: "90px" }}>
          <Form.Group className="mb-3 form-custom" controlId="formGridUsername">
            <Form.Label className="d-flex">Username</Form.Label>
            <Form.Control type="mail" placeholder="Username"  />
          </Form.Group>
          <Form.Group className="mb-3 form-custom" controlId="formGridPassword">
            <Form.Label className="d-flex">Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  />
          </Form.Group>
          {/* {error && <Error>Something went wrong!</Error>} */}
          <Submit>
            <Button variant="dark" size="lg" className="w-100 btn-custom" id="btnLogin"
            //   onClick={handleLogin}
            //   disabled={isFetching}
            >
              Login
            </Button>
          </Submit>
        </Form>
      </Main>
      <Footer></Footer>
    </div>
  )
}

export default Login
