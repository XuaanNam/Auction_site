import {Gavel} from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import Interest from '../assets/Interested.module.css'
import MessageToast from '../pages/ToastMessage/MessageToast' 

//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import ProductLoved from './Interested/productLoved';

const Interested = () => {

    const [toasts, setToasts] = useState([]);
    const [remove, setRemove] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [listLoved, setListLoved] = useState([]);

    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
                if(Response.data.isAuth){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAuth = 1;
                    axios.get("my/loved")
                        .then((res) =>{ 
                            if(res.data.results.length > 0){ 
                                setListLoved(res.data.results);  
                                setIsEmpty(false);
                                setToastMessage("success","Thành công", res.data.message);
                            }
                        })
                }
            })
            .catch(error => { console.log(error);})
            .then(function () {
                if(isAuth !== 1){
                    navigate('/')
                }       
            });
    }, []);

    const onDelete = (idQT) => {
        const listL = listLoved.filter(list => list.idQT !== idQT); 
        setListLoved(listL); 
        if(listL.length === 0){
            setIsEmpty(true);
        }
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
        <Container>
            <Header isActive={true} />
            <Main className="container">
                <Title>Bạn quan tâm 💜</Title>
                <Link to="/">
                        <TopButton className={`btn btn-dark ${Interest.btnReturnBuy}`}>
                            <Gavel className ="mr-1"/>
                            Tiếp tục đấu giá</TopButton>
                </Link>
               
                {isEmpty ?
                    <div>
                        <div className="mess-list">
                            <h3 style={{textAlign: 'center'}}>Bạn chưa quan tâm cuộc đấu giá nào!</h3>
                        </div>
                    </div>
                :   
                    <div style={{margin: '0 0 20vh 0'}}>
                        {listLoved.map(list=>(
                            <ProductLoved key = {list.idQT} 
                                list = {list}
                                onDelete={onDelete}
                                setToastMessage={setToastMessage}
                            />
                        ))}
                    </div>   
                }
            </Main>
            <MessageToast 
                toasts={toasts}
                setToasts={setToasts}
                handleCloseToast={handleCloseToast}/>
            <Footer/>
        </Container>
    )
}

const Title = styled.h3`
    
    padding-top: 6.125rem;
    padding-bottom: 1.875rem;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
`;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const Main = styled.div`
    flex: 1;
    height: 100%;
    margin-top: 3.75rem;
`;

const TopButton = styled.button`
    text-transform: uppercase;
`;

export default Interested;