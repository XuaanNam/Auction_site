import React, {useEffect} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Col, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
import background from "../../images/background2.png";

function AddAuction() {

    let navigate = useNavigate();
    let isAdmin = 0;
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
                if(Response.data.PQ === 1){
                    isAdmin = 1;
                }
            })
            .catch(error => { console.log(error);})
            .then(()=>{if(isAdmin !==1){navigate('/')}})
    }, []);

    return (
        <div>
            <Header isAdmin={true}/>
            <img className="img-inout" src={background} alt=""></img>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm phiên đấu giá mới</h3> <br/>
                    <div className="box-admin" >
                        <Row className="img-detail"></Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Vị trí:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: Top banner" disabled style={{backgroundColor: '#FFF00'}}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Kích thước:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 720x300" disabled style={{backgroundColor: '#FFF00'}}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Giá khởi điểm:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 10000000" disabled style={{backgroundColor: '#FFF00'}}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Website:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: vuighe.net" disabled style={{backgroundColor: '#FFF00'}}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Bước giá:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 3000000" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Ngày diễn ra:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 20/11/2021" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Mô tả:
                            </label>
                            <Form.Control className="input-admin" type="text" />
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
