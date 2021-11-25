import React, { Component} from 'react';
import anh2 from "../../images/testbanner.jpg";
import heart from "../../images/heart.png";
import { Card, Row, Col} from "react-bootstrap";


class isComing extends Component {

    handleLiked = () => {
        
    }
    render() {
        return (
            <div className="tab-pane active">
                <Row className="justify-content-md-center pt-5 mg-items">
                    <Col className="col-items" xs sm="5" mr-2>
                        <Card className="card-items">
                            <a className="auction-link" href="/home">
                                <Card.Img variant="top" className="src" src={anh2} />
                            </a>
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
                        
                        {/* CHUYỂN TỚI MỤC QUAN TÂM */}
      
                            <button className="btn-interest">
                                <img
                                    className="logo-interest pl-2"
                                    alt=""
                                    src={heart}
                                    rounded
                                    onClick={this.handleLiked}
                                />
                            </button>
   
                        </Card>
                    </Col>               
                </Row>
            </div>
        );
    }
}

export default isComing;
