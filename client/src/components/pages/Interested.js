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

const Interested = () => {
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
                        <Link to="/cart" className="text-decoration-none">
                            <TopText className={`text-decoration-none alert-danger ${Interest.amountInterest}`}>Số lượng trong giỏ hàng: 1</TopText>
                        </Link>
                        {/* ITEM BẮT ĐẦU */}
                        <Having>
                            {/*  */}
                            <Image src={banner1} />
                            <ProductDetail>
                                            <span className={Interest.positionBanner}>
                                                <GpsFixed className="mr-1"/>
                                                Vị trí: 
                                                <span className="text-warning"> Top Banner</span>
                                            </span>

                                            <span className={Interest.sizeBanner}>
                                                <BorderHorizontal className="mr-1"/>
                                                Kích thước:
                                                <span className="text-warning"> 980 x 200</span>
                                            </span>

                                            <span className={Interest.timeBegunBanner}>
                                                ⏱ Thời gian:
                                                <span className="text-warning"> 3/12/2021 19:30</span>
                                                
                                            </span>

                                            <span className={Interest.priceBegunBanner}>
                                                💸 Giá khởi điểm:
                                                <span className="text-warning"> 7.000.000 vnđ</span>
                                            </span>

                                            <button class={`btn btn-dark ${Interest.btnRemoveIn}`}>
                                                XOÁ KHỎI YÊU THÍCH 
                                                <Cancel className="ml-1"/>
                                                </button>
                            </ProductDetail>
                        </Having>
                        {/* Ngăn cách các item */}
                        <Having>
                            {/*  */}
                            <Image src={banner1} />
                            <ProductDetail>
                                            <span className={Interest.positionBanner}>
                                                <GpsFixed className="mr-1"/>
                                                Vị trí: 
                                                <span className="text-warning"> Top Banner</span>
                                            </span>

                                            <span className={Interest.sizeBanner}>
                                                <BorderHorizontal className="mr-1"/>
                                                Kích thước:
                                                <span className="text-warning"> 980 x 200</span>
                                            </span>

                                            <span className={Interest.timeBegunBanner}>
                                                ⏱ Thời gian:
                                                <span className="text-warning"> 3/12/2021 19:30</span>
                                                
                                            </span>

                                            <span className={Interest.priceBegunBanner}>
                                                💸 Giá khởi điểm:
                                                <span className="text-warning"> 7.000.000 vnđ</span>
                                            </span>

                                            <button class={`btn btn-dark ${Interest.btnRemoveIn}`}>
                                                XOÁ KHỎI YÊU THÍCH 
                                                <Cancel className="ml-1"/>
                                                </button>
                            </ProductDetail>
                        </Having>
                    {/*  */}
            </Main>
            <Footer></Footer>
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