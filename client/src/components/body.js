import React from 'react';
import {Card,Row,Col,Button } from 'react-bootstrap';
import '../App.css';

function Body() {
    return (
        <div className="body-container pt-5 pl-5 pr-5">
            <p className="Auction-title">Các cuộc đấu giá</p>
            <Row className="justify-content-md-center m-4">
                <Col xs sm="5" mr-2 style={{ backgroundColor: 'red' }}>
                    <Card>
                        <Card.Img variant="top" src='/imp.jpg' />
                        <Card.Body>
                            <Card.Title>Banner1</Card.Title>
                            <div>
                            <span> Description</span>
                            </div>
                            <div className="d-flex pt-1">
                                <b>Time</b>
                                <b className="ml-5">Price</b>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" pl-2 style={{ backgroundColor: 'blue' }}>
                    Banner 2
                </Col>
            </Row>
            
        </div>
    )
}
export default Body;