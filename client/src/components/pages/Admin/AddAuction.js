import React, {useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Button, FormControl} from 'react-bootstrap'
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
    const [term, setTerm] = useState("");
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
        if(!position){setError('Vui l??ng th??m v??? tr?? banner!'); return}
        if(!bannerWidth){setError('Vui l??ng th??m chi???u r???ng banner!'); return}
        if(!bannerHeight){setError('Vui l??ng th??m chi???u cao banner!'); return}
        if(!price){setError('Vui l??ng th??m gi?? cho banner!'); return}
        if(!website){setError('Vui l??ng th??m ?????a ch??? website c???a banner!'); return}
        const bannerSize = bannerWidth + "x" + bannerHeight;
        axios.patch('admin/update/product',{
            ViTri: position, KichThuoc: bannerSize, Gia: price, Website: website, MoTa: describe, idSP: params.id 
        })
            .then((res) => {
                setError(res.data.message);
            })
            .catch(err => {console.log(err)})
    };

    const handleCreateAuction = () => {
        

        if(!position){setError('Vui l??ng th??m v??? tr?? banner!'); return}
        else if(!bannerWidth){setError('Vui l??ng th??m chi???u r???ng banner!'); return}
        else if(parseInt(bannerWidth)<=0){setError('Chi???u r???ng ph???i l???n h??n 0'); return}
        else if(!bannerHeight){setError('Vui l??ng th??m chi???u cao banner!'); return}
        else if(parseInt(bannerHeight)<=0){setError('Chi???u cao ph???i l???n h??n 0'); return}
        else if(!price){setError('Vui l??ng th??m gi?? cho banner!'); return}
        else if(parseInt(price)<=0){setError('Gi?? ti???n ph???i l???n h??n 0'); return}
        else if(!website){setError('Vui l??ng th??m ?????a ch??? website c???a banner!'); return}
        else if(!datetime){setError('Vui l??ng th??m th???i gian di???n ra ?????u gi??!'); return}
        else if(!limitTime){setError('H??y th??m th???i l?????ng ?????u gi??!'); return}
        else if(parseInt(limitTime)<=0){setError('Th???i l?????ng ?????u gi?? ph???i l???n h??n 0'); return}
        else if(!priceStep){setError('H??y th??m b?????c gi?? cho game ?????u gi??!'); return}
        else if(parseInt(priceStep)<=0){setError('B?????c gi?? ph???i l???n h??n 0'); return}
        else if(!term){setError('H??y th??m th???i h???n treo banner!'); return}
        else {
            axios.post('admin/stored/auction',{
                idSP: params.id, TgBatDau: datetime, TgDauGia: limitTime, BuocGia: priceStep, ThoiHan: term
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
                    <h3 className="title-admin">Th??m phi??n ?????u gi?? m???i</h3> <br/>
                    <div className="box-admin" >
                        <Row className="img-detail">
                            <img alt="H??nh banner" src={urlImage || banner}/>
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            V??? tr??:
                            </label>
                            <Form.Control className="input-admin" value={position} type="text"
                                onChange={(e) => {
                                    setPosition(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            K??ch th?????c:
                            </label>
                            <div className="d-flex input-admin">
                                <Form.Control 
                                    className="input-size" 
                                    type="number" 
                                    value={bannerWidth}
                                    onChange={(e) => {
                                        setBannerWidth(e.target.value);
                                    }} 
                                />
                                <Form.Control 
                                    className="input-size" 
                                    type="number" 
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
                            Gi?? kh???i ??i???m:
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
                            M?? t???:
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
                            B?????c gi??:
                            </label>
                            <Form.Control className="input-admin" type="number"
                                onChange={(e) => {
                                    setPriceStep(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Ng??y di???n ra:
                            </label>
                            <Form.Control className="input-admin" type="datetime-local"
                                onChange={(e) => {
                                    setDatetime(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Th???i gian:
                            </label>
                            <Form.Control className="input-admin" type="number" 
                                onChange={(e) => {
                                    setLimitTime(e.target.value);
                                }}
                            />
                        </Row>
                        <Row className="group-admin">
                            <label className="label-admin">
                            Th???i h???n (Th??ng):
                            </label>
                            <FormControl className="input-admin" type="number"
                                onChange={(e) => {
                                    setTerm(e.target.value);
                                }}
                            />
                        </Row>
                        <span style={{color: 'red', marginLeft: '11vw'}}>{error}</span><br/>
                        <div className="div-btn-admin">
                            <Button className="btn-admin" onClick={handleUpdate} style={{marginRight: '4.2vw'}}>S???a</Button>
                            <Button className="btn-admin" onClick={handleCreateAuction}>Th??m</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddAuction
