import {Gavel,Cancel,BorderHorizontal, GpsFixed,
         Timer, AttachMoney} from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import Interest from '../assets/Interested.module.css'
import banner1 from "../images/img-1.png";

//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';
import ProductLoved from './Interested/productLoved';

const Interested = () => {

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
                            if(res.data){ 
                                setListLoved(res.data);  
                                setIsEmpty(false);
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
                {/* <Link to="/cart" className="text-decoration-none">
                    <TopText className={`text-decoration-none alert-danger ${Interest.amountInterest}`}>Số lượng trong giỏ hàng: 0</TopText>
                </Link> */}
                {isEmpty ?
                    <div></div>
                :   
                    <div>
                        {listLoved.map(list=>(
                            <ProductLoved key = {list.idQT} 
                                list = {list}
                            />
                        ))}
                    </div>   
                }
            </Main>
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

const Having = styled.div`
    position: relative;
    border: 2px solid #343a40;
    border-radius: 10px;
    margin-left: -4.125rem;
    padding: 1.25rem 1.25rem 5rem 1.25rem;
    height: 100%;
    margin-bottom: 4.125rem;
    margin-right: 1.25rem;
`;

const EmptyCart = styled.img`
    margin-bottom: 0.625rem;
    width: 25rem;
    height: 11.25rem;
`;



const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 1.25rem;
`;

const ShopButton = styled.button`
    margin-top: 0.3125rem;
`;

const TopButton = styled.button`
    text-transform: uppercase;
`;

const Image = styled.img`
    
    width: 75%;
    height: 16rem;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

export default Interested;