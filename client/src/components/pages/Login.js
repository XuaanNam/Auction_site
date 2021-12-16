import React from "react";
import { Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/login-regis.css";
import background from "../images/background.jpg";
//dùng để kết nối tới db
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const [Email, setEmail] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [validated, setValidated] = useState(false);

  let isAuth = 0;
  let isCorr = 0;
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("isAuth")
      .then((Response) => {  
        if(Response.data.PQ===1){
          // eslint-disable-next-line react-hooks/exhaustive-deps
          isAuth = 2;
        }
        else if(Response.data.PQ===0){
          isAuth = 1;
        }
      })
      .catch((error) => console.error(error))
      .then(()=>{
        if(isAuth === 2){
          navigate("/admin/list");
        }
        else if(isAuth === 1){
          navigate("/home");
        } 
      })
  }, [navigate]);

  
  const handleLogin = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      axios.post("login", {
          Email,
          MatKhau,
      })
        .then((Response) => {
          if (Response.data.isAuth) {
            cookies.set("userAuth", Response.headers.isauth, {
              path: "/",
              maxAge: 1000 * 60 * 60 * 72,
              //httpOnly: ,
            });
            cookies.set("username", Response.data.TenDN, {
              path: "/",
              maxAge: 1000 * 60 * 60 * 72,
              //httpOnly: ,
            });
            isCorr = 1;
          } else if (Response.data.message) {
            setLoginStatus(Response.data.message);
            isCorr = 0;
          }
        })
        .catch(() => {
          setLoginStatus("Đăng nhập thất bại");  
        })
        .then( () => {  
            if(isCorr === 1) {
              window.location.reload(false);
            }
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <Header isGuest={true}/>
      <img className="img-inout" src={background} alt=""></img>
      <div className="container cont-inout" id="form-reg">
        <div className="subcont-inout">
          <h2 className="title-inout">Đăng nhập</h2>
          <Form className="form-inout" noValidate validated={validated} onSubmit={handleLogin}>
            <Form.Group
              className="input-inout mb-3 pt-3 form-custom"
              controlId="formGridEmail"
            >
              <Form.Label className="" id="t-email">
                Email
              </Form.Label>
              <Form.Control
                required
                className="box-inout"
                type="email"
                placeholder="Nhập email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Vui lòng nhập email{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="input-inout mb-3 form-custom"
              controlId="formGridPassword"
            >
              <Form.Label className="d-flex" id="t-pass">
                Mật khẩu
              </Form.Label>
              <Form.Control
                required
                className="box-inout"
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                  setMatKhau(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Vui lòng nhập mật khẩu{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <span className="status-inout">{loginStatus}</span>
            <div>
              <Button
                className="button-inout"
                variant="dark"
                size="lg"
                style={{ width: "13vw", height: "7vh" }}
                id="btnLogin"
                type="submit"
              >
                Đăng nhập
              </Button>
              <div className="mess-inout pb-4">
                Bạn chưa có tài khoản?
                <Link to="/register" className="link-inout ml-2">
                  Đăng ký
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
