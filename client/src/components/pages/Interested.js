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

const Interested = () => {
    return (
        <Container>
            <Header isActive={true} />
            <Main className="container">
            <Title>Ồ ! Là thứ bạn quan tâm đến</Title>
                    <Link to="/">
                            <TopButton className={`btn btn-dark ${Interest.btnReturnBuy}`}>Tiếp tục đấu giá</TopButton>
                    </Link>
                    <Link to="/cart" className="text-decoration-none">
                        <TopText className={`text-decoration-none alert-danger ${Interest.amountInterest}`}>Số lượng trong giỏ hàng: 1</TopText>
                    </Link>
                    <Having>
                        <Image src={banner1} />
                        <ProductDetail>
                                        <span className={Interest.positionBanner}>Vị trí: Top Banner</span>
                                        <span className={Interest.sizeBanner}>Kích thước: 980 x 200</span>
                                        <span className={Interest.timeBegunBanner}>Thời gian: 3/12/2021 19:30</span>
                                        <span className={Interest.priceBegunBanner}>Giá khởi điểm: 7.000.000 vnđ</span>
                        </ProductDetail>
                    </Having>
                    
                    
                    {/*  */}
            </Main>
            <Footer></Footer>
        </Container>
    )
}

const Title = styled.h3`
    padding-top: 50px;
    padding-bottom: 30px;
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
    margin-top: 60px;
`;

const Having = styled.div`
    position: relative;
    border: 2px solid #343a40;
    border-radius: 10px;
    margin-left: -65px;
    padding: 20px;
    height: 50vh;
    margin-bottom: 50px;
    margin-right: 20px;
`;

const EmptyCart = styled.img`
    margin-bottom: 10px;
    width: 400px;
    height: 180px;
`;



const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 20px;
`;

const ShopButton = styled.button`
    margin-top: 5px;
`;

const TopButton = styled.button`
    text-transform: uppercase;
`;

const Image = styled.img`
    
    width: 100%;
    height: 250px;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

export default Interested;