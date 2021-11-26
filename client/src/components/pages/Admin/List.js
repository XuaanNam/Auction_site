import React, {useEffect} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import {Form, Row, Col, Button} from 'react-bootstrap'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
function List() {
    let navigate = useNavigate();
    // useEffect(()=>{
    //     axios.get("isAuth",)
    //         .then((Response) => {
    //             if(Response.data.PQ !== 1){
    //                 navigate('/')
    //             }
    //         })
    //         .catch(error => { console.log(error);});
    // }, [navigate]);
    let isAuth = 0;
    useEffect(() => {
        axios
        .get("isAuth")
        .then((Response) => {
            if (Response.data.isAuth) {
                isAuth = 1;
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .then( () => {
            if (isAuth !== 1) {
                navigate("/");
            }
        });
    }, []);
    return (
        <div>
            <Header isAdmin={true}/>
            <h3 className="title-list">Danh sách sản phẩm</h3> <br/>
            <div className="">
                <div className="d-flex pt-2">
                    <Row className="group-list">
                        <div className="img-list"></div>
                    </Row>
                    <Row className="group-list" >
                        <Col>
                            <div className="pt-2">
                                <label className="label-admin" column lg={2}>Vị trí:</label>
                                <span>Top banner</span>
                            </div>
                            
                            <div className="pt-3">
                                <label className="label-admin" column lg={2}>Website:</label>
                                <span>vuighe.net</span>
                            </div>
                            <Button className="mt-3 btn-list" href="/admin/addauction">Chi tiết</Button>
                        </Col>
                    </Row>
                </div>
                <hr width="90%" align="center"></hr>
            </div>

            <div className="">
                <div className="d-flex pt-2">
                    <Row className="group-list">
                        <div className="img-list"></div>
                    </Row>
                    <Row className="group-list" >
                        <Col>
                            <div className="pt-2">
                                <label className="label-admin" column lg={2}>Vị trí:</label>
                                <span>Right banner</span>
                            </div>
                            
                            <div className="pt-3">
                                <label className="label-admin" column lg={2}>Website:</label>
                                <span>fulltruyen.vn</span>
                            </div>
                            <Button className="mt-3 btn-list" href="/admin/addauction">Chi tiết</Button>
                        </Col>
                    </Row>
                </div>
                <hr width="90%" align="center"></hr>
            </div>
            <Footer/>
        </div>
    )
}

export default List
