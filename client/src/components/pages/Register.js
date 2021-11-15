import React from "react";
import styled from "styled-components"
//import Navbar from "../Navbar";
import { Form, Row, Col, Button } from "react-bootstrap"
import Footer from "../Footer";
import logo from "../../images/img-login.png";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100vw;
    padding-top: 60px;
   
`;

const Main = styled.div`
    flex: 1;
    margin-top: 60px;
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
        {/* <Header></Header> */}   
        <Main className="container">
        
            <Title>Sign up</Title>
            <Description>If they have a positive experience, they'll want to tell their friends too.</Description>
            <Form action="#" >
                <Row className="mb-3 form-custom">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label className="d-flex">First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label className="d-flex">Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name"/>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 form-custom" controlId="formGridEmail">
                    <Form.Label className="d-flex">Email</Form.Label>
                    <Form.Control type="mail" placeholder="Enter your email"/>
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridUsername">
                    <Form.Label className="d-flex">Username</Form.Label>
                    <Form.Control type="mail" placeholder="Username"/>
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridPassword">
                    <Form.Label className="d-flex">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3 form-custom" controlId="formGridConfirmPassword">
                    <Form.Label className="d-flex">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Form.Group className="d-flex mb-3 form-custom" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Subscribe for participate in the auction!" />
                </Form.Group>
                {/* {error && <Error>Something went wrong!</Error>} */}
                <Submit >
                    <Button variant="dark" size="lg" className="w-100 btn-custom" id="btnSignUp"
                        // onClick={handleRegister}
                    >
                        Sign Up
                    </Button>
                </Submit>
            </Form>
        </Main>
        <Footer></Footer>
    </div>
    )
}

export default Register