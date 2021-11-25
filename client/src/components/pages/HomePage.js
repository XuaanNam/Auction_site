import '../../App.css'
import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "../../api/axios"; 
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/HomePage.css'
import { useNavigate } from 'react-router-dom';
import background from '../images/background.jpg';
import panther from '../images/Image.png';
import anh from '../images/a.png';

import {Card,Row,Col,Button } from 'react-bootstrap';



export default function HomePage() {

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
            if(Response.data.isAuth) {            
                navigate('/home');    
            }
        })
        .catch(error => console.error(error));
    }, []);

    
    return (
    <div>
    <Header/>
    <background style={{ backgroundImage: `url(${background})` }}/>
        <Container>
        <Slogan>Slogan cho trang đấu giá
            <span className="panner">
                <Card.Img src={panther}></Card.Img>
            </span>
        </Slogan>
        <div src={anh} className="body-container pt-5 pl-5 pr-5 body-banner">
            <p className="auction-title">Sắp được đấu giá</p>
            {/* DÒNG 1 */}
            <Row className="justify-content-md-center pt-5 mg-items">
                <Col className="col-items" xs sm="5" mr-2 >
                    <Card className="card-items">
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh} />
                        <Card.Body>
                            <Card.Title>Vị trí: <strong>Tên banner 1 </strong> 
                                <span className="ml-5">Thời gian:</span>
                            </Card.Title>                            
                            <div className="d-flex pt-1">
                                <span>Kích thước:</span>
                                <span className="ml-10">Bước giá:</span>
                            </div>
                        </Card.Body>
                      </a>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" mr-2 >
                    <Card>
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh} />
                        <Card.Body>
                            <Card.Title>Vị trí: <strong>Tên banner 2 </strong> 
                                <span className="ml-5">Thời gian:</span>
                            </Card.Title>                            
                            <div className="d-flex pt-1">
                                <span>Kích thước:</span>
                                <span className="ml-10">Bước giá:</span>
                            </div>
                        </Card.Body>
                      </a>
                    </Card>
                </Col>
            </Row>        
               {/* DÒNG 2  */}
            <Row className="justify-content-md-center pt-5 pb-20 ">
                <Col xs sm="5" mr-2 >
                    <Card>
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh} />
                        <Card.Body>
                            <Card.Title>Vị trí: <strong>Tên banner 3 </strong> 
                                <span className="ml-5">Thời gian:</span>
                            </Card.Title>                            
                            <div className="d-flex pt-1">
                                <span>Kích thước:</span>
                                <span className="ml-10">Bước giá:</span>
                            </div>
                        </Card.Body>
                      </a>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" mr-2>
                    <Card>
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh} />
                        <Card.Body>
                            <Card.Title>Vị trí: <strong>Tên banner 4 </strong> 
                                <span className="ml-5">Thời gian:</span>
                            </Card.Title>                            
                            <div className="d-flex pt-1">
                                <span>Kích thước:</span>
                                <span className="ml-10">Bước giá:</span>
                            </div>
                        </Card.Body>
                      </a>
                    </Card>
                </Col>
            </Row>         
        </div>
        </Container>
      <Footer/>
    </div>
    )
}

// CSS
const Container = styled.div`
  width: 100%;
  padding-top: 200px;
//   padding-bottom: 200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const Slogan = styled.div`
    position: relative;
    color: #fff;
    padding-bottom: 40vh;
    font-size: 2rem;    
    padding-left: 5rem;
    width: 100%;
    height: 50px;
    z-index: 1;
`;




