import {Card,Row,Col,Button } from 'react-bootstrap';
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import '../assets/Home.css'
import React from 'react';
import '../../App.css'
//VIDEO - ANH
import background from '../images/background.jpg';
import panther from '../images/Image.png';
import anh from '../images/a.png';
import anh2 from '../images/testbanner.jpg'
//
import { useEffect} from "react";
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
// import Body from '../body';

function Home() {

  let navigate = useNavigate();
  let isAuth = 0;
  useEffect(()=>{
      axios.get("isAuth",)
        .then((Response) => {
          if(Response.data.isAuth){
            isAuth = 1;
          }
        })
        .catch(error => { console.log(error);})
        .then(function () {
          if(isAuth !== 1){
            navigate('/')
          }       
        });
  }, []);


  
  return (
    <div>
<Header isActive={true}/>
<background style={{ backgroundImage: `url(${background})` }}/>
    <Container>
    <Slogan>Slogan cho trang đấu giá
            <span className="panner">
                <Card.Img src={panther}></Card.Img>
            </span>
    </Slogan>
    <div src={anh} className="body-container pt-5 pl-5 pr-5 body-banner">
        {/* TABS */}
        <div className="tabs">
          <div className="tab-item active">
          <span className="auction-title">Đang diễn ra</span>
          </div>
          <div className="tab-item">
          <span className="auction-title">Sắp được đấu giá</span>
          </div>
          <div className="line"></div>
        </div>
        {/* Contents */}
        <div className="tab-content">
          <div className="tab-pane active">
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

          <div className="tab-pane">
          <Row className="justify-content-md-center pt-5 mg-items">
                <Col className="col-items" xs sm="5" mr-2 >
                    <Card className="card-items">
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh2} />
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
                        <Card.Img variant="top" className="src" src={anh2} />
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
            <Row className="justify-content-md-center pt-5 pb-20 ">
                <Col xs sm="5" mr-2 >
                    <Card>
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" className="src" src={anh2} />
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
                        <Card.Img variant="top" className="src" src={anh2} />
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

        </div>         
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






export default Home;

