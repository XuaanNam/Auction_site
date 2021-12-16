import {Cancel,BorderHorizontal, GpsFixed,Language} from '@material-ui/icons';
import React, {  useState } from 'react'
import { Button, Modal} from 'react-bootstrap'
import styled from 'styled-components';
import CartD from '../../assets/CartDetail.module.css'
//
import axios from "../../../api/axios"; 

 

export default function Bill (props) {

    const [show, setShow] = useState(false);
 
    function handleClose() {
        return setShow(false);
    }

    function handleShow() {
        return setShow(true);
    }

    const handleDeleteBill = async() => {
        setShow(false);
        const idGD = props.list.idGD;
        try {
            await axios.delete('delete/my/cart', { data: {idGD} })
                    .then((res) => {
                        res.data.message && alert(res.data.message);
                    })
                    .catch(err => {console.log(err)})
                    .then(() => {
                        window.location.reload(false);
                    })
        } catch (error) {
            throw error
        }
    }

    return(
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
                    <b style={{color: 'red'}}>Bạn chắc chắn muốn Banner của website: <span style={{color: 'black'}}>{props.list.Website}</span> này chứ ? </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBill}>Xóa vội</Button>
                </Modal.Footer>
            </Modal>
            <Hr />
            <ContainerBody >
                <Product>
                    {/* Ảnh Banner */}
                    <ProductDetail>
                        <Image src={(props.list.HinhAnh)} />
                        <span></span> 
                    </ProductDetail>
                </Product>
                <ProductDetail>
                    <span className={CartD.detailBannerPosition}>
                        <GpsFixed className="mr-1"/>
                        Vị trí: <span className="text-danger">{props.list.ViTri}</span>
                    </span>

                    <span className={CartD.detailBannerSize}>
                        <BorderHorizontal className="mr-1"/>
                        Kích thước: <span className="text-danger">{props.list.KichThuoc}</span>
                    </span>

                    <span className={CartD.detailBannerPrice}>
                        💸 Giá: <span className="text-success">{props.list.GiaTien} VNĐ</span>
                    </span> <br/>

                    <span className={CartD.detailBannerWebsite}>
                    <Language className="mr-1"/>
                        Website URL: <span className="text-danger">
                            <a href={props.list.Website} target="_blank" rel="noreferrer">
                                {/* BIDING Ở ĐÂY */}
                                {props.list.Website}
                            </a>
                    </span>

                    </span><br/>
                    <span className={CartD.detailBannerInfo}>
                    ℹ️ Thông tin GD: <span className="text-center" style={{fontSize: "15px"}}>
                        <br/>
                        ✔️ {props.list.ThongTinGD}</span>
                    </span><br/>
                </ProductDetail>
                <ShopButton onClick={handleShow} className={`btn btn-dark btn-custom ${CartD.btnRemoveItem}`}>
                    <Cancel className=""/>
                 </ShopButton>
            </ContainerBody>
        </div>
    );
}

const ContainerBody = styled.div`
    position: relative;
    border: 2px solid #343a40;
    border-radius: 0.625rem;
    margin-left: -4.125rem;
    padding: 1,25rem;
    height: 42rem;
    margin-bottom: 3.125rem;
    margin-right: 1.25rem;
    box-shadow: 0 0 10px rgb(52, 58, 64);
    &:hover {
        box-shadow: 0 0 10px rgb(75, 178, 229);
    }
`;


const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 5px !important;
    
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    padding-top: 2.2rem;
`;
const Image = styled.img`
    
    width: 100%;
    //height: 17rem;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;
const Hr = styled.hr`
    background-color: #000;
    border: none;
    height: 1px;
    margin-right: 5rem !important;
    margin-bottom: 2rem !important;
`;
const ShopButton = styled.button`
`;