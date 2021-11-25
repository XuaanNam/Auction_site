import React from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Col, Button} from 'react-bootstrap'
function AddAuction() {
    return (
        <div>
            <Header isActive={true}/>
            <div className="cont-admin" style={{width: '70vw'}}>
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm phiên đấu giá mới</h3> <br/>
                    <div className="box-admin" style={{marginLeft: '14vw'}}>
                        <Row className="img-detail"></Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Vị trí:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: Top banner" disabled style={{backgroundColor: '#FFF00'}}/>
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Kích thước:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 720x300" disabled style={{backgroundColor: '#FFF00'}}/>
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Giá khởi điểm:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 10000000" disabled style={{backgroundColor: '#FFF00'}}/>
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Bước giá:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 3000000" disabled style={{backgroundColor: '#FFF00'}}/>
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Website:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: vuighe.net" disabled style={{backgroundColor: '#FFF00'}}/>
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Ngày diễn ra:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 20/11/2021" />
                            </Col>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin" column lg={2}>
                            Mô tả:
                            </label>
                            <Col>
                            <Form.Control className="input-admin" type="text" />
                            </Col>
                        </Row>
                        <Button className="btn-admin" href="/home">Thêm</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddAuction
