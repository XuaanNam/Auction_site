import React, { Component} from 'react';
import anh2 from "../../images/testbanner.jpg";
import heart from "../../images/heart.png";
import { Card, Row, Col} from "react-bootstrap";
import styled from "styled-components";


class isComming extends Component {
    render() {
        return (
            <div>
            {/* TABS SẮP ĐƯỢC ĐẤU GIÁ*/}
            <div className="tabs">
                <div className="tab-item">
                    <span onClick={this.props.onSwitch} className="auction-title">Đang diễn ra</span>
                </div>
                <div className="tab-item active">
                    <span className="auction-title">Sắp được đấu giá</span>
                </div>
                <div className="line"></div>
            </div>

            {/* CONTENTS SẮP DIỄN RA*/}
            <div className="tab-pane active">
                <Row className="justify-content-md-center pt-5 mg-items">
                <Col className="col-items" xs sm="5" mr-2>
                    <Card className="card-items">
                    <a className="auction-link" href="/home">
                        <Card.Img variant="top" className="src" src={anh2} />
                        <Card.Body>
                        <Card.Title>
                            Vị trí: <strong>Tên banner 1 </strong>
                            <span className="ml-5">Thời gian:</span>
                        </Card.Title>
                        <div className="d-flex pt-1">
                            <span>Kích thước:</span>
                            <span className="ml-10">Bước giá:</span>
                        </div>
                        </Card.Body>
                    </a>
                    {/* CHUYỂN TAB TỚI MỤC QUAN TÂM */}
                    <a href="/interested">
                        <BtnInterest>
                        <img
                            className="logo-interest pl-2"
                            alt=""
                            src={heart}
                            rounded
                        />
                        </BtnInterest>
                    </a>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" mr-2>
                    <Card>
                    <a className="auction-link" href="/home">
                        <Card.Img variant="top" className="src" src={anh2} />
                        <Card.Body>
                        <Card.Title>
                            Vị trí: <strong>Tên banner 2 </strong>
                            <span className="ml-5">Thời gian:</span>
                        </Card.Title>
                        <div className="d-flex pt-1">
                            <span>Kích thước:</span>
                            <span className="ml-10">Bước giá:</span>
                        </div>
                        </Card.Body>
                    </a>
                    {/* CHUYỂN TAB TỚI MỤC QUAN TÂM */}
                    <a href="/interested">
                        <BtnInterest>
                        <img
                            alt=""
                            className="logo-interest pl-2"
                            src={heart}
                            rounded
                        />
                        </BtnInterest>
                    </a>
                    </Card>
                </Col>
                </Row>
                <Row className="justify-content-md-center pt-5 pb-20 ">
                <Col xs sm="5" mr-2>
                    <Card>
                    <a className="auction-link" href="/home">
                        <Card.Img variant="top" className="src" src={anh2} />
                        <Card.Body>
                        <Card.Title>
                            Vị trí: <strong>Tên banner 3 </strong>
                            <span className="ml-5">Thời gian:</span>
                        </Card.Title>
                        <div className="d-flex pt-1">
                            <span>Kích thước:</span>
                            <span className="ml-10">Bước giá:</span>
                        </div>
                        </Card.Body>
                    </a>
                    {/* CHUYỂN TAB TỚI MỤC QUAN TÂM */}
                    <a href="/interested">
                        <BtnInterest>
                        <img
                            alt=""
                            className="logo-interest pl-2"
                            src={heart}
                            rounded
                        />
                        </BtnInterest>
                    </a>
                    </Card>
                </Col>
                <Col xs sm="1"></Col>
                <Col xs sm="5" mr-2>
                    <Card>
                    <a className="auction-link" href="#">
                        <Card.Img variant="top" className="src" src={anh2} />
                        <Card.Body>
                        <Card.Title>
                            Vị trí: <strong>Tên banner 4 </strong>
                            <span className="ml-5">Thời gian:</span>
                        </Card.Title>
                        <div className="d-flex pt-1">
                            <span>Kích thước:</span>
                            <span className="ml-10">Bước giá:</span>
                        </div>
                        </Card.Body>
                    </a>
                    {/* CHUYỂN TAB TỚI MỤC QUAN TÂM */}
                    <a href="/interested">
                        <BtnInterest>
                        <img
                            alt=""
                            className="logo-interest pl-2"
                            src={heart}
                            rounded
                        />
                        </BtnInterest>
                    </a>
                    </Card>
                </Col>
                </Row>
            </div>
            </div>
        );
    }
}
// CSS


const BtnInterest = styled.button`
  position: absolute;
  background: #287673d4;
  padding-bottom: 5px;
  border-radius: 20px;
  top: -5%;
  z-index: 1;
  right: -5%;
`;

export default isComming;
