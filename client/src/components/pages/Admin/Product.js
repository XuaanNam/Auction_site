import React, { useState} from 'react'
import { Row, Col, Button, Modal} from 'react-bootstrap'
import banner from '../../images/banner-panther-site.png'
import axios from "../../../api/axios";

export default function Product(props) {

    const [show, setShow] = useState(false);
    const [HinhAnh] = useState(('../' + props.product.HinhAnh));
 
    function handleClose() {
        return setShow(false);
    }

    function handleShow() {
        return setShow(true);
    }

    const handleDelete = async() => {
        setShow(false);
        const idSP = props.product.idSP;
        try {
            await axios.delete('admin/delete/product', { data: {idSP} })
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
                    <b style={{color: 'red'}}>Bạn chắc chắn muốn xóa banner này chứ ? </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Đóng</Button>
                    <Button variant="danger" onClick={handleDelete}>Xóa vội</Button>
                </Modal.Footer>
            </Modal>
           
            <div className="Listproduct-container">
                <Row className="group-list">
                    <div className="img-list">
                        <img alt="Hình banner" src={HinhAnh || banner}/>
                        
                    </div>
                </Row>
                <Row className="group-list" >
                    <Col>
                        <div className="pt-2">
                            <label className="label-admin" column lg={2}>Vị trí:</label>
                            <span>{props.product.ViTri}</span>
                        </div>
                        
                        <div className="pt-3">
                            <label className="label-admin" column lg={2}>Website:</label>
                            <span>{props.product.Website}</span>
                        </div>
                        <div className="pt-3">
                            <Button className="mt-3 mr-5 btn-info" href={props.hrefSP}>Chi tiết</Button> 
                            <Button className="mt-3 ml-5 btn-danger" onClick={handleShow}>Xóa đấu giá</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <hr width="90%" align="center"></hr>
        </div>
    )
}

 
