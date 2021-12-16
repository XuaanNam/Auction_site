import React, {useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import Product from './Product'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
function List() {

    const [list, setList] = useState([]);

    let navigate = useNavigate();
    let isAdmin = 0;
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
                if(Response.data.PQ === 1){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAdmin = 1;
                    axios.get("admin/get/all/product",)
                        .then((res) => { 
                            res.data.message && alert(res.data.message);
                            setList(res.data); 
                            console.log(res.data);
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

    return (
        <div>
            <Header isAdmin={true}/>
            <h3 className="title-list">Danh sách sản phẩm</h3> <br/>
            <div className="admins-list-all-product">
                {list.map(prod => ( 
                    <Product key={prod.idSP} 
                        hrefSP={"/admin/addauction/" + prod.idSP}
                        product={prod}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default List