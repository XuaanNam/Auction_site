import React,{useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
import background from "../../images/background2.png";
function AddProduct() {
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
    const [loginStatus, setLoginStatus] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //         axios.post("storedProduct", {
                
    //         })
    //         .then((Response) =>{
    //             if(Response.data.message) {
    //                 setLoginStatus(Response.data.message );                       
    //             } else {
    //                 navigate('/login'); 
    //             }                   
    //         })
    //         .catch(() => {
    //             setLoginStatus("Đã có một lỗi bất thường xảy ra, vui lòng đăng kí lại!")
    //         })
    // }
    return (
        <div>
            <Header isAdmin={true}/>
            <img className="img-inout" src={background} alt=""></img>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm sản phẩm mới</h3> <br/>
                    <div className="box-admin">
                        <Row className="group-admin" >
                            <label className="label-admin">
                            Vị trí:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: Top banner" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Kích thước:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 720x300" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Giá khởi điểm:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: 10000000" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Website:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Vd: vuighe.net" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Mô tả:
                            </label>
                            <Form.Control className="input-admin" type="text" />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Banner:
                            </label>
                            <div className="btn-file"> 
                            <input
                                className="input-admin"
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                                }}
                            />
                            </div>
                        </Row>
                        {selectedImage && (
                            <div>
                                <img className="img-detail" alt="not found" src={URL.createObjectURL(selectedImage)} />
                            </div>
                        )}
                        <Button className="btn-admin" href="/home">Thêm</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddProduct
