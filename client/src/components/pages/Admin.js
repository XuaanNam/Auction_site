import React from 'react'
import '../../App.css'
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import {Form, Row, Col, Button} from 'react-bootstrap'
function Admin() {
    return (
        <div>
            <Header isActive={true}/>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm sản phẩm mới</h3> <br/>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Vị trí:
                        </label>
                        <Col>
                        <Form.Control className="input-admin" type="text" placeholder="Vd: Top banner" />
                        </Col>
                    </Row>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Kích thước:
                        </label>
                        <Col>
                        <Form.Control className="input-admin" type="text" placeholder="Vd: 720x300" />
                        </Col>
                    </Row>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Giá khởi điểm:
                        </label>
                        <Col>
                        <Form.Control className="input-admin" type="text" placeholder="Vd: 10000000" />
                        </Col>
                    </Row>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Bước giá:
                        </label>
                        <Col>
                        <Form.Control className="input-admin" type="text" placeholder="Vd: 3000000" />
                        </Col>
                    </Row>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Website:
                        </label>
                        <Col>
                        <Form.Control className="input-admin" type="text" placeholder="Vd: vuighe.net" />
                        </Col>
                    </Row>
                    <Row className="group-admin">
                        <label className="label-admin" column lg={2}>
                        Banner:
                        </label>
                        <input className="img-admin" type="file" />
                        {/* <Col>
                        <Form.Control className="input-admin" type="text"  style={{height: '15vh'}}/>
                        </Col> */}
                    </Row>
                    <Button className="btn-admin" href="/home">Thêm</Button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Admin
