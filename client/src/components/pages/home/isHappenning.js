import React, { Component} from 'react';
import anh from "../../images/a.png";
import { Card, Row, Col} from "react-bootstrap";


class isHappening extends Component {
    

    render() {
        return(
            <div>
                {/* TABS ĐANG DIỄN RA*/}
                <div className="tabs">
                    <div className="tab-item  active">
                        <span className="auction-title">Đang diễn ra</span>
                    </div>
                    <div className="tab-item">
                        <span onClick={this.props.onSwitch} className="auction-title">Sắp được đấu giá</span>
                    </div>
                    <div className="line"> 
                    
                    </div>
                </div>


                {/* Contents ĐANG DIỄN RA */}
                
                <div className="tab-pane active">
                    {/* DÒNG 1 */}
                    <Row className="justify-content-md-center pt-5 mg-items">
                        <Col className="col-items" xs sm="5" mr-2>
                            <Card className="card-items">
                                <a className="auction-link" href="/auction/1">
                                    <Card.Img variant="top" className="src" src={anh} />
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
                                
                            </Card>
                        </Col>

                        {/* <Col xs sm="5" mr-2>
                            <Card>
                            <a className="auction-link" href="/auction">
                                <Card.Img variant="top" className="src" src={anh} />
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
                            </Card>
                        </Col> */}
                    </Row>

                </div>
            </div>
        );
    }
}

export default isHappening;