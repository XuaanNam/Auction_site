import React,{useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
import background from "../../images/background2.png";

function AddProduct() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [position, setPosition] = useState('');
    const [bannerWidth, setBannerWidth] = useState('');
    const [bannerHeight, setBannerHeight] = useState('');
    const [price, setPrice] = useState('');
    const [website, setWebsite] = useState('');
    const [describe, setDescribe] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();
    let isAdmin = 0;
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
                if(Response.data.PQ === 1){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAdmin = 1;
                }
            })
            .catch(error => { console.log(error);})
            .then(()=>{if(isAdmin !==1){navigate('/')}})
    }, []);

    const handleAddProduct = async() => {
        
        if(!selectedImage){setError('Vui lòng chọn hình ảnh minh họa!'); return}
        else if(!position){setError('Vui lòng thêm vị trí banner!'); return}
        else if(!bannerWidth){setError('Vui lòng thêm chiều rộng banner!'); return}
        else if(!bannerHeight){setError('Vui lòng thêm chiều cao banner!'); return}
        else if(!price){setError('Vui lòng thêm giá cho banner!'); return}
        else if(!website){setError('Vui lòng thêm địa chỉ website của banner!'); return}
        else {
            const bannerSize = bannerWidth + "x" + bannerHeight;
            const image = new FormData();
            image.append("banner", selectedImage);
            image.append("ViTri", position);
            image.append("KichThuoc", bannerSize);
            image.append("Gia", price);
            image.append("Website", website);
            image.append("MoTa", describe);
            try {
                await axios.post('admin/stored/product', image)
                        .then((res) => {
                            setError(res.data.message);
                        })
                        .catch(err => {console.log(err)})
                        .then(() => {
                            window.location.reload(false);
                        })
            } catch (error) {
                throw error
            }
        }
    }

    return (
        <div>
            <Header isAdmin={true}/>
            <img className="img-inout" src={background} alt=""></img>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm sản phẩm mới</h3> <br/>
                    <div className="box-admin">
                        <Row className="group-admin" >
                            <label className="label-admin" >Vị trí:</label>
                            <Form.Control className="input-admin" type="text" placeholder="Nhập tên vị trí"
                                onChange={(e) => {
                                    setPosition(e.target.value);
                                }} 
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Kích thước:
                            </label>
                            <div className="d-flex input-admin">
                                <Form.Control 
                                    className="input-size" 
                                    type="text" 
                                    placeholder="Nhập chiều rộng"
                                    onChange={(e) => {
                                        setBannerWidth(e.target.value);
                                    }} 
                                />
                                <Form.Control 
                                    className="input-size" 
                                    type="text" 
                                    placeholder="Nhập chiều cao"
                                    style={{marginLeft: '3.5vw'}}
                                    onChange={(e) => {
                                        setBannerHeight(e.target.value);
                                    }} 
                                />
                            </div>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Giá khởi điểm:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Nhập giá khởi điểm"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }} 
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Website:
                            </label>
                            <Form.Control className="input-admin" type="text" placeholder="Nhập tên website"
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                }} 
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Mô tả:
                            </label>
                            <Form.Control className="input-admin" as="textarea" rows={3}
                                onChange={(e) => {
                                    setDescribe(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                                Banner:
                            </label>
                            <div className="btn-file"> 
                                <input
                                    className="img-admin"
                                    type="file"
                                    name="image"
                                    onChange={(event) => {
                                        setSelectedImage(event.target.files[0]);
                                    }}
                                />
                            </div>
                        </Row>
                        {selectedImage && (
                            <div className="img-detail">
                                <img  alt="not found" src={URL.createObjectURL(selectedImage)} />
                            </div>
                        )}
                        <span style={{color: 'red', marginLeft: '11vw'}}>{error}</span><br/>
                        <div className="div-btn-admin"> 
                            <Button className="btn-admin" onClick={handleAddProduct}>Thêm</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddProduct
