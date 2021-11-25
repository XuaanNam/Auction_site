import { Form, Row, Col, Button } from "react-bootstrap"
import React from "react";
import styled from "styled-components"
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from 'react-router-dom';
import logo from "../images/img-login.png";
import background from "../images/background.jpg"
//dùng để kết nối tới db
import {useState, useEffect} from "react";
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';


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
    const [loginStatus, setLoginStatus] = useState("");

    let navigate = useNavigate();
    
    const handleRegister = (event) => {
        event.preventDefault();
        axios.post("register", {
            Ho, Ten, Email, TenDN, MatKhau
        })
            .then((Response) =>{
                if(Response.data.message) {
                    setLoginStatus(Response.data.message );                       
                } else {
                    navigate('/login'); 
                }                   
            })
            .catch(() => {
                setLoginStatus("Đã có một lỗi bất thường xảy ra, vui lòng đăng kí lại!")
            }) 
    };
    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
                console.log('response:', Response)
            if(Response.data.isAuth) {            
                navigate('/home');    
            }
        })
        .catch(error => console.error(error));
    }, [navigate]);
    
    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
    return (
        
        <div>
            {/* <Logo src={logo}/> */}
            <Header/>   
            <img  className="img-inout" src={background}></img>
            <div className="container cont-inout">
                <div className="subcont-inout">
                <h2 className="title-inout">Đăng ký</h2>
                    {/* name */}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="input-inout d-flex mb-3 pt-3 form-custom" controlId="formGridUsername">
                        <div>
                            <Form.Label className="">Họ</Form.Label>
                            <Form.Control
                                required
                                className="box-inout"
                                type="text"
                                placeholder="Nhập họ"
                                onChange={(e) => {
                                setHo(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid"> Vui lòng nhập họ </Form.Control.Feedback>
                        </div>
                        <div className="minibox-inout">
                            <Form.Label className="">Tên</Form.Label>
                            <Form.Control
                                required
                                className="box-inout"
                                type="text"
                                placeholder="Nhập tên"
                                onChange={(e) => {
                                setTen(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid"> Vui lòng nhập tên </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    {/* email */}
                    <Form.Group className="input-inout mb-3 form-custom" controlId="formGridEmail">
                        <Form.Label className="">Email</Form.Label>
                        <Form.Control
                            required
                            className="box-inout"
                            type="mail"
                            placeholder="Nhập Email"
                            onChange={(e) => {
                            setEmail(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid"> Vui lòng nhập email </Form.Control.Feedback>
                    </Form.Group>
                    {/* tài khoản */}
                    <Form.Group className="input-inout mb-3 form-custom" controlId="formGridUsername">
                        <Form.Label className="">Tài khoản</Form.Label>
                        <Form.Control
                            required
                            className="box-inout"
                            type="text"
                            placeholder="Nhập tài khoản"
                            onChange={(e) => {
                            setTenDN(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid"> Vui lòng nhập tài khoản </Form.Control.Feedback>
                    </Form.Group>
                    {/* mật khẩu */}
                    <Form.Group className="input-inout mb-3 form-custom" controlId="formGridPassword">
                        <Form.Label className="d-flex">Mật khẩu</Form.Label>
                        <Form.Control
                        required
                        className="box-inout"          
                        type="password"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => {
                            setMatKhau(e.target.value);
                        }}
                        />
                        <Form.Control.Feedback type="invalid"> Vui lòng nhập mật khẩu </Form.Control.Feedback>
                    </Form.Group>
                    {/* Xác nhận mật khẩu */}
                    <Form.Group className="input-inout mb-3 form-custom" controlId="formGridPassword">
                        <Form.Label className="">Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            required
                            className="box-inout"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <Form.Control.Feedback type="invalid"> Vui lòng xác nhận mật khẩu </Form.Control.Feedback>
                    </Form.Group>
                    {/* checkbox */}
                    <Form.Group className="input-inout d-flex mb-3 form-custom" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Tôi đồng ý với các điều khoản và đăng ký!" required />
                    </Form.Group>

                    <span className="status-inout">{loginStatus}</span>
                    <div className=" pb-4">
                        <Button
                        type="summit"
                        className="button-inout"
                        variant="dark"
                        size="lg"
                        style={{width: '13vw', height: '7vh'}}
                        id="btnLogin"
                        // onClick={handleRegister}
                        >
                        Đăng ký
                        </Button>
                    </div>
                </Form>
                </div>
            </div>
        <Footer></Footer>
    </div>
    )
}

const ButtonRegister = styled.div`
    // width: 100%;
    padding: 10px 0px 30px 0px;
`;


export default Register;

