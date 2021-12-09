import React, {useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import banner from '../../images/banner-panther-site.png'
import { useNavigate, useParams} from "react-router-dom";
import background from "../../images/background2.png";


function AddAuction() {
    let params = useParams();
    

    const [urlImage, setUrlImage] = useState("");
    const [position, setPosition] = useState("");
    const [bannerWidth, setBannerWidth] = useState('');
    const [bannerHeight, setBannerHeight] = useState('');
    const [price, setPrice] = useState("");
    const [website, setWebsite] = useState("");
    const [datetime, setDatetime] = useState("");
    const [limitTime, setLimitTime] = useState("");
    const [priceStep, setPriceStep] = useState("");
    const [describe, setDescribe] = useState('');
    const [error, setError] = useState('');
    
    let navigate = useNavigate();
    let isAdmin = 0;
    let done = 0;
    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
                if(Response.data.PQ === 1){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAdmin = 1;
                    axios.get("admin/get/product",  { params: { idSP: params.id } })
                        .then((res) => {
                            setUrlImage(('../../'+ res.data[0].HinhAnh)); 
                            setPosition(res.data[0].ViTri);
                            transferSize(res.data[0].KichThuoc);
                            setPrice(res.data[0].Gia);
                            setWebsite(res.data[0].Website);
                            setDescribe(res.data[0].MoTa)
                        })
                }
            })
            .catch(error => { console.log(error);})
            .then(()=>{
                if(isAdmin !==1){
                    navigate('/')
                }
            })
    }, []);
    const transferSize= (size) => {
        setBannerWidth((size.split('x')[0]))
        setBannerHeight((size.split('x')[1]))
    }
    const handleUpdate = () => {
        if(!position){setError('Vui lòng thêm vị trí banner!'); return}
        if(!bannerWidth){setError('Vui lòng thêm chiều rộng banner!'); return}
        if(!bannerHeight){setError('Vui lòng thêm chiều cao banner!'); return}
        if(!price){setError('Vui lòng thêm giá cho banner!'); return}
        if(!website){setError('Vui lòng thêm địa chỉ website của banner!'); return}
        const bannerSize = bannerWidth + "x" + bannerHeight;
        axios.patch('admin/update/product',{
            ViTri: position, KichThuoc: bannerSize, Gia: price, Website: website, MoTa: describe, idSP: params.id 
        })
            .then((res) => {
                setError(res.data.message);
            })
            .catch(err => {console.log(err)})
    };

    const compareDate = (datetime) => {
        if(parseInt(datetime.split('T')[0].split('-')[0]) < parseInt(new Date(Date.now()).getFullYear())) return false; 
        if(parseInt(datetime.split('T')[0].split('-')[1]) < parseInt((new Date(Date.now()).getMonth() + 1))) return false; 
        if(parseInt(datetime.split('T')[0].split('-')[2]) < parseInt(new Date(Date.now()).getDate())) return false; 
        if(parseInt(datetime.split('T')[1].split(':')[0]) < parseInt(new Date(Date.now()).getHours())) return false; 
        if(parseInt(datetime.split('T')[1].split(':')[1]) < parseInt(new Date(Date.now()).getMinutes())) return false; 
        return true; 
    }

    const handleCreateAuction = () => {
        

        if(!position){setError('Vui lòng thêm vị trí banner!'); return}
        else if(!bannerWidth){setError('Vui lòng thêm chiều rộng banner!'); return}
        else if(!bannerHeight){setError('Vui lòng thêm chiều cao banner!'); return}
        else if(!price){setError('Vui lòng thêm giá cho banner!'); return}
        else if(!website){setError('Vui lòng thêm địa chỉ website của banner!'); return}
        else if(!datetime){setError('Vui lòng thêm thời gian diễn ra đấu giá!'); return}
        else if(!compareDate(datetime)){setError('Thời gian đấu giá đang nhỏ hơn thời gian hiện tại!'); return}
        else if(!limitTime){setError('Hãy thêm thời lượng đấu giá!'); return}
        else if(!priceStep){setError('Hãy thêm bước giá cho game đấu giá!'); return}
        else {
            axios.post('admin/stored/auction',{
                idSP: params.id, TgBatDau: datetime, TgDauGia: limitTime, BuocGia: priceStep
            })
                .then((res) => {
                    setError(res.data.message);
                    done = res.data.done ? 1 : 0; 
                })
                .catch(err => {console.log(err)})
                .then(() => {
                    if (done === 1)  navigate('/admin/list');
                })
        }
    }

    return (
        <div>
            <Header isAdmin={true}/>
            <img className="img-inout" src={background} alt=""/>
            <div className="cont-admin">
                <div className="subcont-admin">
                    <h3 className="title-admin">Thêm phiên đấu giá mới</h3> <br/>
                    <div className="box-admin" >
                        <Row className="img-detail">
                            <img alt="Hình banner" src={urlImage || banner}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Vị trí:
                            </label>
                            <Form.Control className="input-admin" value={position} type="text"
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
                                    value={bannerWidth}
                                    onChange={(e) => {
                                        setBannerWidth(e.target.value);
                                    }} 
                                />
                                <Form.Control 
                                    className="input-size" 
                                    type="text" 
                                    value={bannerHeight}
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
                            <Form.Control className="input-admin" value={price} type="number"
                                onChange={(e) => {setPrice(e.target.value);}}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Website:
                            </label>
                            <Form.Control className="input-admin" value={website} type="url" 
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
                                value={describe}
                                onChange={(e) => {
                                    setDescribe(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Bước giá:
                            </label>
                            <Form.Control className="input-admin" type="number"
                                onChange={(e) => {
                                    setPriceStep(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Ngày diễn ra:
                            </label>
                            <Form.Control className="input-admin" type="datetime-local"
                                onChange={(e) => {
                                    setDatetime(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Thời gian đấu giá:
                            </label>
                            <Form.Control className="input-admin" type="number" 
                                onChange={(e) => {
                                    setLimitTime(e.target.value);
                                }}
                            />
                        </Row>
                        <span style={{color: 'red', marginLeft: '11vw'}}>{error}</span><br/>
                        <div className="div-btn-admin">
                            <Button className="btn-admin" onClick={handleUpdate} style={{marginRight: '4.2vw'}}>Sửa</Button>
                            <Button className="btn-admin" onClick={handleCreateAuction}>Thêm</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddAuction
