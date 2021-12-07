import React, {useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Row, Col, Button, Modal} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
import background from "../../images/background2.png";

function List() {
 
    let navigate = useNavigate();
    let isAdmin = 0;
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
                if(Response.data.PQ === 1){
                    isAdmin = 1;
                }
            })
            .catch(error => { console.log(error);}).then(()=>{if(isAdmin !==1){navigate('/')}})
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Xóa banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa banner này chứ ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary">Xóa vội</Button>
                </Modal.Footer>
            </Modal>

            <Header isAdmin={true}/>
            <img className="img-inout" src={background} alt=""></img>
            <div className="cont-admin" style={{width: '75vw'}}>
                <div className="subcont-admin">
                    <h3 className="title-list">Danh sách sản phẩm</h3> <br/>
                        <div className="d-flex pt-2">
                            <Row className="group-list">
                                <div className="img-list"></div>
                            </Row>
                            <Row className="group-list" >
                                <Col>
                                    <div className="pt-2">
                                        <label className="label-admin" >Vị trí:</label>
                                        <span>Top banner</span>
                                    </div>
                                    
                                    <div className="pt-3">
                                        <label className="label-admin" >Website:</label>
                                        <span>vuighe.net</span>
                                    </div>

                                    <div className="d-flex">
                                        <div>
                                        <Button className="mt-3 btn-list" href="/admin/addauction">Chi tiết</Button>
                                        </div>
                                        <div className="pl-5">
                                        <Button className="mt-3 btn-list" onClick={handleShow}>Xóa</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    <hr width="80%" align="center" color='gray'></hr>

                    <div className="d-flex pt-2">
                        <Row className="group-list">
                            <div className="img-list"></div>
                        </Row>
                        <Row className="group-list" >
                            <Col>
                                <div className="pt-2">
                                    <label className="label-admin">Vị trí:</label>
                                    <span>Right banner</span>
                                </div>
                                
                                <div className="pt-3">
                                    <label className="label-admin">Website:</label>
                                    <span>fulltruyen.vn</span>
                                </div>
                                <div className="d-flex">
                                    <div>
                                    <Button className="mt-3 btn-list" href="/admin/addauction">Chi tiết</Button>
                                    </div>
                                    <div className="pl-5">
                                    <Button className="mt-3 btn-list">Xóa</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <hr width="80%" align="center" color='gray'></hr>
                </div>
            </div>

            
            <Footer/>
        </div>
    )
}

export default List
