import React from 'react';
import '../../App.css'
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import {Card,Row,Col,Button } from 'react-bootstrap';

// import Body from '../body';

function Home() {
  return (
    <div>
      <Header/>
        <div className="body-container pt-5 pl-5 pr-5">
            <p className="auction-title">Các cuộc đấu giá</p>
            <Row className="justify-content-md-center m-4">
                <Col xs sm="5" mr-2 style={{ backgroundColor: 'red' }}>
                    <Card>
                      <a className="auction-link" href="/auction">
                        <Card.Img variant="top" src='/imp.jpg' />
                        <Card.Body>
                            <Card.Title>Tên banner1</Card.Title>
                            <div>
                            <span> Mô tả</span>
                            </div>
                            <div className="d-flex pt-1">
                                <b>Thời gian</b>
                                <b className="ml-5">Giá</b>
                            </div>
                        </Card.Body>
                      </a>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" pl-2 style={{ backgroundColor: 'blue' }}>
                    Banner 2
                </Col>
            </Row>            
        </div>
      <Footer/>
    </div>
  );
}

export default Home;
