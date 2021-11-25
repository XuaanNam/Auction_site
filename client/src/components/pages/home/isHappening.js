import React, { Component} from 'react';
import anh from "../../images/a.png";
import { Card, Row, Col} from "react-bootstrap";


class isHappening extends Component {
    

    render() {
        return(       
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
                </Row>
            </div>
        );
    }
}

export default isHappening;