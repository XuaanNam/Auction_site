import React,{useEffect} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Col, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
function AddProduct() {
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
                if(Response.data.PQ !== 1){
                    navigate('/')
                }
            })
            .catch(error => { console.log(error);});
    }, []);

    return (
        <div>
            <Header isAdmin={true}/>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm sản phẩm mới</h3> <br/>
                    <div className="box-admin">
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
            </div>
            <Footer/>
        </div>
    )
}

export default AddProduct
