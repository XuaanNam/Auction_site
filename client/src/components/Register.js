import React from "react";
import styled from "styled-components"
import Header from "./Header";
import { Form, Row, Col, Button } from "react-bootstrap"
import Footer from "./Footer";
import logo from "../images/img-login.png";

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

    return (
        
        <div>
            {/* <Logo src={logo}/> */}
        <Header></Header>   
        <Main className="container">
        
            <Title>Đăng ký</Title>
            <Form action="#" >
                <Row className="mb-3 form-custom">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label className="d-flex">Họ</Form.Label>
                        <Form.Control type="text" placeholder="Họ" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label className="d-flex">Tên</Form.Label>
                        <Form.Control type="text" placeholder="Tên"/>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 form-custom" controlId="formGridEmail">
                    <Form.Label className="d-flex">Email</Form.Label>
                    <Form.Control type="mail" placeholder="Nhập email"/>
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridUsername">
                    <Form.Label className="d-flex">Tên người dùng</Form.Label>
                    <Form.Control type="mail" placeholder="Nhập tên người dùng"/>
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridPassword">
                    <Form.Label className="d-flex">Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" />
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridConfirmPassword">
                    <Form.Label className="d-flex">Xác nhận mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Xác nhận mật khẩu" />
                </Form.Group>
                {/* {error && <Error>Something went wrong!</Error>} */}
                <Submit >
                    <Button variant="dark" size="lg" className="w-100 btn-custom" id="btnSignUp"
                        // onClick={handleRegister}
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

export default Register