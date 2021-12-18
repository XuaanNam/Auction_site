import React, {useEffect, useState} from 'react'
import '../../../App.css'
import Header from "../../layout/Header";
import Footer from '../../layout/Footer';
import Product from './Product'
import axios from "../../../api/axios";
import { useNavigate} from "react-router-dom";
import MessageToast from '../../pages/ToastMessage/MessageToast' 
function List() {

    const [toasts, setToasts] = useState([]);
    const [remove, setRemove] = useState(null);

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

    const onDelete = (idSP) => {
        const listP = list.filter(list => list.idSP !== idSP); 
        setList(listP); 
    }

    function setToastMessage(status, title, message) {
        setToasts(prevToast => [
            ...prevToast,
            {
                id: new Date().getTime(),
                status,
                title,
                message
            }
        ]); 
    }

    //close
    function handleCloseToast(toast) {
        setToasts(prevToast => prevToast.filter(item => item.id !== toast.id));
    };

    useEffect(() =>{
        if (remove) {
            setToasts(prevToast => prevToast.filter(toast => toast.id !== remove));
        }
    }, [remove]);

    useEffect(() =>{
        if (toasts.length) {
            setTimeout(() => setRemove(toasts[toasts.length - 1].id), 2000);
        }
    }, [toasts]);

    return (
        <div>
            <Header isAdmin={true}/>
            <h3 className="title-list">Danh sách sản phẩm</h3> <br/>
            <div className="admins-list-all-product">
                {list.map(prod => ( 
                    <Product key={prod.idSP} 
                        hrefSP={"/admin/addauction/" + prod.idSP}
                        product={prod}
                        setToastMessage={setToastMessage}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            <MessageToast 
                toasts={toasts}
                setToasts={setToasts}
                handleCloseToast={handleCloseToast}/>
            <Footer/>
        </div>
    )
}

export default List