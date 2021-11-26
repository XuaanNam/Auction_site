import React from "react";
import { Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../../App.css";
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

  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("isAuth")
      .then((Response) => {
        if (Response.data.PQ) {
          if(Response.data.PQ===1){
            navigate("/admin/list");
          }
          else {
            navigate("/home");
          }
        }
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
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
          } else if (Response.data.message) {
            setLoginStatus(Response.data.message);
          }
        })
        .catch(() => {
          setLoginStatus("Đăng nhập thất bại");  
        })
        .then( () => {
            window.location.reload(false);
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                placeholder="Email"
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
